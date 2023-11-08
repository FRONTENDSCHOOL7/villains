import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useModal from '../../hooks/useModal';

const logout = () => {
  // useModal 훅 사용
  const { isModalVisible, modalContent, showModal, handleModalConfirm, handleModalCancel } = useModal();
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userAtom);
  handleModalConfirm();
  localStorage.clear();
  setUserInfo(null);
  navigate('/');
};

export default logout;
