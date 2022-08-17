import { useNavigate } from "react-router-dom"

const CommentForm = ({ feat, user, comment, editing, setEditing, newComment }) => {
  useEffect(() => {
    if (editing) {
      setFeatFormValues({
        type: feat.type,
        bodyPart: feat.bodyPart,
        intensity: feat.intensity,
        description: feat.description,
        image: feat.image
      })
    }
  }, [])
  let navigate = useNavigate()
  return (
    <div className="comment-form-container">
      <div id='comment-info'>
        <h3>{comment.username}</h3>
        <h3>{comment.description}</h3>
      </div>
      <form id='comment-info-form'onSubmit={(e) => submitCommentForm(e, selectedComment.id)}>
        <textarea
          type="text"
          id={comment.username}
          name="new-comment"
          placeholder={comment.description}
          value={newComment.description}
          onChange={newComment}
          required
        />
        <button
          type="submit" className="btn">
          🏋️
        </button>
        {!editing && ( <button type="button" onClick={displayCreateForm} className="btn">Nevermind!</button>)}
      </form>
    </div>
  )
}

export default CommentForm

