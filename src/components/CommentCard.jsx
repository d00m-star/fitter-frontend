const CommentCard = ({ user, comment, addCommentLike, removeCommentLike }) => {
  return (
    <div className="comment-card">
      <div className="comment-info">
        <h4>{comment.commenter.username}</h4>
        <h2>{comment.description}</h2>
      </div>
      <div className="comment-likes">
        {comment.comment_likes.length > 0 ? (
          <p
            className={() =>
              comment.comment_likes.some((like) =>
                like.id === user.id ? 'user-like' : undefined
              )
            }
          >
            {comment.comment_likes.length}
          </p>
        ) : (
          <p>0</p>
        )}
      </div>
    </div>
  )
}
export default CommentCard
