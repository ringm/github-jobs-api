import '../css/reset.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import ResultList from './ResultList';
import JobDetails from './JobDetails';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Search from './Search';

const StyledApp = styled.div`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Kumbh Sans';
  }

  .relative {
    position: relative;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? '#F4F6F8' : '#121721'};
    background-image: url(../assets/mobile/bg-pattern-header.svg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 125px;
    transition: background-color .3s;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  @media (min-width: 768px) {
    .header {
      background-image: url(../assets/tablet/bg-pattern-header.svg);
      background-position: center bottom;
    }
  }

  @media (min-width: 968px) {
    .header {
      background-image: url(../assets/desktop/bg-pattern-header.svg);
    }
  }

  .header__row {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(1100px, 90%);
  }

  .header__logo {
    cursor: pointer;
  }
`

const Main = styled.div`
  min-height: calc(100vh - 124px);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Kumbh Sans', sans-serif;
  background-color: ${props => props.theme === 'light' ? '#F4F6F8' : '#121721'};
  transition: background-color .3s;
  padding-bottom: ${props => props.location === '/' ? '100px' : '0'};

  & .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
let pageNumber = 1;

function App() {

  const [theme, setTheme] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState();
  const [location, setLocation] = useState('');
  const [descriptionSearch, setDescriptionSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('off');

  function handleThemeToggle(checked) {
    const newTheme = !checked ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function handleSelectedJob(id) {
    const currentJobs = [...jobs];
    const job = currentJobs.find(job => job.id === id);
    setSelectedJob(job);
  }

  function handleSearch(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setJobs(data)
    })
  }

  function handleUpdateLocation(loc) {
    setLocation(loc);
  }

  function loadMoreJobs() {
    const currentJobs = [...jobs];
    const desc = descriptionSearch === '' ? '' : `&description=${descriptionSearch}`
    const loc = locationSearch === '' ? '' : `&location=${locationSearch}`
    const type = typeSearch === '' ? '' : `&full_time=${typeSearch}`
    pageNumber++;
    const url = `https://cors.bridged.cc/https://jobs.github.com/positions.json?page=${pageNumber}${desc}${loc}${type}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setJobs([...currentJobs, ...data])
    })
  }

  useEffect(() => {
    handleSearch('https://cors.bridged.cc/https://jobs.github.com/positions.json')
  }, [])

  useEffect(() => {
    if(selectedJob !== undefined) {
      localStorage.setItem('selected_job', JSON.stringify(selectedJob));
    }
  }, [selectedJob])

  return (
    <StyledApp theme={theme}>
      <Router>
        <div className="relative">
          <div className="header">
              <div className="header__row">
                <Link to="/" exact="true">
                  <img
                    className="header__logo"
                    src="../assets/desktop/logo.svg"
                    alt="logo"
                    onClick={() => handleUpdateLocation('/')}
                  />
                </Link>
                <ThemeToggle 
                  handleThemeToggle={handleThemeToggle}
                  setTheme={setTheme}
                />
              </div>
              <Route path="/" exact render={() => 
                <Search 
                  theme={theme} 
                  handleSearch={handleSearch}
                  setDescriptionSearch={setDescriptionSearch}
                  setLocationSearch={setLocationSearch}
                  setTypeSearch={setTypeSearch}
                />
              } />
          </div>
          <Main theme={theme} location={location}>
            <div className="wrapper">
                <Switch>
                  <Route path="/job-details/" render={() => 
                    <JobDetails
                      theme={theme}
                      job={selectedJob}
                      handleUpdateLocation={handleUpdateLocation}
                    />}
                  />
                  <Route path="/" exact render={() => 
                    <ResultList 
                      theme={theme} 
                      jobs={jobs}
                      handleSelectedJob={handleSelectedJob}
                      loadMoreJobs={loadMoreJobs}
                    />} 
                  />
                </Switch>
            </div>
          </Main>
        </div>
      </Router>
    </StyledApp>
  )
}

export default App;
