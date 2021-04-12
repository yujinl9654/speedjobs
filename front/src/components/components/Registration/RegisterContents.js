import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RegisterInput from './RegisterInput';
import { StyledButton } from '../Styled';
import { COMPANY_ADD_REQUEST } from '../../../reducers/company';

export default function RegisterContents(props) {
  const dispatch = useDispatch();

  // 회원가입시 회사정보state와 유저state 합쳐야 함.
  // 회원가입 요청시 request value에 회사 정보도 들어가 있는지 확인 필요
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    contact: '',
    companyName: '',
    homepage: '',
    registrationNumber: '',
    role: 'ROLE_COMPANY',
  });
  const [company, setCompany] = useState({
    companyName: '',
    homepage: '',
    registrationNumber: '',
  });

  const userChange = useCallback((e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  });
  const companyChange = useCallback((e) => {
    setCompany((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  });

  const submitHandler = useCallback((e) => {
    e.preventDefault();
    console.log('user= ', user);
    console.log('company= ', company);
    dispatch({
      type: COMPANY_ADD_REQUEST,
      userData: user,
      companyData: company,
    });
  });

  useEffect(() => {
    if (user.contact.length < 13) {
      const phone = user.contact.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setUser((prev) => {
        return {
          ...prev,
          contact: phone,
        };
      });
    }
  }, [user.contact]);

  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: '15px' }}>기업 회원가입</h3>
        <RegisterInput
          name="email"
          id="회사 이메일"
          type="text"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="password"
          id="비밀번호"
          type="password"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="checkPassword"
          id="비밀번호 확인"
          type="password"
        />
        <h5 style={{ marginTop: '20px' }}>기업 정보</h5>
        <RegisterInput
          name="companyName"
          id="기업명"
          type="text"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="homepage"
          id="기업 홈페이지"
          type="text"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="registrationNumber"
          id="사업자 등록번호"
          type="text"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="name"
          id="담당자 이름"
          type="text"
          onChange={(e) => userChange(e)}
        />
        <RegisterInput
          name="contact"
          id="담당자 연락처"
          type="text"
          value={user.contact}
          onChange={(e) => userChange(e)}
        />
        <div>
          <StyledButton
            style={{ width: '100%', margin: '15px 0 30px 0' }}
            onClick={(e) => submitHandler(e)}
          >
            회원가입
          </StyledButton>
        </div>
      </div>
    </>
  );
}
