import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../../utils/api'

function LanguagesNav ({selected, onUpdateLanguage}) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return ( 
    <ul className = 'flex-center' > {
      languages.map((language) => ( 
        <li key={language}>
          <button 
          className ='btn-clear nav-link'
          style={language === selected ? { color: 'rgb(187,46,31)' } : null } 
          onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))
    } 
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      selectedLangauge: 'All',
      error: null,
      repos: {}
		}

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }
  
  componentDidMount() {
    this.updateLanguage(this.state.selectedLangauge)
  }
	
	updateLanguage(selectedLangauge) {
		this.setState ({
      selectedLangauge : selectedLangauge,
      error: null,
    })

    if (!this.state.repos[selectedLangauge]) {
      fetchPopularRepos(selectedLangauge)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLangauge] : data
            }
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos', error)
  
          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }
  
  isLoading() {
    const { selectedLangauge, repos, error} = this.state;

    return !repos[selectedLangauge] && error === null
  }
	render() {
    const { selectedLangauge, repos, error } = this.state;
    
    return (
      <React.Fragment>
        <LanguagesNav 
          selected = {selectedLangauge}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLangauge] && <pre>{JSON.stringify(repos[selectedLangauge], null, 2)}</pre>}
      </React.Fragment>
    )
	}
}