import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import cookie from 'react-cookies';
import queryString from 'query-string'
import './bulma.css';
import Header from './Header.js';
import Homepage from './Homepage.js';
import SubmitPoll from './components/SubmitPoll.js'

class App extends React.Component {
	constructor(){
		super()
		this.state = {
			cookie : false,
		}
	}
	checkUser = (id) => {
		console.log(cookie.load('userId'))
		if(!cookie.load('userId')){
			fetch("http://localhost:7777/validate?userid=" + id)
			.then((response) => {
					  return response.json().then(json => {
					        return response.ok ? json : Promise.reject(json);
						});
			})
			.then((res)=>{
					if(res === false){
						return
					}
					else{
						cookie.save('userId', id, { path: '/' })
						this.setState({
							cookie: true
						});
					}
			})
		}
	}

	componentDidMount() {
		const values = queryString.parse(window.location.search);
		if(values.id && !cookie.load('userId')){
			console.log('checking!', values.id)
			this.checkUser(values.id);
		}
	}

	render () {
		return (
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							<Route path="/submit" component={SubmitPoll} />
							<Route path="/" component={Homepage} />
						</Switch>
					</div>
				</BrowserRouter>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
	)