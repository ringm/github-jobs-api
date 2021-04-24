import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from 'react-router';

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
    background-color: #fff;
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

const JobDetailsFooter = styled.div`
  width: min(730px, 90%);
  background: url(../assets/desktop/bg-pattern-detail-footer.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  margin-top: 20px;
  padding: 30px 20px;
  color: #fff;

  .footer__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .footer__text {
    font-weight: 300;
    line-height: 26px;
  }

  .footer__link {
    width: 100%;
    background: transparent;
    border: none;
    display: inline-block;
    color: #fff;
    font-size: 16px;
    overflow-wrap: break-word;
  }

  a {
    color: #fff;
    text-decoration: none;
    line-height: 26px;
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

  const { theme, visible, job = storedJob, handleUpdateLocation } = props;

  const location = useLocation();

  handleUpdateLocation(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    <>
      <StyledJobDetails visible={visible}>
        <JobDetailsHeader theme={theme} img={job.company_logo}>
          <div className="header__data-container">
            <img className="company__logo" src={job.company_logo} alt="company-logo"/>
            <div className="header_title-container">
              <h2 className="header__title">{job.company}</h2>
              <a href={job.company_url} target="_blank" rel="noreferrer" className="header__website">{job.company_url}</a>
            </div>
            <a href={job.company_url} target="_blank" rel="noreferrer" className="header__website-url">Company Site</a>
          </div>
        </JobDetailsHeader>
        <JobDetailsDescription theme={theme}>
          <div className="description__header">
            <div className="description__header-data-container">
              <div className="description__tagline-container">
                <p>{formatTime(job.created_at)}</p>
                <span className="dot"></span>
                <p>{job.type}</p>
              </div>
              <h2 className="description__title">{job.title}</h2>
              <p className="tags">{job.location}</p>
            </div>
            <Button>Apply Now</Button>
          </div>
          <div className="description__main-container">
            {ReactHtmlParser(job.description)}
          </div>
        </JobDetailsDescription>
        <JobDetailsFooter>
          <h2 className="footer__title">How to Apply</h2>
          <div className="footer__link">{ReactHtmlParser(job.how_to_apply)}</div>
        </JobDetailsFooter>
        <JobCta theme={theme}>
          <div className="cta_wrapper">
            <div className="cta_title-container">
              <h2 className="cta_title">{job.company}</h2>
              <a href={job.company_url} target="_blank" rel="noreferrer" className="cta_website">{job.company_url}</a>
            </div>
            <Button href={job.company_url} target="_blank">Apply Now</Button>
          </div>
        </JobCta>
      </StyledJobDetails>
    </>
  )
}
