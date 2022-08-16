const LoginForm = ({ loginValues, updateLoginValues, submitLogin }) => {
  return (
    <form onSubmit={(e) => submitLogin(e)} id="login-form">
      <span>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          name="username"
          value={loginValues.username}
          onInput={updateLoginValues}
          required
        />
      </span>
      <span>
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={loginValues.password}
          onInput={updateLoginValues}
          required
        />
      </span>
      <button
        type="submit"
        disabled={!loginValues.username || !loginValues.password}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
