import React from 'react';

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

export default class Popular extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLangauge: 'All'
		}

		this.updateLanguage = this.updateLanguage.bind(this);
	}
	
	updateLanguage(selectedLangauge) {
		this.setState ({
			selectedLangauge : selectedLangauge
		})
	}
	render() {
    const { selectedLangauge } = this.state;
    
    return (
      <React.Fragment>
        <LanguagesNav 
          selected = {selectedLangauge}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    )
	}
}