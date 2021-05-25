import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Blank } from '../pages/Community';
import { TagBody } from './Styled';
import { APPLY_LIST_DONE, APPLY_LIST_REQUEST } from '../../reducers/company';
import ResumeItem from './ResumeItem';

const ResumeTitle = styled.h5`
  @media (max-width: 768px) {
    width: 65%;
  }
`;

export const Applicant = styled.div`
  position: absolute;
  right: 180px;
  top: 10px;
  @media (max-width: 768px) {
    right: 20px;
  }

  ${(props) =>
    props.sm &&
    css`
      top: 0;
    `}
`;

export const SubmitDate = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  @media (max-width: 768px) {
    top: 40px;
  }

  ${(props) =>
    props.sm &&
    css`
      top: 0;
      @media (max-width: 768px) {
        visibility: hidden;
      }
    `}
`;

export default function SubmitItem({
  id,
  title,
  date,
  position,
  tags,
  status,
}) {
  const { company } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);
  const [sta, setSta] = useState('');
  useEffect(() => {
    if (status === 'REGULAR') setSta('상시모집');
    else if (status === 'PROCESS') setSta('채용중');
    else if (status === 'END') setSta('채용마감');
    else setSta('채용전');
  }, [status]);

  const onClickHandler = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      dispatch({
        type: APPLY_LIST_REQUEST,
        data: id,
      });
    }
  };
  useEffect(() => {
    if (company.applyListDone && company.applyListId === id) {
      setArr(company.applyListData?.content);
      dispatch({
        type: APPLY_LIST_DONE,
      });
    }
  }, [
    company.applyListData?.content,
    company.applyListDone,
    company.applyListId,
    dispatch,
    id,
  ]);

  const resumeArr = arr.map((resume, index) => (
    <ResumeItem resume={resume} key={index} />
  ));

  const mapTags = tags.POSITION.map((tag, index) => (
    <TagBody grey sm key={index}>
      {tag.name}
    </TagBody>
  ));

  return (
    <>
      <div
        className={'container-fluid text-left'}
        style={{
          position: 'relative',
          padding: '10px',
          width: '95%',
        }}
      >
        <ResumeTitle onClick={() => onClickHandler()}>
          [{sta}] {title}
        </ResumeTitle>
        <Blank />
        {mapTags}
        <Applicant>{position === 'PERMANENT' ? '정규직' : '계약직'}</Applicant>
        <SubmitDate>
          {date[0]}-{date[1]}-{date[2]}
        </SubmitDate>
      </div>
      <div
        style={{
          margin: 'auto',
          paddingTop: '3px',
          paddingBottom: '5px',
          borderBottom: '1px solid #eee',
          width: '95%',
        }}
      >
        {show && resumeArr}
      </div>
    </>
  );
}
