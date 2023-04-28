import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../../../components/header_login"

const UserRegister = (props) => {
    const [name, setName] = useState(props.userInfo.name)
    const [affiliation, setAffiliation] = useState(props.userInfo.affiliation)
    const [twitter, setTwitter] = useState(props.userInfo.twitter)
    const [instagram, setInstagram] = useState(props.userInfo.instagram)
    const [github, setGithub] = useState(props.userInfo.github)

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await fetch("http://localhost:3000/api/user/update", {
                method: "POST",
                headers: {
                    "Accept": "application/josn",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name, 
                    affiliation: affiliation,
                    twitter: twitter,
                    instagram: instagram, 
                    github: github
                })
            })
            router.push(`/item/edit/${localStorage.getItem("uid")}`)
        }catch(err){
            alert("ユーザー情報更新失敗")
        }
    }

    return (
        <div>
            <Head><title>名刺の基本情報</title></Head>
            <Header />
            <h1>名刺の基本情報</h1>
            <form className="form-update" onSubmit={handleSubmit}>
                <label>名前<input className="upin name" value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="やな"/></label>
                <label>所属<input className="upin affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} type="text" name="affiliation" placeholder="てんぺん舎"/></label>
                <label>Twitter<input className="upin twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} type="text" name="twitter" placeholder="@tenpen"/></label>
                <label>Instagram<input className="upin insta" value={instagram} onChange={(e) => setInstagram(e.target.value)} type="text" name="instagrame" placeholder="@tenpen"/></label>
                <label>GitHub<input className="upin git" value={github} onChange={(e) => setGithub(e.target.value)} type="text" name="github" placeholder="@tenpen"/></label>
                <button className="btn-update">登録</button>
            </form>
        </div>
    )
}

export default UserRegister

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/user/${context.query.id}`)
    const userInfo = await response.json()
    return {
        props: userInfo
    }
}