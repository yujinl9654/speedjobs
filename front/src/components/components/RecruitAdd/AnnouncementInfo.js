import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Order } from '../Styled';
import TagSelector from '../tag/TagSelector';
import TagShower from '../tag/TagShower';

export default function AnnouncementInfo({ onChange, setTags, form, setForm }) {
  // experience 태그
  const experienceTags = [
    { name: '경력무관', sort: -1 },
    { name: '신입', sort: 0 },
    { name: '경력 1년 이상', sort: 1 },
    { name: '경력 2년 이상', sort: 2 },
    { name: '경력 3년 이상', sort: 3 },
    { name: '경력 4년 이상', sort: 4 },
    { name: '경력 5년 이상', sort: 5 },
    { name: '경력 6년 이상', sort: 6 },
    { name: '경력 7년 이상', sort: 7 },
    { name: '경력 8년 이상', sort: 8 },
    { name: '경력 9년 이상', sort: 9 },
    { name: '경력 10년 이상', sort: 10 },
  ];
  const experienceHandler = (sort) => {
    setForm((p) => ({ ...p, experience: sort }));
  };

  // position 태그
  const positionTags = [
    { name: '정규직', sort: 'PERMANENT' },
    { name: '계약직', sort: 'TEMPORARY' },
  ];
  const positionHandler = (sort) => {
    setForm((p) => ({ ...p, position: sort }));
  };

  // 직무 태그
  const [click, setClick] = useState(false);
  const [taglist, setTaglist] = useState([]);
  const tagss = useSelector((state) => state.tag);
  useEffect(() => {
    if (tagss.tagGetData) {
      const temp = Array.from(tagss.tagGetData.tags.POSITION);
      const tempFromRecruit = [...(form.tags?.POSITION ?? []).map((t) => t.id)];
      const tt = temp.map((t) => {
        if (tempFromRecruit.indexOf(t.id) >= 0) return { ...t, selected: true };
        return { ...t, selected: false };
      });
      setTaglist((p) => [...p, ...tt]);
    }
  }, [tagss.tagGetData, form.tags?.POSITION]);
  useEffect(() => {
    if (click) {
      setForm((p) => {
        const ids = taglist
          .filter((t) => t.selected)
          .map((t) => t.id)
          .join(',');
        if (ids === '') {
          // eslint-disable-next-line
          const { tagIds, ...res } = p;
          return { ...res };
        } else {
          return { ...p, tagIds: ids };
        }
      });
      setClick(!click);
    }
  }, [taglist, setForm, click]);

  // thumbnail 입력
  const [src, setSrc] = useState([]);
  const dropHandler = (e) => {
    e.preventDefault();
    for (const f of e.dataTransfer.files) {
      console.log(f);
      const reader = new FileReader();
      reader.onload = function (event) {
        setSrc((p) => [...p, event.target.result]);
      };
      reader.readAsDataURL(f);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div style={{ position: 'relative' }}>
          <Order orderItem={experienceTags} inOrder={experienceHandler} />
          <Order orderItem={positionTags} inOrder={positionHandler} />
          <div
            style={{ display: 'inline-block' }}
            onClick={() => setClick(true)}
          >
            <TagSelector tagList={taglist} setTagList={setTaglist}>
              직무추가
            </TagSelector>
          </div>
        </div>
        <div className={'text-left'}>
          <TagShower tagList={taglist} setTagList={setTaglist} />
        </div>
        <div style={{ height: '30px' }}></div>
        <textarea
          placeholder="공고 정보를 입력해주세요."
          name="content"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginBottom: '10px',
          }}
          value={form?.content}
          onChange={(e) => onChange(e)}
        />

        <div
          style={{
            width: '100%',
            border: '#a1a1a1 1px solid',
            borderRadius: '15px',
            padding: '8px',
            textAlign: 'center',
            fontSize: 'small',
            backgroundColor: '#eee',
          }}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={dropHandler}
        >
          {src.length === 0 && '공고에 필요한 사진을 드래그해주세요.'}
          {src.map((s) => (
            <img
              src={s}
              alt={'hello'}
              style={{ height: '50px', display: 'inline-block' }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
