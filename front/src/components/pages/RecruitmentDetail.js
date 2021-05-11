import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { StyledButton, StyledHeaderDiv } from '../components/Styled';
import ChatIcon from '../components/Chatting/ChatIcon';
import ChatBox from '../components/Chatting/ChatBox';
import { RECRUIT_GET_REQUEST } from '../../reducers/recruit';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../../reducers/like';
import KakaoMap from '../data/KakaoMap';
import {
  RESUME_APPLY_DONE,
  RESUME_APPLY_REQUEST,
  RESUME_LIST_DONE,
  RESUME_LIST_REQUEST,
} from '../../reducers/resume';

const Chatting = styled.div`
  width: 100%;
  height: 650px;
  @media (max-width: 992px) {
    height: 0;
  }
`;

const Choice = styled.div`
  border-radius: 5px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  background-color: white;
  width: 35%;
  height: inherit;
  z-index: 20;
  padding: 18px 25px;
  text-align: left;
  border: 1px solid #eee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const ResumeInfo = styled.div`
  font-size: 12px;
  font-weight: lighter;
  color: #747474;
`;
const Resume = styled.div`
  //padding: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: #eee;
  }
`;

export default function RecruitmentDetail(props) {
  const { id } = useParams();
  const [pop, setPop] = useState('none');
  const [content, setContent] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [choice, setChoice] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [apply, setApply] = useState({ recruitId: id, resumeId: '' });
  const dispatch = useDispatch();
  const { recruit, resume } = useSelector((state) => state);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const { user, like } = useSelector((state) => state);
  const ButtonEvent = () => {
    if (pop === 'none') {
      setPop('inline-block');
    } else {
      setPop('none');
    }
  };
  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      dispatch({
        type: RECRUIT_GET_REQUEST,
        data: id,
      });
    }
  }, [dispatch, id, user.me, refresh]);
  useEffect(() => {
    if (recruit.recruitGetDone) {
      setContent(recruit.recruit);
      setIsFav(recruit.recruit.favorite);
    }
  }, [recruit.recruitGetDone, recruit.recruit]);
  useEffect(() => {
    if (pop === 'none') {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pop]);

  useEffect(() => {
    if (like.data === null) return;
    if (!like.addLikeDone && !like.unLikeDone) return;
    if (like.data.id !== id) return;
    if (like.addLikeDone) {
      setIsFav(true);
    } else if (like.unLikeDone) {
      setIsFav(false);
    }
    dispatch({
      type: ADD_LIKE_DONE,
    });
  }, [like.addLikeDone, like.unLikeDone, like.data, dispatch, id]);

  const favClick = useCallback(
    (e) => {
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  const unFavClick = useCallback(
    (e) => {
      dispatch({
        type: UN_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  // 이력서 지원하기
  const submitHandler = () => {
    if (choice) {
      dispatch({
        type: RESUME_APPLY_REQUEST,
        data: apply,
      });
    }
  };
  useEffect(() => {
    if (resume.resumeListDone) {
      setResumeList([...resume.resumeList.content]);
      dispatch({
        type: RESUME_LIST_DONE,
      });
    } else if (resume.resumeApplyDone) {
      setChoice(false);
      alert('지원이 완료되었습니다.');
      dispatch({
        type: RESUME_APPLY_DONE,
      });
    }
  }, [dispatch, resume.resumeApplyDone, resume.resumeListDone]);
  const resumeArr = resumeList.map((item) => (
    <Resume onClick={() => setApply((p) => ({ ...p, resumeId: item.id }))}>
      <div>{item.title}</div>
      <ResumeInfo>
        <div>{item.name}</div>
        <div>{item.contact}</div>
      </ResumeInfo>
    </Resume>
  ));

  return (
    <>
      <div
        className={'container'}
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* 제목 지원 찜하기 */}
        <StyledHeaderDiv title={content.title ?? '.....'}>
          {choice && (
            <Choice>
              <div>이력서 선택</div>
              <div style={{ marginTop: '10px' }}>{resumeArr}</div>
              <div style={{ textAlign: 'right' }}>
                <StyledButton onClick={() => submitHandler()}>
                  이력서 지원
                </StyledButton>
                <StyledButton grey onClick={() => setChoice(false)}>
                  취소
                </StyledButton>
              </div>
            </Choice>
          )}
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              onClick={() => {
                setChoice(true);
                dispatch({
                  type: RESUME_LIST_REQUEST,
                });
              }}
            >
              지원하기
            </StyledButton>
          </div>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              white={!isFav}
              grey={isFav}
              onClick={(e) => {
                if (isFav) unFavClick(e);
                else favClick(e);
              }}
            >
              찜하기
            </StyledButton>
          </div>
        </StyledHeaderDiv>

        {/* 제목 end*/}
        {/* 본문*/}
        <div className={'row container m-0 p-0'}>
          <div className={'col-12 col-lg-7'}>
            {/* 요약정보*/}
            <div
              className={'container'}
              style={{
                display: 'block',
                borderBottom: '1px solid #eee',
              }}
            >
              <p>요약</p>
              <p>직무 : 백엔드 프론트엔드</p>
              <p>고용형태 : 정규직</p>
              <p>경력 : 경력무관</p>
              <p>회사규모 : {content.scale}명</p>
              <p>주요서비스 : 앱개발</p>
              <p>채용기간 : 상시채용</p>
            </div>
            {/* 업무소개*/}
            <div
              style={{ whiteSpace: 'pre-line', padding: '14px' }}
              className={'container'}
            >
              {content.content ?? '....'}
            </div>
          </div>
          {/* 요약 end*/}
          {/* 채팅컴포넌트*/}
          <ChatIcon />
          <div
            className={'col-lg-5 col-12'}
            style={{ padding: '15px 5px 0px' }}
          >
            <Chatting>
              <ChatBox recruitId={id} pop={pop} button={ButtonEvent} />
              <ChatIcon onclick={ButtonEvent} />
            </Chatting>
            <KakaoMap></KakaoMap>
          </div>
        </div>
        {/* <StyledButton hcenter wide>*/}
        {/*  지원*/}
        {/* </StyledButton>*/}
        {/* 본문end*/}
      </div>
    </>
  );
}
