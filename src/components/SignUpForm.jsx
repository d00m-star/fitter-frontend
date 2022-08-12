const SignUpForm = ({
  signUpValues,
  updateSignUpValues,
  submitSignUp,
  passwordMatch
}) => {
  return (
    <div>
      <form onSubmit={submitSignUp}>
        <input
          name="name"
          value={signUpValues.name}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="age"
          value={signUpValues.age}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="location"
          value={signUpValues.location}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="username"
          value={signUpValues.username}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="email"
          value={signUpValues.email}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="password"
          value={signUpValues.password}
          onInput={updateSignUpValues}
          required
        />
        <input
          name="confirmPassword"
          value={signUpValues.confirmPassword}
          onInput={updateSignUpValues}
          required
        />
        <button
          type="submit"
          disabled={
            !signUpValues.name ||
            !signUpValues.age ||
            !signUpValues.location ||
            !signUpValues.username ||
            !signUpValues.email ||
            !signUpValues.password ||
            !signUpValues.confirmPassword ||
            !passwordMatch
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
