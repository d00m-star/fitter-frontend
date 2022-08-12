const LoginForm = ({ loginValues, updateLoginValues, submitLogin }) => {
  return (
    <div>
      <form onSubmit={submitLogin}>
        <input
          name="username"
          value={loginValues.username}
          onInput={updateLoginValues}
        />
        <input
          name="password"
          value={loginValues.password}
          onInput={updateLoginValues}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
