import Client from './api'
import { useParams } from 'react-router-dom'

export const PostComment = async (featId, data) => {
  try {
    const featId = useParams()
    const response = await Client.post(`/feats/${featId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}

export const DeleteComment = async (commentId) => {
  const commentId = useParams()
  const willDelete = window.confirm('Are you sure?')
  if (!willDelete) {
    return
  }
  await Client.delete(`/comments/${commentId}`)
}

export const UpdateComment = async (featId, data) => {
  try {
    const featId = useParams()
    const response = await Client.put(`/feats/${featId}`, data)
    return response.data
  } catch (e) {
    throw e
  }
}
