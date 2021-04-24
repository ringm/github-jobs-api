import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ResultContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};
  height: 228px;
  border-radius: 6px;
  padding: 0 25px;
  transition: background-color .3s;

  .result__data-container {
    height: 221px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    transform: ${props => props.img ? 'translateY(-25px)' : 'translateY(0)'};
  }

  .company-logo-card {
    display: ${props => props.img ? 'inline-block' : 'none'};
    background-color: #fff;
    width: 50px;
    height: 50px;
    margin-bottom: 25px;
    border-radius: 14px;
    object-fit: contain;
    padding: 10px;
  }

  .tagline-container {
    display: flex;
    align-items: baseline;
    color: #6E8098;
    margin-bottom: 14px;
  }

  .dot {
    background-color: #6E8098;
    border-radius: 50px;
    width: 4px;
    height: 4px;
    margin: 0 16px;
  }

  a {
    text-decoration: none;
  }

  & h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};;
    margin-bottom: 16px;
    transition: color .3s;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 50px;
  }

  .company-name {
    color: #6E8098;
    line-height: 20px;
    margin-bottom: ${props => props.img ? 'auto' : '0'};
  }

  .tags {
    font-weight: 700;
    font-size: 14px;
    color: #5964E0;
  }

  .apply {
    width: 100%;
    background-color: #5964E0;
    color: #fff;
    outline: none;
    border: none;
    padding: 16px 0;
    margin: 32px 0;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Kumbh Sans';
  }
`
export default function Result(props) {

  const { theme, job, handleSelectedJob } = props;

  let url = '/job-details/';
  url += job.id;

  function handleClick() {
    handleSelectedJob(job.id);
  }

  function formatTime(time) {
    const today = new Date();
    const jobDate = new Date(time);
    const diff = today.getTime() - jobDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if(days === 0 && hours === 0) return `${minutes} min ago`
    if(days === 0) return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
}

  return (
    <ResultContainer theme={theme} img={job.company_logo}>
      <div className="result__data-container">
        <img className="company-logo-card" src={job.company_logo} alt="company-logo"/>
        <div className="tagline-container">
          <p className="time">{formatTime(job.created_at)}</p>
          <span className="dot"></span>
          <p className="job-type">{job.type}</p>
        </div>
        <Link 
          to={url}
          onClick={handleClick}>
          <h2>{job.title}</h2>
        </Link>
        <p className="company-name">{job.company}</p>
        <p className="tags">{job.location}</p>
      </div>
    </ResultContainer>
  )
}
