const SignUpForm = ({ signUpValues, updateSignUpValues, submitSignUp }) => {
  return (
    <div>
      <form onSubmit={submitSignUp}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ex: Mike Jones"
          value={signUpValues.name}
          onInput={updateSignUpValues}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Ex: 40"
          value={signUpValues.age}
          onInput={updateSignUpValues}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Ex: Houston"
          value={signUpValues.location}
          onInput={updateSignUpValues}
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="two31three30eight004"
          value={signUpValues.username}
          onInput={updateSignUpValues}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ex: mikejooooones@who.com"
          value={signUpValues.email}
          onInput={updateSignUpValues}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Minimum 8 characters"
          value={signUpValues.password}
          onInput={updateSignUpValues}
          minLength={8}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Must match"
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
            !signUpValues.confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
