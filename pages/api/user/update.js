import { UserModel } from "../../../utils/schemaModels"
import connectDB from "../../../utils/database"
import auth from "../../../utils/auth"

const updateUser = async(req, res) => {
    try{
        await connectDB()
        const loginUser = await UserModel.findOne({email: req.body.email})
        if(loginUser.email === req.body.email){
            await UserModel.updateOne({email: req.body.email}, req.body)
            return res.status(200).json({message: "ユーザ情報更新成功"})
        }else{
            throw new Error()
        }
    } catch(err){
        return res.status(400).json({message: "ユーザ情報更新失敗"})
    }
}

export default auth(updateUser)