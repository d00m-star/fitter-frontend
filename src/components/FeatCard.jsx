import React from 'react'

const FeatCard = ({ feat }) => {
  return (
    <div className="feat-card">
      <h2>{feat.username}</h2>
      <h3>{feat.likes}</h3>
      <img src={feat.image} alt={feat.type} />
      <p>{feat.type}</p>
      <p>{feat.bodyPart}</p>
      <p>{feat.intensity}</p>
      <p>{feat.description}</p>
    </div>
  )
}

export default FeatCard
