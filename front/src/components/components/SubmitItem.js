import React from 'react';
import styled from 'styled-components';
import { Blank } from '../pages/Community';
import { TagBody } from './Styled';

const Applicant = styled.div`
  position: absolute;
  right: 180px;
  top: 15px;
  @media (max-width: 768px) {
    right: 20px;
  }
`;

const SubmitDate = styled.div`
  position: absolute;
  right: 20px;
  top: 15px;
  @media (max-width: 768px) {
    top: 40px;
  }
`;

export default function SubmitItem({ author, date, position, skill }) {
  const mapTags = skill.map((tag) => (
    <TagBody grey sm>
      {tag.name}
    </TagBody>
  ));

  return (
    <>
      <div
        className={'container-fluid text-left'}
        style={{
          borderBottom: '1px solid #eee',
          position: 'relative',
          padding: '10px',
          width: '95%',
        }}
      >
        <h5>{position}</h5>
        <Blank />
        {mapTags}
        <Applicant>
          <div>{author}</div>
        </Applicant>
        <SubmitDate>
          <div style={{ marginBottom: '5px' }}>{date}</div>
        </SubmitDate>
      </div>
    </>
  );
}
