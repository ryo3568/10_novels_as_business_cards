import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

const getUserItems = async(req, res) => {
    try{
        await connectDB()
        const User = await UserModel.findById(req.query.id)
        return res.status(200).json({message: "アイテム読み取り成功(all)", userInfo: User})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗(all)"})
    }
}

export default getUserItems