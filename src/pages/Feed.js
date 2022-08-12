import { useEffect } from 'react'
import axios from 'axios'
import FeatCard from '../components/FeatCard'

const Feed = ({ feats }) => {
  useEffect(() => {
    const getFeats = async () => {
      const response = await axios.get('/api/feats')
      setFeats(response.data) // UPDATE
    }
    getFeats()
  }, [])

  return (
    <div>
      <FeatCard feats={feats} />
    </div>
  )
}

export default Feed
