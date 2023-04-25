import Image from "next/image"

const Footer = () => {
    return (
        <footer>
            <Image src="/footer-logo.png" width="300" height="100" alt="tenpensya-logo"/>
            <p>©{new Date().getFullYear()} Tenpensya</p>
        </footer>
    )
}

export default Footer 