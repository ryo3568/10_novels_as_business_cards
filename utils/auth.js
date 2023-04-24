import jwt, { decode } from "jsonwebtoken"

const secret_key = "tenpen"

const auth = (handler) => {
    return async(req, res) => {
        if(req.method === "GET"){
            return handler(req, res)
        }
        // const token = await req.headers.authorization.split(" ")[1]
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlbnBlbkBleGFtcGxlLmNvbSIsImlhdCI6MTY4MjM0NjEzNCwiZXhwIjoxNjgyNDI4OTM0fQ.1835XFgg-Vc9COFo_aSMkG_Q8e33zibAy0DQHDliN3U"
        if(!token){
            return res.status(401).json({message: "トークンがありません"})
        }
        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = decoded.email
            return handler(req, res)
        }catch(err){
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
        }
    }
}

export default auth