import Client from '../services/api'

const FeatDetails = ({ feat, comments }) => {
  return (
    <div className="feat-detail-container">
      <div className="feat-detail" key={feat.id}>
        <h3>{feat.author.username}</h3>
        <img src={feat.image} alt={feat.type} />
        <h3>{feat.type}</h3>
        <h3>{feat.bodyPart}</h3>
        <h3>{feat.intensity}</h3>
        <p>{feat.description}</p>
      </div>
      <div className="feat-comments-container">
        {comments.map((comment) => (
          <div className="feat-comments-detail">
            <h4>{comment.username}</h4>
            <p>{comment.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatDetails
