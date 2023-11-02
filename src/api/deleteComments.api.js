import client from '../config/api.config';

const deleteComments = async (postId, commentId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return await client.delete(`/post/${postId}/comments/${commentId}`, {}, client.BothType(token));
};

const deleteCommentsQuery = (postId, commentId) => ({
  mutationKey: ['delete', 'comments', commentId],
  mutationFn: async () => deleteComments(postId, commentId),
});

export default deleteCommentsQuery;
