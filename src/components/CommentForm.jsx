const CommentForm = () => {
  return (
    <div className="comment-form">
      <form onSubmit={submitComment}>
        <label htmlFor="name">Description:</label>
        <textarea
          type="text"
          id="newComment"
          name="name"
          placeholder={comment.description}
          value={newComment.description}
          onInput={newComment}
        />
        <button
          type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default CommentForm