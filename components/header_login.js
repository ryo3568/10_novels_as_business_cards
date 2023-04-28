import Link from "next/link" 
import Image from "next/image"
import { useRouter } from "next/router"

const HeaderLogin = () => {

    const router = useRouter()
    
    const logout = () => {
        localStorage.removeItem("uid")
        localStorage.removeItem("token")
        router.push("/")
    }

    const getUserInfo = () => {
        const uid = localStorage.getItem("uid")
        router.push(`/user/update/${uid}`)
    }


    
    return (
        <header>
            <div><Link href="/">
                <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
            </Link></div>
            <nav>
                <ul>
                    <li onClick={getUserInfo}>基本情報編集</li>
                    <li onClick={logout}>ログアウト</li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderLogin