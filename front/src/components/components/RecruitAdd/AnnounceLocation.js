import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';
import DaumAddress from '../../data/DaumAddress';

export default function AnnounceLocation(props) {
  const [addr, setAddr] = useState('');
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
