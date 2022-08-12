import Client from './api'

export const getFeats = async () => {
  try {
    const response = await Client.get('/feats')
    localStorage.setItem('token', res.data.token)
    return setFeats(response.data)
  } catch (e) {
    throw e
  }
}
