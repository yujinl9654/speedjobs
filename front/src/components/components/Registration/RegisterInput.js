import React, { useMemo } from 'react';
import styled from 'styled-components';
import { InputText, ProfileTitles, RequiredItems } from '../Styled';

const RegInput = styled.div`
  position: relative;
  margin-bottom: 10px;
  &:after {
    content: '${(props) => props.message}';
    position: absolute;
    bottom: 0;
    left: 10px;
    color: red;
    font-size: 11px;
  }
`;

export default function RegisterInput(props) {
  const caseMsg = useMemo(
    () => ({
      name: '2자 이상 15자 이하의 영어나 한글',
      password: '8자 이상 20자 이하의 영어, 숫자 및 특수문자(_-#$%!.)',
      checkPassword: '비밀번호가 다릅니다.',
      email: '이메일을 입력해주세요.',
      contact: '연락처를 입력해주세요.',
      company: '기업이름을 입력해주세요.',
      homepage: 'http// 또는 http://로 시작해주세요.',
      registrationNumber: '사업자번호를 입력해주세요.',
    }),
    []
  );

  return (
    <>
      <RegInput message={caseMsg[props.name]}>
        <ProfileTitles style={{ fontSize: '15px', marginBottom: '0' }}>
          <RequiredItems>*&nbsp;&nbsp;</RequiredItems>
          {props.id}
        </ProfileTitles>
        <InputText
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          style={{ marginBottom: '15px', height: '25px', paddingBottom: '2px' }}
        />
      </RegInput>
    </>
  );
}
