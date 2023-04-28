import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"
import Header from "../../../components/header"
import { useEffect, useState } from "react"

const ReadAllItems = (props) => {
    const [uid, setUid] = useState() 

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
    })

    const generateQRcode = async() => {
        /// 画像埋め込みされたQRコード生成
        let qrCode;
        if (typeof window != "undefined") {
            const QRCodeStyling = require("qr-code-styling")
            qrCode = new QRCodeStyling({
                width: 250,
                height: 250,
                type: "svg",
                data: `http://localhost:3000/item/user/${uid}`,
                image: "/vercel.svg",
                qrOptions: {
                    errorCorrectionLevel: 'H'
                },
                dotsOptions: {
                    color: "#4267b2",
                    type: "square"
                },
                cornersSquareOptions:{
                    type: "square"
                },
                cornersDotOptions: {
                    type: "square"
                },
                backgroundOptions: {
                    color: "#fff",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 0,
                }
            });
            qrCode.append(document.getElementById("canvas"));
            qrCode.download({ name: "qr", extension: "svg" });
        }
    }

    return (
        <div>
            <Head><title>名刺がわりの小説10選</title></Head>
            <Header/>
            <h1></h1>
            {props.allItems.map(item => 
                <div key={item._id}>
                    <Image src={item.image} width="200" height="1000" alt="item-image" />
                    <div>
                        <h2>{item.title}</h2>
                        <h3>{item.author}</h3>
                        <h4>{item.comment}</h4>
                    </div>
                </div>
            )}
            <Link href={`/item/edit/${uid}`}>編集に戻る</Link>
            <br/>
            <canvas id="qrCode"></canvas>
            <button onClick={generateQRcode}>QRコードのダウンロード</button>
        </div>
    )
}

export default ReadAllItems

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/read/${context.query.id}`)
    const allItems = await response.json()
    const user = await fetch(`http://localhost:3000/api/user/${context.query.id}`)
    return{
        props: allItems
    }
}