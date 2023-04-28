import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Header from "../../../components/header_login"

const EditItems = (props) => {
    const [uid, setUid] = useState()

    const router = useRouter()

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
        console.log(props.allItems)
    })

    const handleClick = async(e, id) => {
        e.preventDefault()
        try{
            await fetch(`http://localhost:3000/api/item/delete/${id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            router.reload() 
        }catch(err){
            alert("アイテム削除失敗")
        }
    }

    return (
        <div className="edit-id">
            <Head><title>名刺がわりの小説10選</title></Head>
            <Header/>
            <h1 >本たちの登録</h1>
            <h3 className="h3-search">自分の名刺がわりにしたい本を10冊厳選しよう!</h3>
            <Link className="link-search" href="/item/create">本を検索</Link>
            {props.allItems.map(item => 
                <div key={item._id}>
                    <Link href={`/item/${item._id}`}>
                        <Image src={item.image} width="200" height="1000" alt="item-image" />
                    </Link>
                    <div>
                        <h2>{item.title}</h2>
                        <h3>{item.author}</h3>
                        <h4>{item.comment}</h4>
                        <Link href={`/item/${item._id}`}>コメントを追加</Link>
                        <br/>
                        <button onClick={(e) => handleClick(e, item._id)}>削除</button>
                    </div>
                </div>
            )}
            <h3 className="h3-check">名刺の画面をプレビューで確認しよう!</h3>
            <Link className="link-check" href={`/item/preview/${uid}`}>名刺を確認</Link>
        </div>
    )
}

export default EditItems

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/read/${context.query.id}`)
    const allItems = await response.json()
    return{
        props: allItems
    }
}