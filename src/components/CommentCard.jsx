import { useNavigate } from 'react-router-dom'

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div className="comment-card" key={comment.id}>
          <h4>{comment.username}</h4>
          <h2>{comment.description}</h2>
          <button onClick={() => showComment(comment)}>Update</button>
        </div>
      ))}
    </div>
  )
}
export default CommentCard
