import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANY_GET_DONE } from '../../../reducers/company';

const Info = styled.div`
  color: #a1a1a1;
  margin-right: 5px;
`;
// 이름 규모 연락처
export default function CompanySummaryInfo(props) {
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    if (company.companyGetData) {
      setData({ ...company.companyGetData });
      dispatch({
        type: COMPANY_GET_DONE,
      });
    }
  }, [company, dispatch]);

  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <Info>회사명 : {data.companyName}</Info>
        <Info>회사 규모 : {data.scale}</Info>
        <Info>회사 홈페이지 : {data.homepage}</Info>
        <Info>사업자 등록번호 : {data.registrationNumber}</Info>
        <Info>담당자 : {data.name}</Info>
        <Info>연락처 : {data.contact}</Info>
        <textarea
          readOnly
          placeholder="회사정보 수정은 마이페이지에서 가능합니다."
          style={{
            width: '100%',
            height: '150px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginTop: '20px',
            outline: 'none',
          }}
        />
      </div>
    </>
  );
}
