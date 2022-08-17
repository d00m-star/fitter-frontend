const CommentCard = ({ user, comment, addCommentLike, removeCommentLike }) => {
  return (
    <div className="comment-list">
        <div className="comment-card">
          <h4>{comment.username}</h4>
          <h2>{comment.description}</h2>
          {/* {comment.comment_likes.length > 0 && (
        <p
          className={() =>
            comment.comment_likes.some((like) =>
              like.id === user.id ? 'user-like' : undefined
            )
          }
        >
          {comment.comment_likes.length}
        </p>
      )} */}
        </div>
    </div>
  )
}
export default CommentCard