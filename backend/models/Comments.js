import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    commentName:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Draft', 'Publish'],
        default: 'Draft',
    }
});

const Comment = mongoose.models.comment || mongoose.model("comment", CommentSchema);

export default Comment;