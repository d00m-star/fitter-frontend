import { useEffect, useState } from 'react'

const FeatForm = ({
  featFormValues,
  emoji,
  displayCreateForm,
  updateFeatFormValues,
  submitFeatForm,
  feat,
  featEditing,
  setFeatFormValues,
  selectedFeat,
  img,
  setImg,
  preview,
  setPreview,
  handleImage
}) => {
  // to show a preview whenever we have an img stored
  useEffect(() => {
    const reader = new FileReader()
    if (img) {
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(img)
    } else {
      setPreview('')
    }
    console.log(reader)
  }, [img])

  useEffect(() => {
    if (featEditing) {
      setFeatFormValues({
        type: feat.type,
        bodyPart: feat.bodyPart,
        intensity: feat.intensity,
        description: feat.description,
        image: feat.image
      })
    }
  }, [])

  return (
    <div>
      <form
        onSubmit={(e) => submitFeatForm(e, selectedFeat.id)}
        className="form"
      >
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          id="type"
          type="select"
          value={featFormValues.type}
          onChange={updateFeatFormValues}
        >
          <option type="option" value="" disabled hidden>
            {' '}
          </option>
          <option type="option" value="cardio">
            cardio
          </option>
          <option type="option" value="weight">
            weight training
          </option>
          <option type="option" value="stretching">
            stretching
          </option>
          <option type="option" value="yoga">
            yoga
          </option>
          <option type="option" value="pilates">
            pilates
          </option>
        </select>

        <label htmlFor="bodyPart">Body Part:</label>
        <select
          name="bodyPart"
          id="bodyPart"
          type="select"
          value={featFormValues.bodyPart}
          onChange={updateFeatFormValues}
        >
          <option type="option" value="" disabled hidden>
            {' '}
          </option>
          <option type="option" value="chest">
            chest
          </option>
          <option type="option" value="back">
            back
          </option>
          <option type="option" value="arms">
            arms
          </option>
          <option type="option" value="abdominals">
            abdominals
          </option>
          <option type="option" value="legs">
            legs
          </option>
          <option type="option" value="shoulders">
            shoulders
          </option>
          <option type="option" value="glutes">
            glutes
          </option>
          <option type="option" value="lats">
            lats
          </option>
          <option type="option" value="body">
            entire body
          </option>
        </select>

        <label htmlFor="intensity">Intensity:</label>
        <input
          type="range"
          id="intensity"
          min="0"
          max="5"
          step="1"
          value={featFormValues.intensity}
          onChange={updateFeatFormValues}
        />
        <label htmlFor="intensity">{emoji}</label>

        <label htmlFor="description">Description:</label>
        <textarea
          type="textarea"
          id="description"
          cols="30"
          rows="10"
          placeholder="Please describe the workout in more detail"
          value={featFormValues.description}
          onChange={updateFeatFormValues}
        ></textarea>

        <label htmlFor="image">Photo:</label>
        <input type="file" id="image" accept="image/*" onChange={handleImage} />
        <img src={preview} alt="preview" id="preview" />
        <button type="submit" className="btn">
          Post Feat
        </button>
        {!featEditing && (
          <button type="button" onClick={displayCreateForm} className="btn">
            Nevermind!
          </button>
        )}
      </form>
    </div>
  )
}

export default FeatForm
