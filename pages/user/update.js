import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

const UserRegister = () => {
    const [name, setName] = useState("")
    const [affiliation, setAffiliation] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [github, setGithub] = useState("")

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
            <header>
                <div><Link href="/">
                    <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
                </Link></div>
            </header>
            <h1>名刺の基本情報</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前"/>
                <input value={affiliation} onChange={(e) => setAffiliation(e.target.value)} type="text" name="affiliation" placeholder="所属"/>
                <input value={twitter} onChange={(e) => setTwitter(e.target.value)} type="text" name="twitter" placeholder="Twitter"/>
                <input value={instagram} onChange={(e) => setInstagram(e.target.value)} type="text" name="instagrame" placeholder="Instagram"/>
                <input value={github} onChange={(e) => setGithub(e.target.value)} type="text" name="github" placeholder="GitHub"/>
                <button>登録</button>
            </form>
        </div>
    )
}

export default UserRegister

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}