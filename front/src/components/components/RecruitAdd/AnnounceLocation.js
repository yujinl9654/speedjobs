import styled from 'styled-components';
import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';
import DaumAddress from '../../data/DaumAddress';

const InputAddress = styled.input`
  margin: 0 0 10px 0;
  width: 50%;
  border: none;
  border-bottom: 1px solid #a1a1a1;

  &:focus {
    outline: none;
  }
`;

export default function AnnounceLocation(props) {
  const [address, setAddress] = useState('');
  // 앞에 로케이션은 정보를 빼낼때 사용
  const [, setLocation] = useState([]);
  return (
    <>
      <div style={{ margin: '15px 0' }}>
        <DaumAddress onChange={setAddress} />
        <KakaoMap location={setLocation} address={address}></KakaoMap>
        {/* <div>{location[0] + ' ' + location[1]}</div> */}
      </div>
    </>
  );
}
