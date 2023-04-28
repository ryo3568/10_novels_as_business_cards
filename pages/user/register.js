import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link" 
import { useRouter } from "next/router"
import Header from "../../components/header_logout"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/josn",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            localStorage.setItem("uid", jsonData.uid)
            router.push("/user/update")
        }catch(err){
            alert("ユーザー登録失敗")
        }
    }

    return (
        <div>
            <Head><title>ユーザー登録</title></Head>
            <Header/>
            <h1>ユーザー登録</h1>
            <form className="form-register" onSubmit={handleSubmit}>
                <input className="mail" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input className="pass" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button className="btn-register">新規登録</button>
            </form>
        </div>
    )
}

export default Register