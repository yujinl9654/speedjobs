import React from 'react';
import AnnounceCard from './home/AnnounceCard';
import Banner from '../components/banner/Banner';
import TitleCardsSm from './home/TitleCardsSm';

export default function Home(props) {
  return (
    <>
      <Banner></Banner>
      <div className="container">
        {/* 타이틀*/}
        <TitleCardsSm></TitleCardsSm>

        {/* 공고*/}
        <AnnounceCard></AnnounceCard>
      </div>
    </>
  );
}
