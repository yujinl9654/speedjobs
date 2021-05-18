import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import Banner from '../components/banner/Banner';
import { Order, SearchBox, TagBody } from '../components/Styled';
import {
  RECRUIT_LIST_DONE,
  RECRUIT_LIST_REQUEST,
} from '../../reducers/recruit';
import Post from '../components/Post';
import { COMPANY_GET_REQUEST } from '../../reducers/company';
import TagSelector from '../components/tag/TagSelector';
import TagShower from '../components/tag/TagShower';

export default function Recruitment() {
  const [form, setForm] = useState({
    size: 10,
    page: 0,
  });
  const recruitOrder = [
    { name: '조회순', sort: 'viewCount' },
    { name: '추천순', sort: 'favoriteCount' },
  ];
  const initialList = [
    { name: '제 목', state: false, target: 'title' },
    { name: '내 용', state: false, target: 'content' },
    { name: '제목+내용', state: false, target: '' },
    { name: '작성자', state: false, target: 'companyName' },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useRef(0);
  const prevY = useRef(99999);
  const isLast = useRef(false);
  const targetRef = useRef();
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const observe = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y && !isLast.current) {
          loadMore();
        }
        prevY.current = y;
      },
      { threshold: 1 }
    )
  );

  const loadMore = () => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: {
        size: 10,
        page: page.current,
      },
    });
    paging.current = true;
  };

  const rootRef = useRef();
  const { user, recruit } = useSelector((state) => state);
  const me = useState({ ...user.me });
  const paging = useRef(false);
  const [, setLoading] = useState(false);
  const [recruitList, setRecruitList] = useState([]);
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tt = temp.map((t) => {
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData]);

  useEffect(() => {
    const currentObserver = observe.current;
    const divElm = targetRef.current;
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      if (divElm) {
        currentObserver.observe(divElm);
      }
    }
    return () => {
      if (divElm) {
        currentObserver.unobserve(divElm);
      }
    };
  }, [user.me, refresh]);

  useEffect(() => {
    if (recruit.recruitListLoading) {
      setLoading((prev) => true);
    }
    if (recruit.recruitListDone) {
      setLoading((prev) => false);
      if (paging.current)
        setRecruitList((prev) => [...prev, ...recruit.recruitList.content]);
      else setRecruitList([...recruit.recruitList.content]);
      if (recruit.recruitList.last) {
        isLast.current = true;
      } else {
        page.current++;
      }
      dispatch({ type: RECRUIT_LIST_DONE });
    }
  }, [recruit, setRecruitList, setLoading, page, dispatch]);

  useEffect(() => {
    setForm((p) => {
      const ids = taglist
        .filter((t) => t.selected)
        .map((t) => t.id)
        .join(',');
      if (ids === '') {
        const { tagIds, ...res } = p;
        return { ...res };
      } else {
        return { ...p, tagIds: ids };
      }
    });
  }, [taglist, dispatch]);

  const mapRecruit = recruitList.map((pl) => (
    <Post
      id={pl.id}
      tags={[...(pl.tags.POSITION ?? [])]}
      type={'recruit'}
      title={pl.title}
      writer={pl.companyName}
      date={`${pl.openDate[0]}/${pl.openDate[1]}/${pl.openDate[2]}`}
      fav={pl.favorite}
      key={pl.id}
      viewCount={pl.viewCount}
      favoriteCount={pl.favoriteCount}
    />
  ));

  // 게시물 검색하기
  const OrderHandler = (sort) => {
    setForm({ ...form, order: sort });
  };
  useEffect(() => {
    if (form?.order !== undefined) {
      dispatch({
        type: RECRUIT_LIST_REQUEST,
        data: form,
      });
    }
    paging.current = false;
  }, [dispatch, form]);
  const InputHandler = (e, i) => {
    setForm((p) => ({
      size: p.size,
      page: p.page,
      [i.target]: e.target.value,
    }));
  };
  const SearchHandler = () => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: form,
    });
    paging.current = false;
  };
  const EnterHandler = (e) => {
    if (e.key === 'Enter') SearchHandler();
  };

  return (
    <>
      <Banner />
      <div className="container">
        <div className={'row justify-content-center'}>
          <div ref={rootRef} className={'container'}>
            <div
              className={'text-right'}
              style={{
                position: 'relative',
                height: '60px',
              }}
            >
              <div
                className={'row justify-content-between'}
                style={{
                  padding: '10px',
                  paddingTop: '0',
                }}
              >
                <div>
                  <div
                    style={{ display: 'inline-block', verticalAlign: 'top' }}
                  >
                    <Order inOrder={OrderHandler} orderItem={recruitOrder} />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <TagSelector tagList={taglist} setTagList={setTaglist}>
                      필터
                    </TagSelector>
                  </div>
                </div>
                <div>
                  <SearchBox
                    onInput={InputHandler}
                    onClick={SearchHandler}
                    onKeyPress={EnterHandler}
                    setForm={setForm}
                    initial={initialList}
                  />
                  {me[0].role === 'ROLE_COMPANY' ? (
                    <TagBody
                      style={{ marginTop: '0', border: '1px solid #f5df4d' }}
                      onClick={() => {
                        history.push('./recruitment/add');
                        dispatch({
                          type: COMPANY_GET_REQUEST,
                          data: user.me,
                        });
                      }}
                    >
                      글쓰기
                    </TagBody>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className={'text-left'}>
              <TagShower tagList={taglist} setTagList={setTaglist}></TagShower>
            </div>
            <div style={{ height: '30px' }}></div>
            {mapRecruit}
          </div>
        </div>
        <div
          style={{ top: '50px', position: 'relative', marginBottom: '100px' }}
          ref={targetRef}
        />
      </div>
    </>
  );
}
