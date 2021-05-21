import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';
import DaumAddress from '../../data/DaumAddress';

export default function AnnounceLocation(props) {
  // 도로명주소
  const [addr, setAddr] = useState('');
  //위도, 경도
  const [location, setLocation] = useState([]);

  return (
    <>
      <div style={{ margin: '15px 0' }}>
        <DaumAddress onChange={setAddr} />
        <KakaoMap location={setLocation} address={addr} />
        {/* <div>{location[0] + ' ' + location[1]}</div> */}
      </div>
    </>
  );
}
