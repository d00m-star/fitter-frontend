import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CommentForm = ({
  feat,
  user,
  comment,
  editing,
  setEditing,
  selectedComment,
  displayEditCom,
  submitCommentForm
}) => {
  useEffect(() => {
    if (editing) {
      setCommentFormValues({
        description: selectedComment.description
      })
    }
  }, [])
  return (
    <div className="comment-form-container">
      <form
        id="comment-info-form"
        onSubmit={(e) => submitCommentForm(e, selectedComment.id)}
      >
        <textarea
          type="text"
          id={selectedComment.username}
          name="new-comment"
          placeholder={selectedComment.description}
          value={selectedComment.description}
          onChange={selectedComment.value}
          required
        />

        <button type="submit" className="btn">
          🏋️
        </button>
        {!editing && (
          <button type="button" onClick={displayEditCom} className="btn">
            Nevermind!
          </button>
        )}
      </form>
    </div>
  )
}

export default CommentForm
