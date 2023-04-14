import React from "react";

const PostThread = ({
  title,
  body,
  author,
  comments,
  threadComments,
  openModal,
  deleteComment,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <div className="py-5">{body}</div>
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span>Posted by {author}</span>
        <span>{comments} comments</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Comments:</h3>
        {threadComments &&
          threadComments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-300 rounded-md p-2 mb-2"
            >
              <div className="text-gray-500 mb-2">{comment.email}</div>
              <div>{comment.body}</div>
              <div
                className="cursor-pointer text-sm text-gray-500 py-2"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </div>
            </div>
          ))}
        <button
          className="text-gray-700 font-bold mt-1 rounded"
          onClick={openModal}
        >
          Post new comment
        </button>
      </div>
    </div>
  );
};

export default PostThread;
