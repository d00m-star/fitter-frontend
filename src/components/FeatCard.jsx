import { useEffect, useState } from 'react'

const FeatCard = ({
  addFeatLike,
  feat,
  // likeActive,
  // setLikeActive,
  setReRender,
  showFeat,
  removeFeatLike,
  reRender,
  user
}) => {
  const [likeActive, setLikeActive] = useState(false)
  const match = (like) => like.id === user.id

  const makeLikeActive = (feat) => {
    let activeLike = feat.feat_likes.some(match)
    activeLike && setLikeActive(activeLike)
  }

  useEffect(() => {
    makeLikeActive(feat)
    setReRender(false)
  }, [reRender])

  return (
    <div className="feat-card">
      <main className="fc-info" onClick={() => showFeat(feat)}>
        {feat.createdAt !== feat.updatedAt && <p id="edited">(edited)</p>}
        <h2>{feat.author.username}</h2>
        <h3>{feat.likes}</h3>
        <img src={feat.image} alt={feat.type} />
        <p>{feat.type}</p>
        <p>{feat.bodyPart}</p>
        <p>{feat.intensity}</p>
        <p id="feat-descript">{feat.description}</p>
      </main>
      <div className="fc-button-container">
        <span>
          {feat.feat_likes.length > 0 ? (
            <p
              onClick={() =>
                !likeActive
                  ? addFeatLike(user.id, feat.id)
                  : removeFeatLike(user.id, feat.id)
              }
              className={likeActive ? 'user-like' : undefined}
            >
              {feat.feat_likes.length}
            </p>
          ) : (
            <p onClick={() => addFeatLike(user.id, feat.id)}>Like</p>
          )}
          {/* {feat.comment_list.length > 0 ? (
            <p
              className={likeActive ? 'user-comment' : undefined
                )
              }
            >
              {feat.comment_list.length}
            </p>
          ) : (
            <p>Comments</p>
          )} */}
        </span>
      </div>
    </div>
  )
}

export default FeatCard
