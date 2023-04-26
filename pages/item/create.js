import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Head from "next/head"
import { useRouter } from "next/router"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    image: image,
                })
            })
            router.push("/item/edit")
        }catch(err){
            alert("アイテム作成失敗")
        }
    }

    const loginUser = useAuth()
    
    if(loginUser){
        return (
            <div>
                <Head><title>本の追加</title></Head>
                <h1>アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="著者" required />
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                    <button>追加</button>
                </form>
            </div>
        )
    }
}

export default CreateItem