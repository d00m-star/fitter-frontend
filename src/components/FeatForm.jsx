import React from 'react'
import { useState } from 'react'

const FeatForm = ({ displayCreateFeat }) => {
  // { featFormValues, updateFeatFormValues, submitFeatForm }
  const [featFormValues, setFeatFormValues] = useState({
    type: '',
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })

  const updateFeatFormValues = (e) => {
    setFeatFormValues({ ...featFormValues, [e.target.id]: e.target.value })
  }

  const submitFeatForm = async (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>FeatForm</h1>
      <form onSubmit={submitFeatForm}>
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          id="type"
          value={featFormValues.type}
          onChange={updateFeatFormValues}
        >
          <option value="" disabled hidden>
            {' '}
          </option>
          <option value="cardio">cardio</option>
          <option value="weight">weight training</option>
          <option value="stretching">stretching</option>
          <option value="yoga">yoga</option>
          <option value="pilates">pilates</option>
        </select>

        <label htmlFor="bodyPart">Body Part:</label>
        <select
          name="bodyPart"
          id="bodyPart"
          value={featFormValues.bodyPart}
          onChange={updateFeatFormValues}
        >
          <option value="" disabled hidden>
            {' '}
          </option>
          <option value="chest">chest</option>
          <option value="back">back</option>
          <option value="arms">arms</option>
          <option value="abdominals">abdominals</option>
          <option value="legs">legs</option>
          <option value="shoulders">shoulders</option>
          <option value="glutes">glutes</option>
          <option value="lats">lats</option>
          <option value="body">entire body</option>
        </select>

        <label htmlFor="intensity">Intensity:</label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={featFormValues.intensity}
          onChange={updateFeatFormValues}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          placeholder="Please describe the workout in more detail"
          value={featFormValues.desctiption}
          onChange={updateFeatFormValues}
        ></textarea>

        <label htmlFor="image"></label>

        <button type="summit">Post Feat</button>
        <button onClick={displayCreateFeat}>Nevermind!</button>
      </form>
    </div>
  )
}

export default FeatForm
