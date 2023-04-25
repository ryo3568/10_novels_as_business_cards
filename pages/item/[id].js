import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

const ReadSingleItem = (props) => {
    return (
        <div>
            <Head><title>{props.singleItem.title}</title></Head>
            <div>
                <Image src={props.singleItem.image} width={750} height={500} alt="item-image"/>
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h1>{props.singleItem.author}</h1>
                <h1>{props.singleItem.message}</h1>
                <div>
                    <Link href={`/item/update/${props.singleItem._id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${props.singleItem._id}`}>アイテム削除</Link>
                </div>
            </div>
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