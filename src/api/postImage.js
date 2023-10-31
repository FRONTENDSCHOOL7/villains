import client from '../config/api.config';

const postImage = async (file) => {
  if (!file || file.length === 0) {
    return '';
  } else if (file.size > 10 * 1024 * 1024) {
    alert('이미지 사이즈는 10MB 이내로 가능합니다.');
    return '';
  }

  const formData = new FormData();
  formData.append('image', file);

  const headers = client.FormType;

  try {
    const response = await client.post('/image/uploadfile', formData, { ...headers });
    if (response.status !== 200) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    return BASE_URL + response.data.filename
  } catch (error) {
    throw error;
  }
};

export default postImage;
