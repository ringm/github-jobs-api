import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledJobDetails = styled.div`
  transform: translateY(25px);
  min-height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const JobDetailsHeader = styled.div`
  width: min(730px, 90%);
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: background-color .3s;
  margin-top: ${props => props.img ? '25px' : '0'};

  .header__data-container {
    transform: ${props => props.img ? 'translateY(-25px)' : 'translateY(0)'};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 768px) {
    .header__data-container {
      width: 100%;
      transform: translateY(0);
      flex-direction: row;
    }
  }

  .company__logo {
    display: ${props => props.img ? 'inline-block' : 'none'};
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background-color: ${props => props.logoBg};
    padding: 10px;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    .company__logo {
      width: 140px;
      height: 140px;
      border-radius: 0;
      margin-right: 40px;
    }
  }

  .header_title-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 768px) {
    .header_title-container {
      align-items: flex-start;
      margin-right: auto;
      margin-left: ${props => props.img ? '0' : '40px'};
    }
  }

  .header__title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    transition: color .3s;
  }

  @media (min-width: 768px) {
    .header__title {
      text-align: left;
    }
  }

  .header__website {
    font-size: 16px;
    color: #6E8098;
    margin-top: 15px;
    margin-bottom: 25px;
    text-decoration: none;
  }

  .header__website-url {
    border: none;
    display: block;
    text-decoration: none;
    color: ${props => props.theme === 'light' ? '#5964E0' : '#fff'} ;
    font-size: 16px;
    font-weight: 700;
    background-color: ${props => props.theme === 'light' ? 'rgba(89, 100, 224, 0.1)' : 'rgba(201, 201, 201, 0.1)'};
    padding: 15px 20px;
    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;
    margin-bottom: ${props => props.img ? '0' : '25px'};
  }

  .header__website-url:hover {
    background-color: ${props => props.theme === 'light' ? 'rgba(89, 100, 224, 0.35)' : 'rgba(201, 201, 201, 0.35)'};
  }

  @media (min-width: 768px) {
    .header__website-url {
      margin: 0 40px;
      line-height: 20px;
    }
  }
`
const JobDetailsDescription = styled.div`
  width: min(730px, 90%);
  margin-top: 20px;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};
  border-radius: 6px;
  padding: 40px 20px;
  transition: background-color .3s;

  @media (min-width: 768px) {
    .description__header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }

    .description__header-data-container {
      width: 70%;
    }
  }

  & .description__tagline-container {
    display: flex;
    align-items: baseline;
    color: #6E8098;

    & .dot {
      background-color: #6E8098;
      border-radius: 50px;
      width: 4px;
      height: 4px;
      margin: 0 16px;
    }
  }

  & .description__title {
    font-size: 20px;
    font-weight: 700;
    margin: 16px 0px;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    transition: color .3s;
  }

  & .tags {
    font-weight: 700;
    font-size: 14px;
    color: #5964E0;
  }

  .description__main-container {
    overflow: hidden;
    color: #6E8098;
    line-height: 28px;
  }
`
const JobDetailsRequirements = styled.div`
  margin-top: 40px;
  color: #6E8098;
  line-height: 28px;
  
  & .requirements__title {
    font-size: 20px;
    font-weight: 700;
    margin: 16px 0px;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    transition: color .3s;
  }

  & .requirements__list {
    margin-top: 30px;
  }

  & .requirements__list-item {
    list-style-type: disc;
    list-style-position: inside;
  }

  & .requirements__list-item+.requirements__list-item {
    margin-top: 15px;
  }

  & .requirements__ollist-item {
    list-style-type: decimal;
    list-style-position: inside;
  }

  & .requirements__ollist-item+.requirements__ollist-item {
    margin-top: 15px;
  }

`
const JobCta = styled.div`
  width: 100%;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};;
  border-top-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(25px);
  transition: background-color .3s;

  .cta_wrapper {
    width: min(730px, 90%);
  }

  @media (min-width: 768px) {
    .cta_wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .cta_title-container {
    display: none;
  }

  .cta_title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
  }

  .cta_website {
    color: #6E8098;
    text-decoration: none;
  }

  @media (min-width: 768px) {
    .cta_title-container {
      display: block;
    }
  }
`
const Button = styled.a`
  text-decoration: none;
  display: inline-block;
  text-align: center;
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
  transition: background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: #939BF4;
  }

  @media (min-width: 768px) {
    width: 30%;
  }
`

export default function JobDetails(props) {

  const storedJob = JSON.parse(localStorage.getItem('selected_job'));

  const { theme, visible, job = storedJob } = props;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <StyledJobDetails visible={visible}>
        <JobDetailsHeader theme={theme} img={job.logo} logoBg={job.logoBackground}>
          <div className="header__data-container">
            <img className="company__logo" src={`.${job.logo}`} alt="company-logo"/>
            <div className="header_title-container">
              <h2 className="header__title">{job.company}</h2>
              <a href={job.website} target="_blank" rel="noreferrer" className="header__website">{job.website}</a>
            </div>
            <a href={job.website} target="_blank" rel="noreferrer" className="header__website-url">Company Site</a>
          </div>
        </JobDetailsHeader>
        <JobDetailsDescription theme={theme}>
          <div className="description__header">
            <div className="description__header-data-container">
              <div className="description__tagline-container">
                <p>{job.postedAt}</p>
                <span className="dot"></span>
                <p>{job.contract}</p>
              </div>
              <h2 className="description__title">{job.position}</h2>
              <p className="tags">{job.location}</p>
            </div>
            <Button href={job.apply} target="_blank">Apply Now</Button>
          </div>
          <div className="description__main-container">
            {ReactHtmlParser(job.description)}
          </div>
          <JobDetailsRequirements theme={theme}>
            <h2 className="requirements__title">Requirements</h2>
            <p className="requirements__paragraph">{job.requirements.content}</p>
            <ul className="requirements__list">
              {job.requirements.items.map(item => <li className="requirements__list-item">{item}</li>)}
            </ul>
          </JobDetailsRequirements>
          <JobDetailsRequirements theme={theme}>
            <h2 className="requirements__title">What You Will Do</h2>
            <p className="requirements__paragraph">{job.role.content}</p>
            <ol className="requirements__list">
              {job.role.items.map(item => <li className="requirements__ollist-item">{item}</li>)}
            </ol>
          </JobDetailsRequirements>
        </JobDetailsDescription>
        <JobCta theme={theme}>
          <div className="cta_wrapper">
            <div className="cta_title-container">
              <h2 className="cta_title">{job.position}</h2>
              <a href={job.website} target="_blank" rel="noreferrer" className="cta_website">{job.company}</a>
            </div>
            <Button href={job.apply} target="_blank">Apply Now</Button>
          </div>
        </JobCta>
      </StyledJobDetails>
    </>
  )
}
