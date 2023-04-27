import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link" 
import { useRouter } from "next/router"

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
            <header>
                <div><Link href="/">
                    <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
                </Link></div>
            </header>
            <h1>ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button>新規登録</button>
            </form>
        </div>
    )
}

export default Register