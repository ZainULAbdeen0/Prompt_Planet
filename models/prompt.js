import {Schema , model , models} from "mongoose";
import userModel from "@models/User";

const promptSchema = new Schema({
    creator : {
        type : Schema.Types.ObjectId,
        ref : userModel
    },
    prompt : {
        type : String,
        required : [true , "Prompt is required!"]
    },
    tag : {
        type : String,
        required : [true , "Tag is required!"]
    }
})

const Prompt = models.promptModel || model("promptModel" , promptSchema);
export default Prompt;