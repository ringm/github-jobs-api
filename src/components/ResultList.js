import React from 'react'
import styled from 'styled-components';
import Result from './Result';

const StyledDiv = styled.div`
  width: min(1100px, 90%);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledResultList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto;
  grid-row-gap: 50px;
  /*transform: translateY(50px);*/
  margin-top: 50px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }

  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 25px;
  }
`

const StyledButton = styled.button`
  border: none;
  outline: none;
  background-color: #5964E0;
  border-radius: 6px;
  color: #fff;
  padding: 15px 40px;
  margin-bottom: 40px;
  cursor: pointer;
`

const NoResultMsg = styled.p`
  color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
  opacity: .75;
  margin-top: 100px;
  font-size: 18px;
  transition: color .3s;
`

export default function ResultList(props) {

  const { visible, handleSelectedJob, jobs, theme, loadMoreJobs } = props;

  if(jobs.length === 0) return <NoResultMsg theme={theme}>Sorry, no jobs match your search</NoResultMsg>

  return (
    <StyledDiv>
      <StyledResultList visible={visible}>
        {jobs.map(job => {
          return (
            <Result 
              key={job.id} 
              theme={theme} 
              job={job}
              handleSelectedJob={handleSelectedJob}
            />
          )
        })}
      </StyledResultList>
      {jobs.length < 50 ? null : <StyledButton onClick={loadMoreJobs}>Load More</StyledButton>}
    </StyledDiv>
  )
}
