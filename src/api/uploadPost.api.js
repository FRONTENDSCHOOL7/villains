import client from '../config/api.config';

const uploadPost = async (content, imageUrls, location) => {
  const postData = {
    post: {
      content: JSON.stringify({
        postId: 'villains',
        contents: content,
        location: {
          latitude: location ? location.latitude : 33,
          longitude: location ? location.longitude : 130,
        },
      }),
      // 이미지 URL들을 ','로 구분하여 문자열로 변환
      image: imageUrls,
    },
  };

  // const token = localStorage.getItem('user').token;
  const token = import.meta.env.VITE_ADMIN_KEY;
  const headers = client.BothType(token);

  try {
    const response = await client.post('/post', postData, { ...headers });

    // response.data가 있을 경우 true를 반환합니다.
    if (response.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default uploadPost;
