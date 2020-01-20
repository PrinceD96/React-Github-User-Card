import React from "react";
import {
	Typography,
	Card,
	CardActions,
	CardActionArea,
	CardMedia,
	CardContent,
	Button
} from "@material-ui/core";

class GitHubUserCard extends React.Component {
	render() {
		return (
			<Card>
				<CardActionArea>
					<CardMedia
						style={{ height: 320 }}
						image={this.props.user.avatar_url}
						title={this.props.user.name}
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{this.props.user.name}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							GitHub Handle: {this.props.user.login}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{this.props.user.bio}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{this.props.user.location}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						className='btn'
						size='small'
						color='secondary'
						onClick={() => this.props.fetchFollowers(this.props.user.login)}
					>
						Show Followers
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default GitHubUserCard;
