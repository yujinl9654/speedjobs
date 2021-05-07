import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import SubmitItem from '../components/SubmitItem';

const ApplicationInfo = styled.div`
  border: 1px #eee solid;
  border-radius: 5px;
  width: 95%;
  height: 60px;
  margin: 0 auto 10px;
  padding: 10px 50px;
  color: #707070;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CountNumber = styled.span`
  font-size: 25px;
  margin-right: 8px;
`;

const ListSetting = styled.div`
  margin-left: 25px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default function SubmitList() {
  const [arr] = useState([
    {
      author: '김건목',
      position: 'frontend 웹개발자',
      skill: [{ name: 'javascript' }, { name: 'vue.js' }],
      date: '2021-05-01',
    },
    {
      author: '박지훈',
      position: 'frontend 웹개발자',
      skill: [{ name: 'react.js' }],
      date: '2021-05-02',
    },
    {
      author: '한보라',
      position: 'backend 서버개발자',
      skill: [{ name: 'java' }],
      date: '2021-05-01',
    },
    {
      author: '최예린',
      position: 'fullstack 개발자',
      skill: [{ name: 'python' }, { name: 'java' }],
      date: '2021-05-03',
    },
    {
      author: '이중복',
      position: 'frontend 웹개발자',
      skill: [{ name: 'javascript' }],
      date: '2021-05-05',
    },
  ]);
  const mapArr = arr.map((i) => (
    <SubmitItem
      author={i.author}
      date={i.date}
      position={i.position}
      skill={i.skill}
    />
  ));

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding title={'지원이력서 목록'}>
        {/* <div style={{ flex: '0 0' }}>*/}
        {/*  <Link to="/resume">*/}
        {/*    <StyledButton wide>???</StyledButton>*/}
        {/*  </Link>*/}
        {/* </div>*/}
      </StyledHeaderDiv>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            {/* 기업회원을 위한 사이드메뉴로 수정 필요 */}
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10 p-0'}>
            <ListSetting>
              <ApplicationInfo>
                <span>
                  <CountNumber>5</CountNumber>
                  <span>채용중 공고</span>
                </span>
                <span>
                  <CountNumber>5</CountNumber>
                  <span>지원자</span>
                </span>
                <span>
                  <CountNumber>10</CountNumber>
                  <span>전체 공고</span>
                </span>
              </ApplicationInfo>
              {mapArr}
            </ListSetting>
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
