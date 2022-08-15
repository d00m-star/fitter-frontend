import Client from './api'

export const PostComment = async (featId, data) => {
  try {
    const response = await Client.post(`/feats/${featId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteComment = async (featId) => {
  const willDelete = window.confirm('Are you sure?')
  if (!willDelete) {
    return
  }
  await Client.delete(`/comments/${comment.id}`)
}

export const UpdateComment = async (featId, data) => {
  try {
    const response = await Client.put(`/feats/${featId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}
