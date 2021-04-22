import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { HeartFill, ShareFill } from 'react-bootstrap-icons';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLike,
  TagBody,
} from '../components/Styled';
import PostDetailComment from '../components/comment/PostDetailComment';
import {
  POST_GET_DONE,
  POST_GET_REQUEST,
  POST_LIST_DONE,
  POST_LIST_REQUEST,
} from '../../reducers/post';

const PostTextarea = styled.textarea`
  margin-top: 25px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  overflow-y: hidden;
`;

export default function PostDetail(props) {
  const history = useHistory();
  const { id } = useParams();
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [data, setData] = useState({ createdDate: [] });
  const [list, setList] = useState([]);
  useEffect(() => {
    dispatch({
      type: POST_GET_REQUEST,
      data: id,
    });
    dispatch({
      type: POST_LIST_REQUEST,
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (post.postGetDone) {
      setData((prev) => ({ ...post.post }));
      dispatch({
        type: POST_GET_DONE,
      });
    }
    if (post.postListDone) {
      setList([...post.postList.content]);

      dispatch({
        type: POST_LIST_DONE,
      });
    }
  }, [post, data, id, list, dispatch]);

  // 게시글 작성자, 작성일자 불러오기
  useEffect(() => {
    if (list !== null) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id.toString() === id) {
          setData((prev) => ({
            ...prev,
            author: list[i].author,
            createdDate: list[i].createdDate,
          }));
        }
      }
    }
  }, [list, data.author, data.createdDate, id]);

  return (
    <>
      <div
        className="container text-left"
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* 헤더*/}
        <StyledHeaderDiv>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-8 col-6 p-0'} style={{ marginTop: '14px' }}>
              <h5 style={{ paddingLeft: '15px' }}>{data.title}</h5>
            </div>
            <div
              className={'col-md-4 col-6 text-right'}
              style={{ paddingRight: 0 }}
            >
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={() => history.goBack()}
              >
                목록
              </StyledButton>
              <StyledButton white>찜하기</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <div style={{ margin: '10px 0 20px 0' }}>
            {data.author}{' '}
            {data.createdDate &&
              `${data.createdDate[0]}-${data.createdDate[1]}-${data.createdDate[2]}`}
          </div>
          {/* 태그*/}
          <div>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
          </div>
          {/* 본문*/}
          <div>
            <autoheight-textarea>
              <PostTextarea value={data.content} />
            </autoheight-textarea>
          </div>
        </div>
        {/* 찜 공유*/}
        <StyledLike>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span>
              <HeartFill></HeartFill>
            </span>
          </div>
          <div style={{ width: '100%', textAlign: 'center', fontSize: '10px' }}>
            99+
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span>
              <ShareFill></ShareFill>
            </span>
          </div>
        </StyledLike>
        <PostDetailComment id={id} />
      </div>
    </>
  );
}
