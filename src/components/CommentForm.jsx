const CommentForm = () => {

  return (
    <div className="comment-form-container">
      <div id='comment-info'>
        <h3>{comment.username}</h3>
        <h3>{comment.description}</h3>
      </div>
      <form id='comment-info-form'onSubmit={submitComment}>
        <textarea
          type="text"
          id={comment.username}
          name="newComment"
          placeholder={comment.description}
          value={newComment.description}
          onInput={newComment}
          required
        />
        <button
          type="submit">
          🏋️
        </button>
      </form>
    </div>
  )
}

export default CommentForm