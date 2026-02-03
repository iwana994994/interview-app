import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema(
{   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    type:{
        enum: ["income", "expense"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
 
    date: {
        type: Date,
        required: true
    }
},
{timestamps: true}
)
const Transition= mongoose.model("Transaction", transactionSchema)
export default Transition