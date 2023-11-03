import client from '../config/api.config';

const deletePost = async (id, token) => {
  return await client.delete(`/post/${id}`, {}, client.BothType(token));
};

const deletePostQuery = (id,token) => ({
  mutationKey: ['delete', 'post', id],
  mutationFn: async () => deletePost(id,token),
});

export default deletePostQuery;
