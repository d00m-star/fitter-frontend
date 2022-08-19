import { useEffect, useState } from 'react'

import { BsFillSuitHeartFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'

const FeatCard = ({
  addFeatLike,
  feat,
  setReRender,
  showFeat,
  removeFeatLike,
  user
}) => {
  const [likeActive, setLikeActive] = useState(false)
  const [commentActive, setCommentActive] = useState(false)
  const [emoji, setEmoji] = useState('')

  const toggleLikeActive = async (user, feat) => {
    if (!likeActive) {
      await addFeatLike(user.id, feat.id)
      setLikeActive(likeActive)
    } else {
      await removeFeatLike(user.id, feat.id)
      let likeToggle = false
      setLikeActive(likeToggle)
    }
  }

  const likeMatch = (like) => like.id === user.id
  const commentMatch = (comment) => comment.commenter.id === user.id

  const makeLikeActive = (feat) => {
    let activeLike = feat.feat_likes.some(likeMatch)
    activeLike && setLikeActive(activeLike)
  }

  const makeCommentActive = (feat) => {
    let activeComment = feat.comment_list.some(commentMatch)
    activeComment && setCommentActive(activeComment)
  }

  const makeEmoji = (feat) => {
    switch (feat.intensity) {
      case 0:
        setEmoji('🍔')
        break
      case 1:
        setEmoji('😅')
        break
      case 2:
        setEmoji('😫')
        break
      case 3:
        setEmoji('🥵')
        break
      case 4:
        setEmoji('🤬')
        break
      case 5:
        setEmoji('🤮')
        break
      default:
    }
  }

  useEffect(() => {
    makeLikeActive(feat)
    makeCommentActive(feat)
    setReRender(false)
    makeEmoji(feat)
  }, [likeActive, toggleLikeActive, !feat])

  return (
    <div className="feat-card">
      <main className="fc-info" onClick={() => showFeat(feat)}>
        <div className="auth-edited">
          {feat.createdAt !== feat.updatedAt && <p id="edited">(edited)</p>}
          <h2>{feat.author.username}</h2>
        </div>
        {feat.image !== '' && <img src={feat.image} alt={feat.type} />}
        <p>{feat.type}</p>
        <p>{feat.bodyPart}</p>
        <p>{emoji}</p>
        <p id="feat-descript">{feat.description}</p>
      </main>
      <div className="fc-button-container">
        <span>
          {feat.feat_likes.length > 0 ? (
            <p
              onClick={() => toggleLikeActive(user, feat)}
              className={likeActive ? 'user-like' : undefined}
            >
              <BsFillSuitHeartFill className="feat-like-icon" />{' '}
              {feat.feat_likes.length}
            </p>
          ) : (
            <p onClick={() => addFeatLike(user.id, feat.id)}>
              <BsFillSuitHeartFill className="feat-like-icon" />
            </p>
          )}
          {feat.comment_list.length > 0 ? (
            <p className={commentActive ? 'user-comment' : undefined}>
              <FaRegCommentDots className="comment-icon" />{' '}
              {feat.comment_list.length}
            </p>
          ) : (
            <p>
              <FaRegCommentDots className="comment-icon" />
            </p>
          )}
        </span>
      </div>
    </div>
  )
}

export default FeatCard
