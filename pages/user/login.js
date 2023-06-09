import {useEffect, useState} from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link" 
import { useRouter } from "next/router"
import Header from "../../components/header_logout"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://10-novels-as-business-cards.vercel.app/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
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
            router.push(`/item/edit/${jsonData.uid}`)
        }catch(err){
            alert("ログイン失敗")
        }
    }

    return (
        <div>
            <Head><title>ログイン</title></Head>
            <Header/>
            <h1>ログイン</h1>
            <form className="form-login" onSubmit={handleSubmit}>
                <input className="mail" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input className="pass" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button className="btn-login">ログイン</button>
            </form>
        

        </div>
    )
}

export default Login