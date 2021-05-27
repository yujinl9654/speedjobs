import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Applicant, SubmitDate } from './SubmitItem';

export default function ResumeItem({ resume }) {
  const history = useHistory();
  const [id, setId] = useState();
  useEffect(() => {
    if (resume.resumeId === undefined) setId(resume.id);
    else {
      setId(resume.resumeId);
    }
  }, []);

  return (
    <div
      className={'container-fluid text-left'}
      style={{
        position: 'relative',
        padding: '3px 10px',
        width: '95%',
      }}
    >
      <h6
        style={{ margin: '0' }}
        onClick={() => history.push(`../resume/${id}`)}
      >
        {resume.title}
      </h6>
      <Applicant sm>{resume.email}</Applicant>
      <SubmitDate sm>{resume.name}</SubmitDate>
    </div>
  );
}
