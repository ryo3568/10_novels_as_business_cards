import Image from "next/image"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "../../components/header_login"

const ReadSingleItem = (props) => {
    const [comment, setComment] = useState(props.singleItem.comment)
    const [uid, setUid] = useState()

    const router = useRouter()

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
    })

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
                    title: props.singleItem.title,
                    author: props.singleItem.author,
                    image: props.singleItem.image,
                    comment: comment
                })
            })
            router.push(`/item/edit/${uid}`)
        }catch(err){
            alert("コメント編集失敗")
        }
    }

    return (
        <div>
            <Head><title>{props.singleItem.title}</title></Head>
            <Header />
            <div>
                <Image src={props.singleItem.image} width={750} height={500} alt="item-image"/>
            </div>
            <div>
                <h1>タイトル：{props.singleItem.title}</h1>
                <h1>著者：{props.singleItem.author}</h1>
                <h1>コメント：{props.singleItem.message}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="comment" rows={10} placeholder="コメント"></textarea>
                <button>確定</button>
            </form>
        </div>
    )
}

export default ReadSingleItem

export const getServerSideProps = async(context) => {
    const response = await fetch(`https://10-novels-as-business-cards.vercel.app/api/item/${context.query.id}`)
    const singleItem = await response.json()

    return {
        props: singleItem
    }
}