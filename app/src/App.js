import React from "react";
import "./App.scss";
import logo from "./assets/githublogo.png";
import axios from "axios";
import UserCard from "./Components/UserCard";

class App extends React.Component {
	state = {
		users: []
	};

	componentDidMount() {
		axios
			.get("https://api.github.com/users/PrinceD96")
			.then(res => {
				console.log("res:", res);
				this.setState({ ...this.state, users: res.data });
			})
			.catch(error => {
				console.log("Something went wrong =>", error);
			});
	}

	render() {
		return (
			<div className='App'>
				<header>
					<img src={logo} alt='logo' />
					<h1>User Page!</h1>
				</header>
				<div className='card-list'>
					<UserCard state={this.state} />
				</div>
			</div>
		);
	}
}

export default App;
