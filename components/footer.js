import Image from "next/image"

const Footer = () => {
    return (
        <footer>
            <Image className="footer-logo" src="/footer-logo.png" width="300" height="100" alt="tenpensya-logo"/>
            <p className="copy">©{new Date().getFullYear()} Tenpensya</p>
        </footer>
    )
}

export default Footer 