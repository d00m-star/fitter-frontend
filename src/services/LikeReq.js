import Client from './api'

export const PostFeatLike = async (data) => {
  try {
    const response = await Client.post('/likes/feat', data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteFeatLike = async (data) => {
  try {
    const response = await Client.delete('/likes/feat', data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const PostCommentLike = async (data) => {
  try {
    const response = await Client.post('/likes/comment', data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteCommentLike = async (data) => {
  try {
    const response = await Client.delete('/likes/comment', data)
    return response.data
  } catch (e) {
    throw e
  }
}
