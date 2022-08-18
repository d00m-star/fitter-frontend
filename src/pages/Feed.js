import { useState, useEffect } from 'react'
import { GetFeats } from '../services/FeatReq'
import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Feed = ({
  active,
  addFeatLike,
  deleteUserFeat,
  displayCreateForm,
  displayEditFeat,
  editing,
  emoji,
  featFormValues,
  feats,
  formDisplay,
  handleImage,
  img,
  // likeActive,
  preview,
  removeFeatLike,
  reRender,
  selectedFeat,
  setActive,
  setFeats,
  setFeatFormValues,
  setFormDisplay,
  setImg,
  // setLikeActive,
  setPreview,
  setReRender,
  showFeat,
  submitFeatForm,
  updateFeatFormValues,
  updateText,
  user
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
          handleImage={handleImage}
          img={img}
          preview={preview}
          setPreview={setPreview}
          setImg={setImg}
        />
      </div>
      <div className="feat-grid">
        {feats?.map((feat) => (
          <div className="feat-card-container" key={feat.id}>
            {editing && selectedFeat.id === feat.id ? (
              <FeatForm
                editing={editing}
                emoji={emoji}
                feat={feat}
                featFormValues={featFormValues}
                handleImage={handleImage}
                img={img}
                preview={preview}
                selectedFeat={selectedFeat}
                setFeatFormValues={setFeatFormValues}
                setImg={setImg}
                setPreview={setPreview}
                submitFeatForm={submitFeatForm}
                updateFeatFormValues={updateFeatFormValues}
              />
            ) : (
              <FeatCard
                addFeatLike={addFeatLike}
                feat={feat}
                // likeActive={likeActive}
                removeFeatLike={removeFeatLike}
                reRender={reRender}
                // setLikeActive={setLikeActive}
                setReRender={setReRender}
                showFeat={showFeat}
                user={user}
              />
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
