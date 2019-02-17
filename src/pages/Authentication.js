import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';

class Authentication extends Component {

	state = {
		selectedUser: ''
	};

	selectUser = (id) => this.setState({ selectedUser: id });

	logIn = (e) => {
		const { selectedUser } = this.state;
		const { location } = this.props;
		e.preventDefault();
		const originalRoute = location.state && location.state.originalRoute;
		this.props.dispatch(setAuthedUser(selectedUser));
		this.props.history.push(originalRoute ? originalRoute : '/');
	};

	componentDidMount() {
		this.setState({ selectedUser: this.props.authedUser });
	}

	render() {
		const { selectedUser } = this.state;
		const { users, authedUser, location } = this.props;
		const userKeyList = Object.keys(users);
		return (
			<div className='authentication'>
				{ (location.state && location.state.loginWarning) &&
					<div className="uk-alert-warning" data-uk-alert>
						<p>{location.state.loginWarning}</p>
					</div>
				}
				<div className="uk-container uk-container-xsmall uk-margin-large-top">
					<div className="uk-card uk-card-default uk-card-body uk-width-2-3@s">
						<form className='auth-form'>
							<fieldset className="uk-fieldset">
								<div className="uk-margin">
									<legend className="uk-legend">Log In</legend>
									<div>Please Choose Your Account</div>
								</div>
								<div className="uk-margin">
									<button
										type="button"
										className="dropdown uk-button uk-button-default uk-width-1-1"
										disabled={userKeyList.length === 0 ? true : undefined}
									>
										{ !isEmpty(users) &&
											selectedUser !== '' ? <span><img src={users[selectedUser].avatarURL} alt='' /> {users[selectedUser].name}</span> : 'Select User'
										}
										<span data-uk-icon="icon: chevron-down" />
									</button>
									<div data-uk-dropdown="mode: click; pos: bottom-justify; boundary: .auth-form;">
										<ul className="uk-nav uk-dropdown-nav">
											{userKeyList.map((i) => (
												<li key={users[i].id} className={selectedUser === users[i].id ? 'uk-active' : undefined}>
													<button
														type='button'
														className='uk-button uk-button-link uk-dropdown-close'
														onClick={this.selectUser.bind(this, users[i].id )}
													>
														<img src={users[i].avatarURL} alt={users[i].name} />
														{users[i].name}
														{selectedUser === users[i].id ? <span data-uk-icon="icon: check" /> : null}
													</button>
												</li>
											))}
										</ul>
									</div>
								</div>
							</fieldset>

							<fieldset className="uk-fieldset">
								<div className="uk-margin">
									<button
										type='button'
										className='uk-button uk-button-primary uk-button-large uk-width-1-1'
										disabled={selectedUser === '' || selectedUser === authedUser ? true : undefined}
										onClick={this.logIn}
									>
										Log In
									</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Authentication.defaultProps = {
	users: []
};

function mapStateToProps ({ users, authedUser }) {
	return {
		users,
		authedUser
	};
}

export default withRouter(connect(mapStateToProps)(Authentication));
