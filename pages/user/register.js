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
            const response = await fetch("https://10-novels-as-business-cards.vercel.app/api/user/register", {
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
            <body>
            <h1>ユーザー登録</h1>
            <form className="form-register" onSubmit={handleSubmit}>
                <input className="mail" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input className="pass" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button className="btn-register">新規登録</button>
            </form>
            </body>
        </div>
    )
}

export default Register