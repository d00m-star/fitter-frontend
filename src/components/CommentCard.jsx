import { useEffect, useState } from 'react'

import { BsFillSuitHeartFill } from 'react-icons/bs'

const CommentCard = ({ user, comment, setReRender }) => {
  const [comLikeActive, setComLikeActive] = useState(false)

  const toggleComLikeActive = async (user, feat) => {
    if (!comLikeActive) {
      await addCommentLike(user.id, feat.id)
      setComLikeActive(comLikeActive)
    } else {
      await removeCommentLike(user.id, feat.id)
      let likeToggle = false
      setComLikeActive(likeToggle)
    }
  }

  const likeMatch = (like) => like.id === user.id

  const makeLikeActive = (comment) => {
    let activeLike = comment.comment_likes.some(likeMatch)
    activeLike && setComLikeActive(activeLike)
  }

  useEffect(() => {
    makeLikeActive(comment)
    setReRender(false)
  }, [comLikeActive, toggleComLikeActive, !comment])

  return (
    <div className="comment-card">
      <div className="comment-info">
        <h4>{comment.commenter.username}</h4>
        <h2>{comment.description}</h2>
      </div>
      <div className="comment-likes">
        {comment.comment_likes.length > 0 ? (
          <p
            onClick={() => toggleComLikeActive(user, comment)}
            className={() =>
              comment.comment_likes.some((like) =>
                like.id === user.id ? 'user-like' : undefined
              )
            }
          >
            <BsFillSuitHeartFill className="com-like-icon" />
            {comment.comment_likes.length}
          </p>
        ) : (
          <p>
            <BsFillSuitHeartFill className="com-like-icon" />
          </p>
        )}
      </div>
    </div>
  )
}
export default CommentCard
