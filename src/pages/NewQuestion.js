import React, { Component } from 'react';
import { Notification } from 'react-notification';
import { createSelector } from 'reselect';
import selectAuthedUser from '../selectors/authedUser';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import { handleAddQuestion } from '../actions/questions';
import { withRouter } from 'react-router-dom';

class NewQuestion extends Component {

	state = {
		isActive: false,
		optionOne: '',
		optionTwo: ''
	};

	showNotification() {
		this.setState({
			isActive: true
		});
	}

	submitQuestion = () => {
		const { optionOne, optionTwo } = this.state;
		const { dispatch, authedUser } = this.props;
		if (authedUser === '' || isUndefined(authedUser)) {
			this.showNotification();
		} else {
			dispatch(handleAddQuestion(
				{optionOne, optionTwo},
				() => {
					this.setState( { optionOne: '', optionTwo: '' });
					this.props.history.push('/')
				}
			));
		}
	};

	render () {
		const { isActive, optionOne, optionTwo } = this.state;
		return (
			<div className='page-new-question'>

				<Notification
					isActive={isActive}
					message="Please log in or register to submit a question."
					action="Dismiss"
					title="You are not logged in"
					dismissAfter={4000}
					onDismiss={() => this.setState({ isActive: false })}
					onClick={() => this.setState({ isActive: false })}
				/>

				<div className="uk-container uk-container-xsmall uk-margin-large-top">
					<div className="uk-card uk-card-default uk-card-body uk-width-1-1@s">
						<form>
							<fieldset className="uk-fieldset">
								<legend className="uk-legend">Add a New Question</legend>
								<div className="uk-margin">
									<span className='uk-text-bold'>Would You Rather ...</span>
								</div>
								<div className="uk-margin">
									<input
										type="text"
										className="uk-input uk-form-large"
										placeholder="Enter option one here..."
										value={optionOne}
										onChange={(e) => this.setState({ optionOne: e.target.value })}
									/>
								</div>
								<div className="uk-margin">
									<span className='uk-text-bold'>... or ...</span>
								</div>
								<div className="uk-margin">
									<input
										className="uk-input uk-form-large"
										type="text"
										placeholder="Enter option two here..."
										value={optionTwo}
										onChange={(e) => this.setState({ optionTwo: e.target.value })}
									/>
								</div>
							</fieldset>

							<fieldset className="uk-fieldset">
								<div className="uk-margin">
									<button
										type='button'
										className='uk-button uk-button-primary uk-button-large uk-width-1-1'
										onClick={this.submitQuestion}
										disabled={optionOne === '' || optionTwo === ''}
									>
										Submit Question
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

const mapStateToProps = createSelector(
	selectAuthedUser(),
	(authedUser) => ({
		authedUser
	})
);

export default withRouter(connect(mapStateToProps)(NewQuestion));