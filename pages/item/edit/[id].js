import Link from "next/link" 
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Modal from "react-modal"

const EditItems = (props) => {
    const [uid, setUid] = useState()
    const [modalcreateBookIsOpen, setcreateBookIsOpen] = useState(false)
    const [modalreadBookIsOpen, setreadBookIsOpen] = useState(false)
    const [editBook, setEditBook] = useState()
    const [comment, setComment] = useState()
    const [pageNum, setpageNum] = useState(0)

    const router = useRouter()

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
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

    // 本の追加
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const [book, setBook] = useState()
    const [showResult, setShowResult] = useState(false)

    // const loginUser = useAuth()

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
    })

    const handleSearch = async(e) => {
        e.preventDefault()
        setpageNum(0)
        try{
            let flag = false
            let query = ""
            if(title!==""){
                query += `intitle:${title}`
                flag = true
            }
            if(author!==""){
                if(flag) query += "+"
                else flag = true
                query += `inauthor:${author}`
            }
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${pageNum}`)
            const jsonData = await response.json()
            setBook(jsonData)
            setShowResult(true)
        }catch(err){
            alert("アイテム検索失敗")
        }
    }

    const handleSubmit = async(e, item) => {
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
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors[0],
                    image: item.volumeInfo.imageLinks.thumbnail,
                    comment: "",
                })
            })
            router.push(`/item/edit/${uid}`)
        }catch(err){
            alert("アイテム作成失敗")
        }
    }

    const showResults = () => {
        if(book){
            if(book.totalItems === 0){
                return <h1>該当書籍なし</h1>
            }
            else{
                return (
                    <div className="card-group">
                        {book.items.map(item => 
                        <div className="card" key={item.id}>
                            {item.volumeInfo.imageLinks ?
                            // <img className="card-img-top" src={item.volumeInfo.imageLinks.thumbnail} alt="書影"/>
                            <Image src={item.volumeInfo.imageLinks.thumbnail} width="128" height="190" alt="item-image" />
                            :
                            <Image src="/noimage.png" width="150" height="190" alt="item-image" />
                            }
                            <div className="card-body">
                                <p>『{item.volumeInfo.title.length > 5 ? item.volumeInfo.title.substring(0,5) + "..." : item.volumeInfo.title}』</p>
                                {item.volumeInfo.authors &&
                                <p>{item.volumeInfo.authors[0]}</p>}
                            </div>
                            <button className="card-link" onClick={(e) => handleSubmit(e, item)}>追加</button>
                        </div>)}
                    </div>
                )
            }
        }
    }

    // コメント編集
    const handleCommentSubmit = async(e) => {
        try{
            const response = await fetch(`http://localhost:3000/api/item/update/${editBook._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: editBook.title,
                    author: editBook.author,
                    image: editBook.image,
                    comment: comment
                })
            })
            // router.push(`/item/edit/${uid}`)
            setreadBookIsOpen(false)
        }catch(err){
            alert("コメント編集失敗")
        }
    }

    const setEditComment = (e, item) => {
        setreadBookIsOpen(true)
        setEditBook(item)
        setComment(item.comment)
    }

    const showNexPage = async() => {
        setpageNum(pageNum + 10)
        try{
            let flag = false
            let query = ""
            if(title!==""){
                query += `intitle:${title}`
                flag = true
            }
            if(author!==""){
                if(flag) query += "+"
                else flag = true
                query += `inauthor:${author}`
            }
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${pageNum}`)
            const jsonData = await response.json()
            setBook(jsonData)
        }catch(err){
            alert("アイテム検索失敗")
        }
    }

    const searchClose = () => {
        setcreateBookIsOpen(false)
        setShowResult(false)
        setTitle("")
        setAuthor("")
    }

    return (
        <div className="edit-id">
            <h1 >本たちの登録</h1>
            <h3 className="h3-editid">自分の名刺がわりにしたい本を10冊厳選しよう!</h3>
            {/* <Link className="link-search" href="/item/create">本を検索</Link> */}
            <button onClick={() => setcreateBookIsOpen(true)}>本を検索</button>
            <Modal isOpen={modalcreateBookIsOpen} onRequestClose={() => searchClose()}>
                <button onClick={() => searchClose()}>close</button>
                <div>
                    <h1>本の検索</h1>
                    <form onSubmit={handleSearch} className="form-group">
                        <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="タイトル"  />
                        <input className="form-control" value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name="author" placeholder="著者名"  />
                        <button>検索</button>
                    </form>
                    <div>
                        {showResult && showResults()}
                        {showResult && <button onClick={() => showNexPage()}>次の10件を取得する</button>}
                    </div>
                </div>
            </Modal>
            {props.allItems.map(item => 
                <div key={item._id}>
                    <Link href={`/item/${item._id}`}>
                        <Image src={item.image} width="150" height="200" alt="item-image" />
                    </Link>
                    <div>
                        <h2 className="h2-title">『{item.title}』</h2>
                        <h3 className="h3-author">{item.author}</h3>
                        <h4>{item.comment}</h4>

                        {/* <Link href={`/item/${item._id}`}>コメントを追加</Link> */}
                        <button className="item-comment"　onClick={(e) => setEditComment(e, item)}>コメントを追加</button>
                        <Modal isOpen={modalreadBookIsOpen} onRequestClose={() => setreadBookIsOpen(false)}>
                            {editBook &&
                            <div className="card" style={{width: "30rem"}}>
                                <Image className="card-img-top" src={editBook.image} width={250} height={380} alt="item-image"/>
                                <dic className="card-body">
                                    <h5 className="card-title">タイトル：{editBook.title}</h5>
                                    <p className="card-text">著者：{editBook.author}</p>
                                    <form onSubmit={handleCommentSubmit} className="form-group">
                                        <textarea className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} name="comment" rows={10} placeholder="コメント"></textarea>
                                        <button className="btn btn-primary">確定</button>
                                    </form>
                                </dic>
                            </div>}
                        </Modal>
                        <br/>
                        <button onClick={(e) => handleClick(e, item._id)}>削除</button>
                    </div>
                </div>
            )}
            <h3 className="h3-editid">名刺の画面をプレビューで確認しよう!</h3>
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