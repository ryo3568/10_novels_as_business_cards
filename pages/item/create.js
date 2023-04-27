import { useState, useEffect } from "react"
import useAuth from "../../utils/useAuth"
import { useRouter } from "next/router"

const CreateItem = () => {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [uid, setUid] = useState()

    const [book, setBook] = useState()
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        const userId = localStorage.getItem("uid")
        setUid(userId)
    })

    const handleSearch = async(e) => {
        e.preventDefault()
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
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
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
                    book.items.map(item => 
                    <div key={item.id}>
                        {item.volumeInfo.imageLinks && 
                        <img src={item.volumeInfo.imageLinks.thumbnail} alt="書影"/>}
                        <h3>『{item.volumeInfo.title.length > 5 ? item.volumeInfo.title.substring(0,5) + "..." : item.volumeInfo.title}』</h3>
                        {item.volumeInfo.authors &&
                        <h4>{item.volumeInfo.authors[0]}</h4>}
                        <button onClick={(e) => handleSubmit(e, item)}>追加</button>
                    </div>)
                )
            }
        }
    }

    const loginUser = useAuth()

    if(loginUser){
        return (
            <div>
                <h1>本の検索</h1>
                <form onSubmit={handleSearch}>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="タイトル"  />
                    <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name="author" placeholder="著者名"  />
                    <button>検索</button>
                </form>
                <div>
                    {showResult && showResults()}
                </div>
            </div>
        )
    }
}

export default CreateItem