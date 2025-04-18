'use client';

import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import Cookies from 'js-cookie';

function Comments({ postId, commentId, title }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
    const userIdFromStorage = Cookies.get('userId') || sessionStorage.getItem('userId');
    const nameFromStorage = Cookies.get('name') || sessionStorage.getItem('name');
    setIsLoggedIn(loggedIn);
    setUserId(userIdFromStorage);
    setName(nameFromStorage);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/published`);
        const data = await response.json();
        if (response.ok) {
          const filteredComments = data.comments.filter(comment => commentId.includes(comment._id));
          setComments(filteredComments);
        } else {
          console.error('Failed to fetch comments:', data.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [commentId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to post a comment.');
      return;
    }

    try {
      const payload = {
        postId,
        userId,
        title,
        commentName: name,
        comment: commentText,
      };
      console.log('Payload:', payload);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok && data.success) {
        alert('Comment posted successfully!');
        setCommentText('');
        setComments([...comments, data.comment]);
      } else {
        alert(`Failed to post comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentText(comment.comment);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to update a comment.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/update/${editCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: editCommentText,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('Comment updated successfully!');
        setComments(comments.map(comment => comment._id === editCommentId ? { ...comment, comment: editCommentText } : comment));
        setEditCommentId(null);
        setEditCommentText('');
      } else {
        alert(`Failed to update comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!isLoggedIn) {
      alert('Please log in to delete a comment.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/delete/${commentId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('Comment deleted successfully!');
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        alert(`Failed to delete comment: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className='w-[70vw] mx-auto mt-3 text-white'>
        <h1 className='flex items-center gap-4 text-3xl font-semibold '>
          <i className='w-5 h-5 bx bxs-comment-detail'></i>Comments
        </h1>
        <div className='flex flex-col mt-3 sm:pl-10'>
          <h3 className='flex items-center gap-1 py-1 text-sm font-bold'>
            <i className='bx bxs-user'></i>{name}
          </h3>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              className='w-full sm:w-[50vw] resize-none p-3 rounded-lg bg-transparent border border-red-500 focus:outline-none text-base h-[200px]'
              placeholder='Write your comment here...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type='submit'
              className="hover:brightness-110 font-bold py-3 px-6 rounded-full bg-red-500 text-white mt-3 w-[98%] sm:w-[48vw] ml-[2%] mb-5">
              Send Comment
            </button>
          </form>
        </div>
      </div>

      <div className='w-[70vw] mx-auto mt-1'>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className='w-full p-4 mx-auto text-white border border-red-500 rounded-lg sm:w-[50vw] mt-2'>
              <div className='flex justify-between'>
                <h3 className='flex items-center gap-1 py-1 text-sm font-bold'>
                  <i className='bx bxs-user'></i>{comment.commentName}
                </h3>
                {comment.userId === userId && (
                  <div className='flex items-center gap-5'>
                    <div className='flex items-center text-sm hover:text-red-500' onClick={() => handleEditComment(comment)}>
                      <i className='bx bx-edit'></i>Edit
                    </div>
                    <div className='flex items-center gap-1 text-sm text-red-400 hover:text-red-500' onClick={() => handleDeleteComment(comment._id)}>
                      Delete<i className='bx bxs-message-minus'></i>
                    </div>
                  </div>
                )}
              </div>
              <p className='text-sm text-gray-300'>{comment.comment}</p>
              {editCommentId === comment._id && (
                <form onSubmit={handleUpdateComment}>
                  <textarea
                    className='w-[90vw] sm:w-[40vw] resize-none p-3 rounded-lg bg-transparent border border-green-500 focus:outline-none text-base h-[60px]'
                    placeholder='Edit your comment here...'
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                  />
                  <button
                    type='submit'
                    className="hover:brightness-110 font-bold py-3 px-6 rounded-full bg-green-500 text-white mt-3 w-[88%] sm:w-[38vw] ml-[2%] mb-5">
                    Update Comment
                  </button>
                </form>
              )}
            </div>
          ))
        ) : (
          <div className='w-full p-4 mx-auto text-white border border-red-500 rounded-lg sm:w-[50vw]'>
            <p className='text-sm text-gray-300'>No comments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
