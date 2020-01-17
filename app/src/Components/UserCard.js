import React from "react";

class UserCard extends React.Component {
	render() {
		const user = this.props.state.users;
		console.log("UserCard props", this.props);

		return (
			<div className='user-card'>
				<img width='100' src={user.avatar_url} />
				<div className='card-info'>
					<h3>{user.name}</h3>
					<p>{user.login}</p>
					<p>Location: {user.location}</p>
					<p>
						Profile:{" "}
						<a href={user.html_url} target='_blank'>
							{user.html_url}
						</a>
					</p>
					<p>Followers: {user.followers}</p>
					<p>Following: {user.following}</p>
					<p>Bio: {user.bio}</p>
				</div>
			</div>
		);
	}
}

export default UserCard;
