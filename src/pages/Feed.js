import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetFeats } from '../services/FeatAuth'
import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Feed = ({ feats, setFeats }) => {
  let navigate = useNavigate

  const [formDisplay, setFormDisplay] = useState('none')

  useEffect(() => {
    const handleFeats = async () => {
      const data = await GetFeats()
      setFeats(data)
    }
    handleFeats()
  }, [])

  const showFeat = (feat) => {
    navigate(`/feats/${feat.id}`)
  }

  const displayCreateFeat = () => {
    formDisplay === 'none' ? setFormDisplay('flex') : setFormDisplay('none')
  }

  return (
    <div>
      <div className="feat-grid">
        {feats?.map((feat) => (
          <div key={feat.id} onClick={() => showFeat(feat)}>
            <FeatCard feat={feat} />
          </div>
        ))}
      </div>
      <button onClick={displayCreateFeat}>Create Feat</button>
      <div style={{ display: `${formDisplay}` }}>
        <FeatForm />
      </div>
    </div>
  )
}

export default Feed
