import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { GetFeatById } from '../services/FeatReq'

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
  const [singleFeat, setSingleFeat] = useState(null)
  const { featId } = useParams()

  const getFeat = async (featId) => {
    let res = await GetFeatById(featId)
    console.log(res)
    setSingleFeat(res)
  }

  useEffect(() => {
    getFeat(featId)
  }, [])
  return (
    <div className="feat-detail-container">
      {/* <div className="feat-detail">
        <h3>{singleFeat.author.username}</h3> */}
      {/* <img src={singleFeat.image} alt={feat.type} />
        <h3>{singleFeat.type}</h3>
        <h3>{singleFeat.bodyPart}</h3>
        <h3>{singleFeat.intensity}</h3>
        <p>{singleFeat.description}</p> */}
      {/* </div> */}
      {/* <div className="feat-comments-container">
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
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default FeatDetails
