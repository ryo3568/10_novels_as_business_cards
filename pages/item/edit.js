import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"

const EditItems = (props) => {

    const router = useRouter()

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
        <div>
            <Head><title>名刺がわりの小説10選</title></Head>
            <header>
                <div><Link href="/">
                    <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
                </Link></div>
                <nav>
                    <ul>
                        <li><Link href="/user/register">アカウントボタン</Link></li>
                    </ul>
                </nav>
            </header>
            <h1>本たちの登録</h1>
            <h3>自分の名刺がわりにしたい本を10冊厳選しよう!</h3>
            <Link href="/item/create">本を検索</Link>
            {props.allItems.map(item => 
                <div key={item._id}>
                    <Link href={`/item/${item._id}`}>
                        <Image src={item.image} width="750" height="500" alt="item-image" />
                    </Link>
                    <div>
                        <h2>{item.title}</h2>
                        <h3>{item.author}</h3>
                        <h4>{item.comment}</h4>
                        <Link href="/">コメントを追加</Link>
                        <br/>
                        <button onClick={(e) => handleClick(e, item._id)}>削除</button>
                    </div>
                </div>
            )}
            <h3>名刺の画面をプレビューで確認しよう</h3>
            <Link href="/">名刺を確認</Link>
        </div>
    )
}

export default EditItems

export const getServerSideProps = async() => {
    const response = await fetch("http://localhost:3000/api/item/readall")
    const allItems = await response.json()
    return{
        props: allItems
    }
}