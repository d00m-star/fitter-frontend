import { useEffect } from 'react'

const CommentForm = ({
  editing,
  selectedComment,
  displayEditCom,
  submitCommentForm,
  commentFormValues,
  updateCommentFormValues
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
          id="description"
          name="comment"
          placeholder="Add your comment"
          value={commentFormValues.description}
          onChange={updateCommentFormValues}
          required>
        </textarea>
        

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
