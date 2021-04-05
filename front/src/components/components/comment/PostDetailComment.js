import React, { useState } from 'react';
import styled from 'styled-components';
import Comment, { CommentsForm } from './Comment';

const BlogComment = styled.div`
  position: relative;
  overflow: auto;
  padding: 40px 10px 0 0;
`;

const CommentList = styled.div``;

export default function PostDetailComment(props) {
  const dummy = () => {
    const dummyArr = [];

    for (let i = 0; i < 10; i++) {
      dummyArr.push({
        writer: i + '번 작성자',
        content: i + '번 작성자가 적은 댓글입니다.',
        date: '2020-01-01',
      });
    }
    return dummyArr;
  };

  const [dummyComment, setDummyComment] = useState(dummy);

  const mapComment = dummyComment.map((comment) => (
    <Comment
      writer={comment.writer}
      content={comment.content}
      date={comment.date}
    ></Comment>
  ));

  const addComment = (comment) => {
    const newComment = [
      {
        writer: comment.writer,
        content: comment.content,
        date: comment.date,
      },
    ];
    setDummyComment((prev) => newComment.concat(prev));
  };

  return (
    <>
      <BlogComment>
        <CommentsForm onclick={addComment} />
        <CommentList>{mapComment}</CommentList>
      </BlogComment>
    </>
  );
}
