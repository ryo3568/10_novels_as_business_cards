import Head from "next/head"
import Image from "next/image"
import Link from "next/link" 
import Header from "../components/header_logout"

const LandingPage = () => {
  return (
    <div>
      <Head><title>名刺がわりの小説10選</title></Head>
      <Header />

      <h1>ランディングページ</h1>
      {/* 以下はTailWindCSSの適用例です。消してもかまいません */}
      
      <Image className="img-landing" src="/img1.jpg" width="1000" height="500" alt="landing-photo"/>
      <div className="landing-step">
       <h3><span>01</span>アカウントを作成しよう</h3>
       <h3><span>02</span>名刺の基本情報を入力しよう</h3>
       <h3><span>03</span>名刺がわりにしたい本を10冊登録しよう</h3>
       <h3><span>04</span>本についてのコメントを登録しよう</h3>
       <h3><span>05</span>QRコードをダウンロードしよう</h3>
      </div>
    </div>
  )
}

export default LandingPage