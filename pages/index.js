import Head from "next/head"
import Footer from "../components/footer"
import Link from "next/link" 

const LandingPage = () => {
  return (
    <div>
      <Head><title>名刺がわりの小説10選</title></Head>
      <header>
          <div><Link href="/"><img src="/header.svg" alt="header-img"/></Link></div>
          <nav>
              <ul>
                  <li><Link href="/user/register">新規登録</Link></li>
                  <li><Link href="/user/login">ログイン</Link></li>
              </ul>
          </nav>
      </header>
      <h1>ランディングページ</h1>
      <Footer/>
    </div>
  )
}

export default LandingPage