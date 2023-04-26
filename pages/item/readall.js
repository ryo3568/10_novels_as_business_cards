import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"
import Header from "../../components/header"
import QRCode from "qrcode"
import { useState } from "react"

const ReadAllItems = (props) => {
    const [src, setSrc] = useState(QRCode.toDataURL("http://localhost:3000/item/readall"))

    return (
        <div>
            <Head><title>名刺がわりの小説10選</title></Head>
            <Header/>
            {props.allItems.map(item => 
                <Link href={`/item/${item._id}`} key={item._id}>
                    <Image src={item.image} width="200" height="1000" alt="item-image" />
                    <div>
                        <h2>{item.title}</h2>
                        <h3>{item.author}</h3>
                        <h4>{item.comment}</h4>
                    </div>
                </Link>
            )}
            <Link href="/item/edit">編集に戻る</Link>
            <br/>
            {/* <img src={src} />
            <button onClick={generate}>Generate</button> */}
            <a href={src} download="hoge">QRコードのダウンロード</a>
        </div>
    )
}

export default ReadAllItems

export const getServerSideProps = async() => {
    const response = await fetch("http://localhost:3000/api/item/readall")
    const allItems = await response.json()
    return{
        props: allItems
    }
}