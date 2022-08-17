import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'
import CommentForm from '../components/CommentForm'
import { GetFeatById } from '../services/FeatReq'

const FeatDetails = ({
  feat,
  comments,
  commentEditing,
  commentFormValues,
  setCommentFormValues,
  updateComment,
  updateComText,
  submitCommentForm,
  updateCommentFormValues,
  deleteUserComment,
  displayCreateForm,
  formDisplay,
  setFormDisplay,
  editing,
  setEditing,
  displayEditCom,
  selectedComment
}) => {
  const [singleFeat, setSingleFeat] = useState(null)
  const { featId } = useParams()

  const getFeat = async (featId) => {
    let res = await GetFeatById(featId)
    setSingleFeat(res)
    console.log(res)
  }

  useEffect(() => {
    getFeat(featId)
    setFormDisplay('none')
  }, [])
  return (
    <div className="feat-detail-container">
      {singleFeat ? (
        <main>
          <div className="feat-detail">
            <h3>{singleFeat.author.username}</h3>
            <img src={singleFeat.image} alt={singleFeat.type} />
            <h3>{singleFeat.type}</h3>
            <h3>{singleFeat.bodyPart}</h3>
            <h3>{singleFeat.intensity}</h3>
            <p>{singleFeat.description}</p>
          </div>
          <div style={{ display: `${formDisplay}` }}>
            <CommentForm
              commentFormValues={commentFormValues}
              updateCommentFormValues={updateCommentFormValues}
              submitCommentForm={submitCommentForm}
              editing={editing}
              setEditing={setEditing}
              setCommentFormValues={setCommentFormValues}
            />
            <button onClick={displayCreateForm}></button>
          </div>
          <div className="feat-comments-container">
            {singleFeat.comment_list.length > 0 ? (
              singleFeat.comment_list.map((comment) => (
                <div key={comment.id}>
                  {editing && selectedComment.id === comment.id ? (
                    <CommentForm
                      featId={featId}
                      commentFormValues={commentFormValues}
                      commentEditing={commentEditing}
                      updateCommentFormValues={updateCommentFormValues}
                      submitCommentForm={submitCommentForm}
                      setCommentFormValues={setCommentFormValues}
                      displayEditCom={displayEditCom}
                    />
                  ) : (
                    <CommentCard comment={comment} />
                  )}
                  <button onClick={updateComment}>{updateComText}</button>
                  <button onClick={() => deleteUserComment(comment.id)}>
                    X
                  </button>
                </div>
              ))
            ) : (
              <h1>No Comments</h1>
            )}
          </div>
        </main>
      ) : (
        <h1>Loading Feat...</h1>
      )}
    </div>
  )
}

export default FeatDetails
