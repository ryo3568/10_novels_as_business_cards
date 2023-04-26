import Head from "next/head"
import Image from "next/image"
import Link from "next/link" 

const LandingPage = () => {
  return (
    <div>
      <Head><title>名刺がわりの小説10選</title></Head>
      <header>
          <div><Link href="/">
            <Image src="/header-logo.png" width="482" height="150" alt="header logo"/>
          </Link></div>
          <nav>
              <ul>
                  <li><Link href="/user/register">新規登録</Link></li>
                  <li><Link href="/user/login">ログイン</Link></li>
              </ul>
          </nav>
      </header>
      <h1>ランディングページ</h1>
    </div>
  )
}

export default LandingPage