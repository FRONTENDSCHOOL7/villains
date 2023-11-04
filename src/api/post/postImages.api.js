import client from '../../config/api.config';

const postImages = async (files) => {
  if (!files || files.length === 0) {
    return '';
  } else if (files.length > 3) {
    alert('3개 이하의 파일을 업로드 하세요.');
    return '';
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('image', files[i]);
  }

  const headers = client.FormType;

  try {
    const response = await client.post('/image/uploadfiles', formData, { ...headers });
    if (response.status !== 200) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    return response.data.map((file) => BASE_URL + file.filename);
  } catch (error) {
    throw error;
  }
};

export default postImages;
