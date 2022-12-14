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
  featFormValues,
  feats,
  formDisplay,
  formEmoji,
  handleImage,
  img,
  preview,
  removeFeatLike,
  reRender,
  selectedFeat,
  setActive,
  setFeats,
  setFeatFormValues,
  setFormDisplay,
  setImg,
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
          displayCreateForm={displayCreateForm}
          displayEditFeat={displayEditFeat}
          featFormValues={featFormValues}
          formEmoji={formEmoji}
          updateFeatFormValues={updateFeatFormValues}
          submitFeatForm={submitFeatForm}
          selectedFeat={selectedFeat}
          handleImage={handleImage}
          preview={preview}
          setPreview={setPreview}
        />
      </div>
      <div className="feat-grid">
        {feats?.map((feat) => (
          <div className="feat-card-container" id={feat.value} key={feat.id}>
            {editing && selectedFeat.id === feat.id ? (
              <FeatForm
                displayEditFeat={displayEditFeat}
                editing={editing}
                feat={feat}
                featFormValues={featFormValues}
                formEmoji={formEmoji}
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
                formEmoji={formEmoji}
                removeFeatLike={removeFeatLike}
                reRender={reRender}
                setReRender={setReRender}
                showFeat={showFeat}
                user={user}
              />
            )}
            <div className="feat-btn-container">
              {user && user.id === feat.userId ? (
                <button
                  onClick={() => displayEditFeat(feat)}
                  className="btn feat-edit-btn"
                >
                  {updateText}
                </button>
              ) : null}
              {user && user.id === feat.userId ? (
                <button
                  onClick={() => deleteUserFeat(feat.id)}
                  className="btn feat-delete-btn"
                >
                  X
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
