const LoginForm = ({ loginValues, updateLoginValues, submitLogin }) => {
  return (
    <div>
      <form onSubmit={(e) => submitLogin(e)}>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          name="username"
          value={loginValues.username}
          onInput={updateLoginValues}
          required
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={loginValues.password}
          onInput={updateLoginValues}
          required
        />
        <button
          type="submit"
          disabled={!loginValues.username || !loginValues.password}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
