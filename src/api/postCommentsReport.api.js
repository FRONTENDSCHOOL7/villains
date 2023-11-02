import client from '../config/api.config';

const postCommentsReport = async (id, commentId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return await client.post(`/post/${id}/comments/${commentId}/report`, {}, client.BothType(token));
};

const postCommentsReportQuery = (id, commentId) => ({
  mutationKey: ['post', 'commentsReport', commentId],
  mutationFn: async () => postCommentsReport(id, commentId),
});

export default postCommentsReportQuery;
