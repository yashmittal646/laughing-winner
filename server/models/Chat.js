import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    title: String,
    genre: String,
    description: String,
  },
  {timestamps: true},
  {  
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
