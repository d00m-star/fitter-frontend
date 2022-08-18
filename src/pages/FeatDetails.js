import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'
import CommentForm from '../components/CommentForm'
import { GetFeatById } from '../services/FeatReq'

const FeatDetails = ({
  commentEditing,
  commentFormValues,
  comments,
  deleteUserComment,
  displayCreateForm,
  displayEditCom,
  editing,
  feat,
  formDisplay,
  reRender,
  selectedComment,
  setCommentFormValues,
  setEditing,
  setFormDisplay,
  setReRender,
  submitCommentForm,
  updateComment,
  updateCommentFormValues,
  updateComText
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
    setReRender(false)
  }, [reRender])
  return (
    <div className="feat-detail-page">
      {singleFeat ? (
        <main className="feat-detail-container">
          <section className="user-info">
            <h3>{singleFeat.author.username}</h3>
            <h3>{singleFeat.author.age}</h3>
            <h3>{singleFeat.author.location}</h3>
          </section>
          <section className="feat-detail">
            <img src={singleFeat.image} alt={singleFeat.type} />
            <h3>{singleFeat.type}</h3>
            <h3>{singleFeat.bodyPart}</h3>
            <h3>{singleFeat.intensity}</h3>
            <p>{singleFeat.description}</p>
          </section>
          <section className="fd-comment-container">
            <button id="open-comment" onClick={displayCreateForm}>
              <div style={{ display: `${formDisplay}` }}>
                <CommentForm
                  commentFormValues={commentFormValues}
                  displayCreateForm={displayCreateForm}
                  updateCommentFormValues={updateCommentFormValues}
                  submitCommentForm={submitCommentForm}
                  editing={editing}
                  setEditing={setEditing}
                  setCommentFormValues={setCommentFormValues}
                  selectedComment={selectedComment}
                />
              </div>
              Comment
            </button>
            <div className="fd-comment-feed">
              {singleFeat.comment_list.length > 0 ? (
                singleFeat.comment_list.map((comment) => (
                  <div className="com-card-form-container" key={comment.id}>
                    {editing && selectedComment.id === comment.id ? (
                      <CommentForm
                        editing={editing}
                        featId={featId}
                        commentFormValues={commentFormValues}
                        commentEditing={commentEditing}
                        updateCommentFormValues={updateCommentFormValues}
                        submitCommentForm={submitCommentForm}
                        setCommentFormValues={setCommentFormValues}
                        displayEditCom={displayEditCom}
                        displayCreateForm={displayCreateForm}
                        selectedComment={selectedComment}
                      />
                    ) : (
                      <CommentCard comment={comment} />
                    )}
                    <div className="comment-btns">
                      <button
                        onClick={() => displayEditCom(comment)}
                        className="edit-btn"
                      >
                        {updateComText}
                      </button>
                      <button
                        onClick={() => deleteUserComment(comment.id)}
                        className="delete-btn"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Comments</h1>
              )}
            </div>
          </section>
        </main>
      ) : (
        <h1>Loading Feat...</h1>
      )}
    </div>
  )
}

export default FeatDetails
