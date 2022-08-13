import React from 'react'
import { useState } from 'react'

const [featValues, setFeatValues] = useState({
  type: '',
  bodyPart: '',
  intensity: '',
  description: '',
  image: ''
})

const submitFeatForm = async () => {
  e.preventDefault()
}

const FeatForm = ({ featValues }) => {
  return (
    <div>
      <h1>FeatForm</h1>
      <form onSubmit={submitFeatForm}>
        <label htmlFor="type">Type:</label>
        <select name="type" id="type" value={featValues.type}>
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
        <select name="bodyPart" id="bodyPart" value={featValues.bodyPart}>
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
        <input type="range" min={0} max={5} value={featValues.intensity} />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          placeholder="Please describe the workout in more detail"
          value={featValues.desctiption}
        ></textarea>

        <label htmlFor="image"></label>

        <button>Post Feat</button>
      </form>
    </div>
  )
}

export default FeatForm
