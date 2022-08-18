import Client from './api'

export const PostFeatLike = async (userId, featId) => {
  try {
    const response = await Client.post(`/likes/feat/${userId}/${featId}`)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteFeatLike = async (userId, featId) => {
  try {
    console.log(userId, featId)
    const response = await Client.delete(`/likes/feat/${userId}/${featId}`)
    return response.data
  } catch (e) {
    throw e
  }
}

export const PostCommentLike = async (userId, commentId) => {
  try {
    const response = await Client.post(`/likes/comment/${userId}/${commentId}`)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteCommentLike = async (userId, commentId) => {
  try {
    const response = await Client.delete(
      `/likes/comment/${userId}/${commentId}`
    )
    return response.data
  } catch (e) {
    throw e
  }
}
