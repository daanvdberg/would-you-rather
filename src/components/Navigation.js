import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { logOut } from '../actions/authedUser';

class Navigation extends Component {

	logOut = (e) => {
		e.preventDefault();
		this.props.dispatch(logOut())
	};

	render () {
		const { location, users, authedUser } = this.props;
		return (
			<div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
				<nav className='uk-navbar-container' data-uk-navbar>
					<div className='uk-navbar-left'>
						<div className='uk-navbar-item uk-logo'>Would You Rather..?</div>
						<ul className='uk-navbar-nav'>
							<li className={location.pathname === '/' ? 'uk-active' : undefined}>
								<Link to='/'>Home</Link>
							</li>
							<li className={location.pathname === '/new-question' ? 'uk-active' : undefined}>
								<Link to='/new-question'>Submit Question</Link>
							</li>
							<li className={location.pathname === '/leader-board' ? 'uk-active' : undefined}>
								<Link to='/leader-board'>Leader Board</Link>
							</li>
						</ul>
					</div>
					<div className='uk-navbar-right'>
						<div className="uk-navbar-item">
							{(users && (authedUser === '' || authedUser === undefined))
								? <div>Welcome &mdash; <Link to='/login'>Please Log In</Link></div>
								: !isEmpty(users) && <div>Hello, {users[authedUser].name} &mdash; (<Link to='/login'>SWITCH ACCOUNT</Link> / <button className='uk-button uk-button-link' onClick={this.logOut}>Log Out</button>)</div>
							}

						</div>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps ({ users, authedUser }) {
	return {
		users,
		authedUser
	};
}

export default withRouter(connect(mapStateToProps)(Navigation));