import { ChatSquareQuote, Heart, HeartFill } from 'react-bootstrap-icons';
import { EyeShow } from '@styled-icons/fluentui-system-filled/EyeShow';
import { useHistory } from 'react-router';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { TagBody } from './Styled';
import { Blank } from '../pages/Community';

const PostTitle = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 25px;
  font-weight: lighter;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  white-space: nowrap;
`;

export default function Post({
  title,
  tags,
  writer,
  commentCount,
  viewCount,
  favoriteCount,
  date,
  fav,
  id,
  type,
}) {
  const history = useHistory();
  // 태그 맵
  const mapTags = tags.map((tag) => (
    <TagBody grey sm key={tag.id}>
      {tag.name}
    </TagBody>
  ));

  const onClickHandler = useCallback(() => {
    history.push({
      pathname: `/${
        type === 'community' ? 'community/post' : 'recruit/detail'
      }/${id}`,
      state: {
        writer,
        tags,
        date,
        fav,
      },
    });
  }, [date, fav, history, id, tags, type, writer]);

  return (
    <>
      <div
        className={'container-fluid text-left'}
        style={{
          borderBottom: '1px solid #eee',
          position: 'relative',
          padding: '10px',
        }}
      >
        <PostTitle onClick={onClickHandler}>{title}</PostTitle>
        <Blank />
        {mapTags}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '15px',
            textAlign: 'end',
          }}
        >
          <div>{writer}</div>
          <div style={{ marginBottom: '20px' }}>{date}</div>
          <div style={{ display: 'inline-block' }}>
            <ChatSquareQuote style={{ width: '25px' }} /> {commentCount}
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <EyeShow style={{ width: '25px' }} /> {viewCount}
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            {fav ? <HeartFill /> : <Heart />} {favoriteCount}
          </div>
        </div>
      </div>
    </>
  );
}
