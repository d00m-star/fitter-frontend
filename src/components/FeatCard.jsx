import React from 'react'

const FeatCard = ({ feat, showFeat }) => {
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
    </div>
  )
}

export default FeatCard
