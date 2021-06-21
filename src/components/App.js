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
  padding-bottom: 30px;

  & .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

function App() {

  const [theme, setTheme] = useState('');
  const [jobs, setJobs] = useState([]);
  const [contractFilter, setContractFilter] = useState(false);
  const [positionFilter, setPositionFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState();

  const filters = {
    contract: contract => contractFilter ? contract === 'Full Time' : contract,
    position: position => position.toLowerCase().includes(positionFilter.toLowerCase()),
    location: location => location.toLowerCase().includes(locationFilter.toLowerCase())
  }

  function filterJobs(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }

  function handleThemeToggle(checked) {
    const newTheme = !checked ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function handleContractFilterToggle() {
    setContractFilter(!contractFilter);
  }

  function handlePositionFilterChange(value) {
    setPositionFilter(value);
  }

  function handleLocationFilterChange(value) {
    setLocationFilter(value);
  }

  function handleSelectedJob(id) {
    const currentJobs = [...jobs];
    const job = currentJobs.find(job => job.id === id);
    setSelectedJob(job);
  }

  useEffect(() => {
    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      setJobs(data)
    })
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
                <Link to="/">
                  <img
                    className="header__logo"
                    src="../assets/desktop/logo.svg"
                    alt="logo"
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
                  positionFilter={positionFilter}
                  locationFilter={locationFilter}
                  onContractFilterToggle={handleContractFilterToggle}
                  onPositionFilterChange={handlePositionFilterChange}
                  onLocationFilterChange={handleLocationFilterChange}
                />
              } />
          </div>
          <Main theme={theme}>
            <div className="wrapper">
                <Switch>
                  <Route path="/job-details/" render={() => 
                    <JobDetails
                      theme={theme}
                      job={selectedJob}
                    />}
                  />
                  <Route path="/" exact render={() => 
                    <ResultList 
                      theme={theme} 
                      jobs={filterJobs(jobs, filters)}
                      handleSelectedJob={handleSelectedJob}
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
