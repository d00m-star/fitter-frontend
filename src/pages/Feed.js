import { useEffect } from 'react'
import axios from 'axios'
import FeatCard from '../components/FeatCard'
import { useNavigate } from 'react-router-dom'

const Feed = ({ feats, setFeats }) => {
  let navigate = useNavigate

  useEffect(() => {
    const getFeats = async () => {
      const response = await axios.get('/feats')
      setFeats(response.data) // UPDATE
    }
    getFeats()
  }, [])

  const showFeat = (feat) => {
    navigate(`/feats/${feat.id}`)
  }

  return (
    <div className="feat-grid">
      {feats?.map((feat) => (
        <div key={feat.id} onClick={() => showFeat(feat)}>
          <FeatCard feat={feat} />
        </div>
      ))}
    </div>
  )
}

export default Feed
