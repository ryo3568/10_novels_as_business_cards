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
      <div className="min-h-screen flex-col flex justify-center items-center">
      <h1 className="text-4xl mb-5">Table</h1>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-500 px-4 py-2 bg-slate-100 font-bold">果物</th>
            <th className="border border-slate-500 px-4 py-2 bg-slate-100 font-bold">野菜</th>
            <th className="border border-slate-500 px-4 py-2 bg-slate-100 font-bold">肉</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-500 px-4 py-2">りんご</td>
            <td className="border border-slate-500 px-4 py-2">きゅうり</td>
            <td className="border border-slate-500 px-4 py-2">鶏肉</td>
          </tr>
          <tr>
            <td className="border border-slate-500 px-4 py-2">ぶどう</td>
            <td className="border border-slate-500 px-4 py-2">なす</td>
            <td className="border border-slate-500 px-4 py-2">豚肉</td>
          </tr>
          <tr>
            <td className="border border-slate-500 px-4 py-2">みかん</td>
            <td className="border border-slate-500 px-4 py-2">とまと</td>
            <td className="border border-slate-500 px-4 py-2">牛肉</td>
          </tr>
        </tbody>
       </table>
      </div>
    </div>
  )
}

export default LandingPage