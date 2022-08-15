import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CommentForm = ({ feat, user, comment }) => {

  let navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [formDisplay, setFormDisplay] = useState('none')
  const [newComment, setNewComment] = useState({ 
    description: '', 
    userId: user.id, 
    featId: feat.id 
  })

  const renderForm = () => {
    if (formDisplay === 'none') {
      setFormDisplay('flex')
    } else {
      setFormDisplay('none')    }
    // editing && setComment({...comment, description: comment.description})  
  }

  return (
    <div className="comment-form-container">
      <div id='comment-info'>
        <h3>{comment.username}</h3>
        <h3>{comment.description}</h3>
      </div>
      <form id='comment-info-form'onSubmit={submitComment}>
        <textarea
          type="text"
          id={comment.username}
          name="newComment"
          placeholder={comment.description}
          value={newComment.description}
          onInput={newComment}
          required
        />
        <button
          type="submit">
          🏋️
        </button>
      </form>
    </div>
  )
}

export default CommentForm

