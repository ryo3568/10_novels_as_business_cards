import jwt from "jsonwebtoken"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const secret_key = "tenpen"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState("")

    const router = useRouter()

    useEffect(() => {
        const token  = localStorage.getItem("token")

        if(!token){
            router.push("/user/login")
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            setLoginUser(decoded.email)
        }catch(err){
            router.push("/user/login")

        }
    }, [router])
    
    return loginUser
}

export default useAuth