const LoginForm = ({ loginValues, updateLoginValues, submitLogin }) => {
  return (
    <div>
      <form onSubmit={submitLogin}>
        <input
          name="username"
          value={loginValues.username}
          onInput={updateLoginValues}
          required
        />
        <input
          name="password"
          value={loginValues.password}
          onInput={updateLoginValues}
          required
        />
        <button
          type="submit"
          disabled={!signUpValues.username || !signUpValues.password}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
