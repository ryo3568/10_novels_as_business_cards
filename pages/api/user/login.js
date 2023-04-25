import connectDB from "../../../utils/database"
import jwt from "jsonwebtoken"
import { UserModel } from "../../../utils/schemaModels"

const secret_key = "tenpen"

const loginUser = async(req, res) => {
    try{
        await connectDB() 
        const savedUserData = await UserModel.findOne({email: req.body.email})
        if(savedUserData){
            if(req.body.password === savedUserData.password){
                const payload = {
                    email: req.body.email,
                }
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
                return res.status(200).json({message: "ログイン成功", token: token})
            }else{
                return res.status(400).json({message: "ログイン失敗：パスワードが間違っています"})
            }
        }else{
            return res.status(400).json({message: "ログイン失敗：ユーザー登録をしてください"})
        }
    } catch(err) {
        return res.status(400).json({message: "ログイン失敗"})
    }
}

export default loginUser