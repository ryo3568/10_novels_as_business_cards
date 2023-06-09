import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"
import { useEffect, useState } from "react"
import Header from "../../../components/header_login"

const ReadAllItemsPreview = (props) => {
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
                data: `https://10-novels-as-business-cards.vercel.app/item/read/${uid}`,
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
            qrCode.download({ name: "qr", extension: "jpg" });
        }
    }

    return (
        <div>
            <Head><title>名刺がわりの小説10選</title></Head>
            <Header/>
            <div className="name-deta">
            <h1>名前：{props.userInfo.userInfo.name && props.userInfo.userInfo.name}</h1>
            <h1>所属：{props.userInfo.userInfo.affiliation && props.userInfo.userInfo.affiliation}</h1>
            <h1>Twitter：{props.userInfo.userInfo.twitter && props.userInfo.userInfo.twitter}</h1>
            <h1>Instagram：{props.userInfo.userInfo.instgram && props.userInfo.userInfo.instgram}</h1>
            <h1>GitHub：{props.userInfo.userInfo.github && props.userInfo.userInfo.github}</h1>
            </div>
            <div className="preview-container">
                {props.allItems.allItems.map(item => 
                    <div className="preview-item" key={item._id}>
                        <div className="preview-content"> 
                            <div className="preview-img">
                                <Image src={item.image} width="150" height="200" alt="item-image" />
                            </div>
                            <div className="preview-book">
                                <h2 className="h2-title">『{item.title}』</h2>
                                <h3 className="h3-author">{item.author}</h3>
                                {item.comment && 
                                <div className="comment">
                                    <h4 className="h4-comment">{item.comment}</h4>
                                </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Link className="link-returnedit" href={`/item/edit/${uid}`}>編集に戻る</Link>
            <br/>
            <button className="btn-qr" onClick={generateQRcode}>QRコードのダウンロード</button>
        </div>
    )
}

export default ReadAllItemsPreview

export const getServerSideProps = async(context) => {
    const itemResponse = await fetch(`https://10-novels-as-business-cards.vercel.app/api/item/read/${context.query.id}`)
    const allItems = await itemResponse.json()
    const userResponse = await fetch(`https://10-novels-as-business-cards.vercel.app/api/user/${context.query.id}`)
    const userInfo = await userResponse.json()
    const props = {
        allItems: allItems, 
        userInfo : userInfo
    }
    return{
        props: props
    }
}