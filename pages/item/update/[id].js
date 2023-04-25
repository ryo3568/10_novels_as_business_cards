import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const UpdateItem = (props) => {
    const [title, setTitle] = useState(props.singleItem.title)
    const [author, setAuthor] = useState(props.singleItem.author)
    const [image, setImage] = useState(props.singleItem.image)
    const [message, setMessage] = useState(props.singleItem.message)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://10-novels-as-business-cards.vercel.app/api/item/update/${props.singleItem._id}`, {
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
                    message: message
                })
            })
            const jsonData = await response.json() 
            alert(jsonData.message)
        }catch(err){
            alert("コメント編集失敗")
        }
    }

    const loginUser = useAuth() 
    if(loginUser === props.singleItem.email){
        return (
            <div>
                <Head><title>コメント編集</title></Head>
                <h1>コメント編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" placeholder="著者" required />
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={15} placeholder="メッセージ" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    }else{
        return <h1>権限がありません</h1>
    }


}

export default UpdateItem

export const getServerSideProps = async(context) => {
    const response = await fetch(`https://10-novels-as-business-cards.vercel.app/api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}