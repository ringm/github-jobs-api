import React from 'react';
import styled from 'styled-components';

const StyledFilter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${props => props.visible ? 'block' : 'none'};

  & .bg {
    background-color: #000;
    opacity: .6;
    width: 100%;
    height: 100vh;
  }
`

const FilterBox = styled.div`
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};
  border-radius: 6px;
  width: 80%;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: backgound-color .3s;

  .row {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 25px 30px;
  }

  .row:first-child {
    border-bottom: 2px solid rgba(151, 151, 151, 0.2);
  }

  .row:last-child {
    padding-top: 0;
  }

  .text-input {
    all: unset;
    color: #fff;
    font-weight: 300;
    margin-left: 20px;
    align-self: flex-end;
  }

  .search-button {
    display: inline-block;
    width: 100%;
    border: none;
    background-color: #5964E0;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Kumbh Sans';
    letter-spacing: .5px;
    padding: 15px 0;
    transition: background-color .2s;
  }

  .search-button:hover {
    background-color: #939BF4;
  }

  .fulltime-checkbox-input {
    display: none;
  }

  .fulltime-checkbox-label {
    background-color: ${props => props.theme === 'light' ? 'rgba(25,32,45,0.1)' : 'rgba(97, 97, 97, 0.1)'};
    border-radius: 4px;
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    transition: background-color .2s;
  }

  .fulltime-checkbox-label:hover {
    background-color: rgba(89, 100, 224, 0.25);
  }

  .fulltime-checkbox-input:checked ~.fulltime-checkbox-label::after {
    content: '';
    border-radius: 4px;
    position: absolute;
    background: url('../assets/desktop/icon-check.svg'), #5964E0;
    background-position: center;
    background-repeat: no-repeat;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  & .fulltime-checkbox-text {
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    margin-left: 20px;
    font-weight: 700;
    transform: translateY(2px);
  }
`

export default function Filter(props) {

  const { theme, visible, handleModalVisibility } = props;

  return (
    <StyledFilter visible={visible}>
      <div 
        className="bg"
        onClick={handleModalVisibility}
        ></div>
      <FilterBox theme={theme}>
        <div className="row">
          <img src="../assets/desktop/icon-location.svg" alt="location-icon"/>
          <input className="text-input" type="text" name="location" id="location" placeholder="Filter by location..." />
          <label htmlFor="location"></label>
        </div>
        <div className="row">
          <input className="fulltime-checkbox-input" type="checkbox" name="fulltime" id="fulltime"/>
          <label className="fulltime-checkbox-label" htmlFor="fulltime"></label>
          <p className="fulltime-checkbox-text">Full Time Only</p>
        </div>
        <div className="row">
          <button className="search-button">Search</button>
        </div>
      </FilterBox>
    </StyledFilter>
  )
}
