import styled from 'styled-components';
import PageTemplate from '../../components/PageTemplate';
import Message from '../../components/chat/Message';
import ChatInputField from '../../components/chat/ChatInputField';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import getComments from '../../api/get/getComments.api';
import postComments from '../../api/post/postComments.api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import deletePostQuery from '../../api/delete/deletePost.api';
import { useMutation } from '@tanstack/react-query';
import userAtom from '../../atoms/userAtom';
import Modal from '../../components/Modal';
import pageUrlConfig from '../../config/pageUrlConfig';

const usePostActions = (id, token, navigate) => {
  const deleteMutation = useMutation(deletePostQuery(id, token));

  const postDelete = () => {
    deleteMutation.mutate(
      { id, token },
      {
        onSuccess: () => navigate(pageUrlConfig.chatPage),
        onError: () => alert('게시글 삭제에 실패했습니다.'),
      },
    );
  };

  return { postDelete };
};

const ChatDetailPage = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const { fetchComments } = getComments();
  const { uploadComment } = postComments();
  const [bottomSheetTogle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);
  const [buttonOptions, setButtonOptions] = useRecoilState(bottomSheetOptions);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    content: '',
    confirmText: '',
    cancelText: '',
    onConfirm: '',
    onCancel: '',
  });
  const { postDelete } = usePostActions(id, user.token, navigate);

  useEffect(() => {
    setButtonOptions([
      {
        label: '삭제',
        callback: () => {
          setShowModal(true);
          setBottomSheetToggle(false);
          setModalContent({
            content: '채팅방을 삭제할까요?',
            confirmText: '삭제',
            cancelText: '취소',
            onConfirm: () => postDelete(),
            onCancel: () => setShowModal(false),
          });
        },
      },
    ]);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const result = await fetchComments(id);
    if (result) {
      setMessages(result.reverse());
    }
  };

  const handleSendChat = async (text) => {
    const result = await uploadComment(id, text);
    console.log(result);
    if (result) {
      fetchData();
    }
  };

  return (
    <PageTemplate>
      {showModal && (
        <Modal
          content={modalContent.content}
          confirmText={modalContent.confirmText}
          cancelText={modalContent.cancelText}
          onConfirm={modalContent.onConfirm}
          onCancel={modalContent.onCancel}
        ></Modal>
      )}
      <ChatContainer>
        <MessageList>
          {messages.map((message) => (
            <Message key={message.id} data={message} />
          ))}
        </MessageList>
        <ChatInputField onClick={handleSendChat} />
      </ChatContainer>
    </PageTemplate>
  );
};

export default ChatDetailPage;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(100vh - 48px);
`;

const MessageList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 16px 68px 16px;
  background: #f2f2f2; // 채팅창 배경색
`;
