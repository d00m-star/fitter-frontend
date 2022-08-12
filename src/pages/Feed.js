import { useEffect } from 'react'
import axios from 'axios'
import FeatCard from '../components/FeatCard'

const Feed = ({ feats, setFeats }) => {
  useEffect(() => {
    const getFeats = async () => {
      const response = await axios.get('/feats')
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
