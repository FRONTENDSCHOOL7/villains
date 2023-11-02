import client from '../config/api.config';

const deleteComments = async (id, commentId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return await client.delete(`/post/${id}/comments/${commentId}`, {}, client.BothType(token));
};

const deleteCommentsQuery = (id, commentId) => ({
  mutationKey: ['delete', 'comments', commentId],
  mutationFn: async () => deleteComments(id, commentId),
});

export default deleteCommentsQuery;
