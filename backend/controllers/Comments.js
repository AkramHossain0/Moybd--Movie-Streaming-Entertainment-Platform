import Comment from "../models/Comments.js";
import Movie from "../models/Post.js";

const newComment = async (req, res) => {
    try {
        const { postId, userId, commentName, comment, title, status } = req.body;

        if (!postId || !userId || !commentName || !comment || !title) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newComment = new Comment({
            postId,
            userId,
            commentName,
            comment,
            title,
            status,
        });

        await newComment.save();

        const movie = await Movie.findById(postId);

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        movie.comments.push(newComment._id);
        await movie.save();

        res.status(200).json({ success: true, message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.log('Error in newComment', error);
        res.status(500).json({ error: 'Error during new comment' });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentName, comment, title, status } = req.body;

        const findComment = await Comment.findById(id);

        if (!findComment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        findComment.commentName = commentName || findComment.commentName;
        findComment.comment = comment || findComment.comment;
        findComment.title = title || findComment.title;
        findComment.status = status || findComment.status;

        await findComment.save();

        res.status(200).json({ success: true, message: "Comment updated successfully", comment: findComment });
    } catch (error) {
        console.error('Error during update comment', error);
        res.status(500).json({ error: 'Error during update comment' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const findComment = await Comment.findById(id);

        if (!findComment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await Comment.deleteOne({ _id: id });

        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error('Error during delete comment', error);
        res.status(500).json({ error: 'Error during delete comment' });
    }
};

const getPublishedComments = async (req, res) => {
    try {
        const publishedComments = await Comment.find({ status: 'Publish' });
        res.status(200).json({ success: true, comments: publishedComments });
    } catch (error) {
        console.error('Error during fetching published comments', error);
        res.status(500).json({ error: 'Error during fetching published comments' });
    }
};

const getDraftComments = async (req, res) => {
    try {
        const draftComments = await Comment.find({ status: 'Draft' });
        res.status(200).json({ success: true, comments: draftComments });
    } catch (error) {
        console.error('Error during fetching draft comments', error);
        res.status(500).json({ error: 'Error during fetching draft comments' });
    }
};

const all = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error during fetching comments', error);
        res.status(500).json({ error: 'Error during fetching comments' });
    }
}

export { newComment, updateComment, deleteComment, getPublishedComments, getDraftComments, all};