const CommentCard = ({
  getComments,
  editComments,
  deleteComments,
  comment
}) => {
  return (
    <div className="comment-card">
      <h3>{comment.username}</h3>
      <h5>{comment.description}</h5>
    </div>
  )
}

export default Comment
