import Client from './api'

export const GetFeats = async () => {
  try {
    const response = await Client.get('/feats')
    return response.data
  } catch (e) {
    throw e
  }
}

export const PostFeat = async (data) => {
  try {
    const response = await Client.post('/feats/create', data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteFeat = async (featId) => {
  try {
    const response = await Client.delete(`/feats/${featId}`)
    return response.data
  } catch (e) {
    throw e
  }
}
