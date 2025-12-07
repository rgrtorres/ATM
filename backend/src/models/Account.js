import mongoose from "mongoose";

const AccountSchema = {
    owner: String,
    balance: {
        type: Number,
        default: 0
    }
}

export default mongoose.model("Account", AccountSchema);