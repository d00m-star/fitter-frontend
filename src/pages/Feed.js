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
  selectedFeat,
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
  const handleFeats = async () => {
    const data = await GetFeats()
    console.log(data)
    setFeats(
      data.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      })
    )
  }

  useEffect(() => {
    handleFeats()
    setActive(false)
    setFormDisplay('none')
    setReRender(false)
  }, [reRender])

  return (
    <div id="feed-container">
      <button className="btn" onClick={displayCreateForm} disabled={active}>
        Create Feat
      </button>
      <div style={{ display: `${formDisplay}`, justifyContent: 'center' }}>
        <FeatForm
          featFormValues={featFormValues}
          emoji={emoji}
          displayCreateForm={displayCreateForm}
          updateFeatFormValues={updateFeatFormValues}
          submitFeatForm={submitFeatForm}
          selectedFeat={selectedFeat}
        />
      </div>
      <div className="feat-grid">
        {feats?.map((feat) => (
          <div className="feat-card-container" key={feat.id}>
            {!featEditing ? (
              <FeatCard feat={feat} showFeat={showFeat} user={user} />
            ) : selectedFeat.id === feat.id ? (
              <FeatForm
                feat={feat}
                featFormValues={featFormValues}
                featEditing={featEditing}
                updateFeatFormValues={updateFeatFormValues}
                submitFeatForm={submitFeatForm}
                emoji={emoji}
                setFeatFormValues={setFeatFormValues}
                selectedFeat={selectedFeat}
              />
            ) : (
              <FeatCard feat={feat} showFeat={showFeat} />
            )}
            {user && user.id === feat.userId ? (
              <button onClick={() => displayEditFeat(feat)}>
                {updateText}
              </button>
            ) : null}
            {user && user.id === feat.userId ? (
              <button onClick={() => deleteUserFeat(feat.id)}>X</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
