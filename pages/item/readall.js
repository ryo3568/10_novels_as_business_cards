import Link from "next/link" 
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) => {
    return (
        <div>
            <Head><title>名刺がわりの小説10選</title></Head>
            <h1>こんにちは</h1>
            {props.allItems.map(item => 
                <Link href={`/item/${item._id}`} key={item._id}>
                    <Image src={item.image} width="750" height="500" alt="item-image" />
                    <div>
                        <h2>{item.title}</h2>
                        <h3>{item.author}</h3>
                        <h4>{item.comment}</h4>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default ReadAllItems

export const getServerSideProps = async() => {
    const response = await fetch("https://10-novels-as-business-cards.vercel.app/api/item/readall")
    const allItems = await response.json()
    return{
        props: allItems
    }
}