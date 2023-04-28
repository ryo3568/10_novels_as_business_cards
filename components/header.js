import Link from "next/link" 
import Image from "next/image"

const Header = () => {
    return (
        <header>
            <div><Link href="/">
                <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
            </Link></div>
            <nav>
                <ul>
                    <li><Link href="/user/update">アカウントボタン</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header