const SignUpForm = ({ signUpValues, updateSignUpValues, submitSignUp }) => {
  return (
    <div>
      <form onSubmit={submitSignUp}>
        <input
          name="name"
          value={signUpValues.name}
          onInput={updateSignUpValues}
        />
        <input
          name="age"
          value={signUpValues.age}
          onInput={updateSignUpValues}
        />
        <input
          name="location"
          value={signUpValues.location}
          onInput={updateSignUpValues}
        />
        <input
          name="username"
          value={signUpValues.username}
          onInput={updateSignUpValues}
        />
        <input
          name="email"
          value={signUpValues.email}
          onInput={updateSignUpValues}
        />
        <input
          name="password"
          value={signUpValues.password}
          onInput={updateSignUpValues}
        />
        <input
          name="confirmPassword"
          value={signUpValues.confirmPassword}
          onInput={updateSignUpValues}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
