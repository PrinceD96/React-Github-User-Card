import React from "react";
import GitHubUserCard from "./Components/GitHubUserCard";
import FollowersList from "./Components/FollowersList";
import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import "./App.scss";
import logo from "./assets/githublogo.png";

class App extends React.Component {
	state = {
		userToFetch: "PrinceD96"
	};

	componentDidMount() {
		axios
			.get(`https://api.github.com/users/${this.state.userToFetch}`)
			.then(user => this.setState({ ...this.state, user: user.data }))
			.catch(err => console.log("Error in componentDidMount: ", err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.userToFetch !== this.state.userToFetch) {
			fetch(`https://api.github.com/users/${this.state.userToFetch}`)
				.then(res => res.json())
				.then(user => this.setState({ ...this.state, user: user }))
				.then(() => this.fetchFollowers(this.state.userToFetch))
				.catch(err => console.log("Error in componentDidUpdate: ", err));
		}
	}

	fetchFollowers = userToFetch =>
		fetch(`https://api.github.com/users/${userToFetch}/followers`)
			.then(res => res.json())
			.then(followers =>
				this.setState({
					...this.state,
					projects: undefined,
					followers: followers
				})
			)
			.catch(err => console.log("Error in fetchFollowers: ", err));

	handleUserChange = userToFetch =>
		this.setState({ ...this.state, userToFetch: userToFetch });

	handleSearchInput = event =>
		this.setState({ ...this.state, searchTerm: event.target.value });

	searchFollowers = event => {
		event.preventDefault();
		this.setState({
			...this.state,
			followers: this.state.followers.filter(follower =>
				follower.login
					.toLowerCase()
					.includes(this.state.searchTerm.toLowerCase())
			)
		});
	};

	clearForm = event => {
		event.preventDefault();
		this.fetchFollowers(this.state.userToFetch);
		this.setState({ ...this.state, searchTerm: "" });
	};

	render() {
		const { user, followers } = this.state;
		console.log(this.state);
		return user ? (
			<Container maxWidth='xs'>
				<header>
					<img src={logo} />
					<h1>User Page!</h1>
				</header>
				<Typography component='div'>
					<GitHubUserCard
						user={user}
						fetchFollowers={this.fetchFollowers}
						fetchProjects={this.fetchProjects}
					/>
					<FollowersList
						followers={followers}
						searchFollowers={this.searchFollowers}
						clearForm={this.clearForm}
						handleUserChange={this.handleUserChange}
						handleSearchInput={this.handleSearchInput}
						searchTerm={this.state.searchTerm || ""}
					/>
				</Typography>
			</Container>
		) : (
			<div></div>
		);
	}
}

export default App;
