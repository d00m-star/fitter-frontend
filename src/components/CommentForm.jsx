import { useNavigate } from 'react-router-dom'

const CommentForm = ({ feat, user, comment, editing, setEditing }) => {
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
      <div id="comment-info">
        <h3>{comment.username}</h3>
        <h3>{comment.description}</h3>
      </div>
      <form id="comment-info-form" onSubmit={submitComment}>
        <textarea
          type="text"
          id={comment.username}
          name="newComment"
          placeholder={comment.description}
          value={newComment.description}
          onInput={newComment}
          required
        />
        <button type="submit">🏋️</button>
        {!editing && (
          <button type="button" onClick={displayCreateForm} className="cancel">
            Nevermind!
          </button>
        )}
      </form>
    </div>
  )
}

export default CommentForm
