import { useState } from "react"
import Head from "next/head"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
            alert(jsonData.message)
        }catch(err){
            alert("ユーザー登録失敗")
        }
    }

    return (
        <div>
            <Head><title>ユーザー登録</title></Head>
            <h1>ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register