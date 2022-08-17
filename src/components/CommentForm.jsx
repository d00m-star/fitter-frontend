import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CommentForm = ({
  editing,
  selectedComment,
  displayEditCom,
  displayCreateForm,
  submitCommentForm,
  commentFormValues,
  setCommentFormValues,
  updateCommentFormValues
}) => {
  let { featId } = useParams()

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
        onSubmit={(e) => submitCommentForm(e, featId, selectedComment.id)}
      >
        <textarea
          type="text"
          id="description"
          name="comment"
          placeholder="Add your comment"
          value={commentFormValues.description}
          onChange={updateCommentFormValues}
          required
        ></textarea>

        <button type="submit" className="btn">
          🏋️
        </button>
        {!editing && (
          <button type="button" onClick={displayCreateForm} className="btn">
            Nevermind!
          </button>
        )}
      </form>
    </div>
  )
}

export default CommentForm
