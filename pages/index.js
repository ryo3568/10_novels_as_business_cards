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
      {/* 以下はTailWindCSSの適用例です。消してもかまいません */}
      <Image src="/img1.jpg" width="482" height="150"/>
      <h3><span>STEP1</span>アカウントの作成</h3>
      <h3><span>STEP2</span>名刺の基本情報登録</h3>
      <h3><span>STEP3</span>名刺がわりの小説10選登録</h3>
      <h3><span>STEP4</span>コメントを追加</h3>
      <h3><span>STEP5</span>QRコードのダウンロード</h3>
    </div>
  )
}

export default LandingPage