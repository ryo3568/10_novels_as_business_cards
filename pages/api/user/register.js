import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import jwt from "jsonwebtoken"

const secret_key = "tenpen"

const registerUser = async(req, res) => {
    try{
        await connectDB()
        const user = await UserModel.create(req.body)
        const payload = {
            email: req.body.email,
        }
        const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
        return res.status(200).json({message: "ユーザ登録成功", token: token, uid: user._id.toString()})
    } catch(err){
        return res.status(400).json({message: "ユーザ登録失敗"})
    }
}

export default registerUser