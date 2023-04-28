import Link from "next/link" 
import Image from "next/image"

const HeaderLogin = () => {
    
    const logout = () => {
        localStorage.removeItem("uid")
        localStorage.removeItem("token")
    }
    
    return (
        <header>
            <div><Link href="/">
                <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
            </Link></div>
            <nav>
                <ul>
                    <li><Link href="/user/update">基本情報編集</Link></li>
                    <li><Link href="/" onClick={logout}>ログアウト</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderLogin