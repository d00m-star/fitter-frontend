import Client from './api'

export const PostComment = async (featId, data) => {
  try {
    const response = await Client.post(`/feats/${featId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteComment = async (commentId) => {
  try {
    await Client.delete(`/comments/${commentId}`)
  } catch (e) {
    throw e
  }
}
export const UpdateComment = async (commentId, data) => {
  try {
    const response = await Client.put(`/comments/${commentId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}
