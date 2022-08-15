import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { DeleteFeat, GetFeats } from '../services/FeatReq'
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
  displayCreateForm,
  updateFeatFormValues,
  submitFeatForm,
  setFeats,
  setActive,
  setFormDisplay,
  setReRender,
  deleteUserFeat
}) => {
  const deleteUserFeat = async (e, featId) => {
    const data = await DeleteFeat(featId)
    setFeats(data)
    setReRender(true)
  }

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
            <FeatCard feat={feat} />
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
