const SignUpForm = ({ signUpValues, updateSignUpValues, submitSignUp }) => {
  return (
    <form onSubmit={(e) => submitSignUp(e)} id="sign-up-form">
      <span>
        <label htmlFor="sign-up-name">Name:</label>
        <input
          type="text"
          id="sign-up-name"
          name="name"
          placeholder="Ex: Mike Jones"
          value={signUpValues.name}
          onInput={updateSignUpValues}
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-age">Age:</label>
        <input
          type="text"
          id="sign-up-age"
          name="age"
          placeholder="Ex: 40"
          value={signUpValues.age}
          onInput={updateSignUpValues}
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-location">Location:</label>
        <input
          type="text"
          id="sign-up-location"
          name="location"
          placeholder="Ex: Houston"
          value={signUpValues.location}
          onInput={updateSignUpValues}
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-username">Username:</label>
        <input
          type="text"
          id="sign-up-username"
          name="username"
          placeholder="two31three30eight004"
          value={signUpValues.username}
          onInput={updateSignUpValues}
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-email">Email:</label>
        <input
          type="email"
          id="sign-up-email"
          name="email"
          placeholder="Ex: mikejooooones@who.com"
          value={signUpValues.email}
          onInput={updateSignUpValues}
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-password">Password:</label>
        <input
          type="password"
          id="sign-up-password"
          name="password"
          placeholder="Minimum 8 characters"
          value={signUpValues.password}
          onInput={updateSignUpValues}
          minLength="8"
          required
        />
      </span>
      <span>
        <label htmlFor="sign-up-confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="sign-up-confirm-password"
          name="confirmPassword"
          placeholder="Must match"
          value={signUpValues.confirmPassword}
          onInput={updateSignUpValues}
          required
        />
      </span>
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
          signUpValues.password !== signUpValues.confirmPassword
        }
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignUpForm
