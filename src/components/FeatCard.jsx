import React from 'react'

const FeatCard = ({ feat, showFeat, user, addFeatLike, removeFeatLike }) => {
  return (
    <div className="feat-card" onClick={() => showFeat(feat)}>
      {feat.createdAt !== feat.updatedAt && <p id="edited">(edited)</p>}
      <h2>{feat.author.username}</h2>
      <h3>{feat.likes}</h3>
      <img src={feat.image} alt={feat.type} />
      <p>{feat.type}</p>
      <p>{feat.bodyPart}</p>
      <p>{feat.intensity}</p>
      <p id="feat-descript">{feat.description}</p>
      {feat.feat_likes.length > 0 && (
        <p
          onClick={() =>
            feat.feat_likes.some((like) =>
              like.id === user.id
                ? addFeatLike(feat.id)
                : removeFeatLike(feat.id)
            )
          }
          className={() =>
            feat.feat_likes.some((like) =>
              like.id === user.id ? 'user-like' : undefined
            )
          }
        >
          {feat.feat_likes.length}
        </p>
      )}
      {feat.comment_list.length > 0 && (
        <p
          className={() =>
            feat.comment_list.some((comment) =>
              comment.commenter.id === user.id ? 'user-comment' : undefined
            )
          }
        >
          {feat.comment_list.length}
        </p>
      )}
    </div>
  )
}

export default FeatCard
