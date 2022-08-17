import { useParams } from 'react-router-dom'

const FeatDetails = ({
  feat,
  comments,
  commentEditing,
  commentFormValues,
  setCommentFormValues,
  CommentCard,
  CommentForm,
  updateComment,
  updateComText,
  submitCommentForm,
  updateCommentFormValues,
  deleteUserComment,
  displayCreateForm,
  formDisplay
}) => {
  const { featId } = useParams()
  return (
    <div className="feat-detail-container">
      <div className="feat-detail">
        <h3>{feat.author.username}</h3>
        <img src={feat.image} alt={feat.type} />
        <h3>{feat.type}</h3>
        <h3>{feat.bodyPart}</h3>
        <h3>{feat.intensity}</h3>
        <p>{feat.description}</p>
      </div>
      <div className="feat-comments-container">
        {comments?.reverse().map((comment) => (
          <div>
            {!commentEditing ? (
              <CommentCard key={comment.id} />
            ) : (
              <CommentForm
                featId={featId}
                commentFormValues={commentFormValues}
                commentEditing={commentEditing}
                updateCommentFormValues={updateCommentFormValues}
                submitCommentForm={submitCommentForm}
                setCommentFormValues={setCommentFormValues}
              />
            )}
            <button onClick={updateComment}>{updateComText}</button>
            <button onClick={() => deleteUserComment(comment.id)}>X</button>
          </div>
        ))}
        <button className="create-comment-btn" onClick={displayCreateForm}>
          Comment
        </button>
        <div style={{ display: `${formDisplay}` }}>
          <CommentForm
            displayCreateForm={displayCreateForm}
            commentFormValues={commentFormValues}
            updateCommentFormValues={updateCommentFormValues}
            submitCommentForm={submitCommentForm}
          />
        </div>
      </div>
    </div>
  )
}

export default FeatDetails
