import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { GetFeats } from '../services/FeatReq'
import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Feed = ({
  user,
  feats,
  formDisplay,
  featFormValues,
  emoji,
  active,
  reRender,
  showFeat,
  featEditing,
  updateText,
  displayCreateForm,
  updateFeatFormValues,
  submitFeatForm,
  displayEditFeat,
  deleteUserFeat,
  setFeats,
  setActive,
  setFormDisplay,
  setReRender,
  setFeatFormValues
}) => {
  useEffect(() => {
    const handleFeats = async () => {
      const data = await GetFeats()
      setFeats(data)
    }
    handleFeats()
    setActive(false)
    setFormDisplay('none')
    setReRender(false)
  }, [reRender])

  return (
    <div>
      <div className="feat-grid">
        {feats?.reverse().map((feat) => (
          <div key={feat.id} onClick={() => showFeat(feat)}>
            {!featEditing ? (
              <FeatCard feat={feat} />
            ) : (
              <FeatForm
                feat={feat}
                featFormValues={featFormValues}
                featEditing={featEditing}
                updateFeatFormValues={updateFeatFormValues}
                submitFeatForm={submitFeatForm}
                emoji={emoji}
                setFeatFormValues={setFeatFormValues}
              />
            )}
            <button onClick={displayEditFeat}>{updateText}</button>
            <button onClick={() => deleteUserFeat(feat.id)}>X</button>
          </div>
        ))}
      </div>
      <button className="btn" onClick={displayCreateForm} disabled={active}>
        Create Feat
      </button>
      <div style={{ display: `${formDisplay}` }}>
        <FeatForm
          featFormValues={featFormValues}
          emoji={emoji}
          displayCreateForm={displayCreateForm}
          updateFeatFormValues={updateFeatFormValues}
          submitFeatForm={submitFeatForm}
        />
      </div>
    </div>
  )
}

export default Feed
