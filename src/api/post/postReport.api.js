import client from '../../config/api.config';

const postReport = async (id, token) => {
  return await client.post(`/post/${id}/report`, {}, client.BothType(token));
};

const postReportQuery = (id, token) => ({
  mutationKey: ['post', 'report', id],
  mutationFn: async () => postReport(id, token),
});

export default postReportQuery;
