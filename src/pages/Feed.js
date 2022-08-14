import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetFeats, PostFeat } from '../services/FeatReq'
import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Feed = ({ feats, setFeats }) => {
  let navigate = useNavigate

  const [formDisplay, setFormDisplay] = useState('none')
  const [active, setActive] = useState(false)
  const [featFormValues, setFeatFormValues] = useState({
    type: '',
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })
  const [emoji, setEmoji] = useState('')

  const showFeat = (feat) => {
    navigate(`/feats/${feat.id}`)
  }

  const displayCreateFeat = () => {
    formDisplay === 'none' ? setFormDisplay('flex') : setFormDisplay('none')
    !active ? setActive(true) : setActive(false)
  }

  const updateFeatFormValues = (e) => {
    e.target.id === 'intensity'
      ? setFeatFormValues({
          ...featFormValues,
          [e.target.id]: Number(e.target.value)
        })
      : setFeatFormValues({ ...featFormValues, [e.target.id]: e.target.value })
    switch (featFormValues.intensity) {
      case 0:
        setEmoji('a')
        break
      case 1:
        setEmoji('b')
        break
      case 2:
        setEmoji('c')
        break
      case 3:
        setEmoji('d')
        break
      case 4:
        setEmoji('e')
        break
      case 5:
        setEmoji('f')
        break
      default:
    }
  }

  const submitFeatForm = async (e) => {
    e.preventDefault()
    const data = await PostFeat(featFormValues)
    setFeats(data)
    setFormDisplay('none')
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
      <div style={{ display: `${formDisplay}` }}>
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
