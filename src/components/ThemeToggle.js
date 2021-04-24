import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const SytledThemeToggle = styled.div`
  display: flex;
  align-items: center;

  .theme__toggle-checkbox {
    display: none;
  }

  .theme__toggle-label {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 24px;
    width: 48px;
    background-color: #fff;
    border-radius: 100px;
    margin: 0 10px;
    cursor: pointer;
  }

  .theme__toggle-label::after {
    content: '';
    width: 14px;
    height: 14px;
    background-color: #5964E0; 
    border-radius: 100%;
    transform: translateX(0);
    transition: transform .3s;
  }

  .theme__toggle-checkbox:checked ~ .theme__toggle-label::after {
    transform: translateX(24px);
  }
`

export default function ThemeToggle({ handleThemeToggle }) {

  const checkInput = useRef();
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function handleClick(e) {
    const bool = e.target.checked;
    handleThemeToggle(bool);
  }

  matchMedia.addEventListener("change", (e) => {
    checkInput.current.checked = e.matches;
    handleThemeToggle(e.matches);
  })

  useEffect(() => {
    checkInput.current.checked = matchMedia.matches;
    handleThemeToggle(matchMedia.matches);
  }, [])

  return (
    <SytledThemeToggle>
      <img src="../assets/desktop/icon-sun.svg" alt="sun-icon"/>
      <div className="theme__toggle-base">
        <input
          ref={checkInput}
          className="theme__toggle-checkbox" 
          type="checkbox" 
          name="theme" 
          id="theme"
          onClick={handleClick}
        />
        <label
          className="theme__toggle-label" 
          htmlFor="theme"
        ></label>
      </div>
      <img src="../assets/desktop/icon-moon.svg" alt="moon-icon"/>
    </SytledThemeToggle>
  )
}
