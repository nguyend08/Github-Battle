import React from 'react';

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
		const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
		return ( 
			<ul className = 'flex-center' > {
				languages.map((language) => ( 
					<li key={language}>
						<button 
						className ='btn-clear nav-link'
						style={language === this.state.selectedLangauge ? { color: 'rgb(187,46,31)' } : null } 
						onClick={() => this.updateLanguage(language)}
						>
							{language}
						</button>
					</li>
				))
			} 
			</ul>
		)
	}
}