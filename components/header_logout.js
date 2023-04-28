import Link from "next/link" 
import Image from "next/image"

const HeaderLogout = () => {
    return (
        <header>
            <div><Link href="/">
                <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
            </Link></div>
            <nav>
                <ul>
                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/user/register">新規登録</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderLogout