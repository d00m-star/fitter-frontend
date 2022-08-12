import Client from './api'

export const GetFeats = async () => {
  try {
    const response = await Client.get('/feats')
    return response.data
  } catch (e) {
    throw e
  }
}
