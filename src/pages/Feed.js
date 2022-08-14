import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetFeats, PostFeat } from '../services/FeatReq'
import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Feed = ({
  feats,
  setFeats,
  active,
  featFormValues,
  featFormDisplay,
  updateFeatFormValues,
  displayCreateFeat,
  submitFeatForm,
  emoji
}) => {
  let navigate = useNavigate

  const showFeat = (feat) => {
    navigate(`/feats/${feat.id}`)
  }

  useEffect(() => {
    const handleFeats = async () => {
      const data = await GetFeats()
      setFeats(data)
    }
    handleFeats()
  }, [submitFeatForm])

  return (
    <div>
      <div className="feat-grid">
        {feats?.map((feat) => (
          <div key={feat.id} onClick={() => showFeat(feat)}>
            <FeatCard feat={feat} />
          </div>
        ))}
      </div>
      <button className="btn" onClick={displayCreateFeat} disabled={active}>
        Create Feat
      </button>
      <div style={{ display: `${featFormDisplay}` }}>
        <FeatForm
          displayCreateFeat={displayCreateFeat}
          featFormValues={featFormValues}
          updateFeatFormValues={updateFeatFormValues}
          submitFeatForm={submitFeatForm}
          emoji={emoji}
        />
      </div>
    </div>
  )
}

export default Feed
