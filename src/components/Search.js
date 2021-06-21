import React, { useState } from 'react'
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  width: min(1100px, 90%);
  min-height: 80px;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#19202D'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 10px 15px 5px ${props => props.theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.2)'};
  transform: translateY(15px);
  transition: all .35s;
`

const SearchBarSmall = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  @media (min-width: 768px) {
    display: none;
  }

  .input-small {
    background-color: transparent;
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    width: 100%;
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    border: transparent;
    outline: none;
    transition: color .3s;
  }

  .icons-small {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .filter-icon {
    cursor: pointer;
    fill: ${props => props.theme === 'light' ? '#6E8098' : '#fff'} ;
    transition: fill .35s;
  }

`

const SearchBarBig = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;

  @media (max-width: 767px) {
    display: none;
  }
`

const SearchCol = styled.div`
  width: 33.3%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-right: ${props => props.border ? '1px solid rgba(110, 128, 152, 0.2)' : ''};
  border-left: ${props => props.border ? '1px solid rgba(110, 128, 152, 0.2)' : ''};

  @media (min-width: 968px) {
    padding: 0 25px;
  }

  .icon {
    vertical-align:top;
    margin-right: 14px;
  }

  .input {
    outline: none;
    background: transparent;
    border: none;
    font-family: 'Kumbh Sans';
    color: #fff;
    font-size: 15px;
    font-weight: 300;
    transform: translateY(2px)
  }

  .checkbox_container {
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: auto;
  }

  .checkbox {
    display: none;
  }

  .checkbox_text {
    color: ${props => props.theme === 'light' ? '#19202D' : '#fff'};
    transform: translateY(2px);
    transition: color .3s;
  }

  .label {
    display: flex;
    background-color: ${props => props.theme === 'light' ? 'rgba(25,32,45,0.1)' : 'rgba(97, 97, 97, 0.1)'};
    border-radius: 4px;
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    margin-right: 14px;
    transition: background-color .2s;
  }

  .label:hover {
    background-color: rgba(89, 100, 224, 0.25);
  }

  .checkbox:checked ~ .label::after {
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

  `

const Filter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: ${props => props.visible ? '' : 'none'};
  z-index: 100;

  & .bg {
    background-color: #000;
    opacity: .6;
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

  .row.contract-filter {
    margin-top: 20px;
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

export default function Search({ theme, onContractFilterToggle, onPositionFilterChange, onLocationFilterChange, positionFilter, locationFilter }) {

  const [filterVisibility, setFilterVisibility] = useState(false);

  return (
    <>
      <SearchBarContainer theme={theme}>
        <SearchBarSmall theme={theme}>
          <label htmlFor="positionFilterSmall"></label>
          <input id="positionFilterSmall" name="positionFilterSmall" className="input-small" type='text' placeholder="Filter by title..." />
          <div className="icons-small">
            <svg 
              className="filter-icon" 
              width="20" 
              height="20" 
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setFilterVisibility(true)}
              >
                <path d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z" fillRule="nonzero"/>
            </svg>
          </div>
        </SearchBarSmall>
        <SearchBarBig>
          <SearchCol>
            <img className="icon" src="../assets/desktop/icon-search-purple.svg" alt="icon-search"/>
            <label htmlFor="positionFilter"></label>
            <input 
              id="positionFilter"
              name="positionFilter"
              className="input" 
              type='text' 
              placeholder="Filter by title..." 
              value={positionFilter}
              onInput={e => onPositionFilterChange(e.target.value)}
            />
          </SearchCol>
          <SearchCol border>
            <img className="icon" src="../assets/desktop/icon-location.svg" alt="icon-search"/>
            <label htmlFor="locationFilter"></label>
            <input
              id="locationFilter"
              name="locationFilter"
              className="input" 
              type='text' 
              placeholder="Filter by location..." 
              value={locationFilter}
              onInput ={e => onLocationFilterChange(e.target.value)}
            />
          </SearchCol>
          <SearchCol theme={theme}>
            <div className="checkbox_container">
              <input 
                className="checkbox"
                type="checkbox" 
                name="job-type" 
                id="job-type"
                onChange={onContractFilterToggle}
              />
              <label className="label" htmlFor="job-type"></label>
              <p className="checkbox_text">Full Time</p>
            </div>
          </SearchCol>
        </SearchBarBig>
      </SearchBarContainer>
        <Filter theme={theme} visible={filterVisibility}>
          <div 
            className="bg"
            onClick={() => setFilterVisibility(false)}
            ></div>
          <FilterBox theme={theme}>
            <div className="row">
              <img src="../assets/desktop/icon-location.svg" alt="location-icon"/>
              <input 
                className="text-input" 
                type="text" 
                name="location" 
                id="location" 
                placeholder="Filter by location..."
                value={locationFilter}
                onInput ={e => onLocationFilterChange(e.target.value)}
              />
              <label htmlFor="location"></label>
            </div>
            <div className="row contract-filter">
              <input 
                className="fulltime-checkbox-input" 
                type="checkbox" 
                name="fulltime" 
                id="fulltime"
                onChange={onContractFilterToggle}
              />
              <label className="fulltime-checkbox-label" htmlFor="fulltime"></label>
              <p className="fulltime-checkbox-text">Full Time Only</p>
            </div>
          </FilterBox>
        </Filter>
      </>
  )
}
