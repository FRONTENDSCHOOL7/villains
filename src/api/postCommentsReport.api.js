import client from '../config/api.config';

const postCommentsReport = async (postId, commentId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return await client.post(`/post/${postId}/comments/${commentId}/report`, {}, client.BothType(token));
};

const postCommentsReportQuery = (postId, commentId) => ({
  mutationKey: ['post', 'commentsReport', commentId],
  mutationFn: async () => postCommentsReport(postId, commentId),
});

export default postCommentsReportQuery;
