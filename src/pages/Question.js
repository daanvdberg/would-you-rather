import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { formatDate } from '../utils/helpers';
import { handleAnswerQuestion } from '../actions/questions';
import { createSelector } from 'reselect';
import selectQuestions from '../selectors/questions';
import selectUsers from '../selectors/users';
import selectAuthedUser from '../selectors/authedUser';
import selectRouterMatch from '../selectors/common';
import { Notification } from 'react-notification';
import { withRouter } from 'react-router-dom';
import isUndefined from 'lodash/isUndefined';
import NotFound from '../components/NotFound';

class Question extends Component {

	state = {
		isActive: false,
		notificationMessage: ''
	};

	sortArray = (array) => array.sort( (a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0) );

	showNotification(message) {
		this.setState({
			isActive: false,
			notificationMessage: ''
		}, () => {
			this.setState({
				isActive: true,
				notificationMessage: message
			});
		});
	}

	chooseAnswer = (option) => () => {
		const { question, authedUser } = this.props;
		const alreadyVoted = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);
		if (authedUser === '' || isUndefined(authedUser)) {
			this.showNotification('You need to be logged in to answer questions.');
		} else {
			if (alreadyVoted) {
				this.showNotification('You have already voted for this question, try checking your unanswered questions.');
			} else {
				this.props.dispatch( handleAnswerQuestion( {
					qid: question.id,
					answer: option,
					authedUser
				} ) );
			}
		}
	};

	viewQuestion = (id) => () => {
		window.scrollTo(0, 0);
		this.props.history.push(`/question/${id}`);
	};

	render () {
		const { isActive, notificationMessage } = this.state;
		const { question, questions, users, authedUser } = this.props;

		const questionArray = Object.values( questions );
		const sortedQuestions = this.sortArray( questionArray );

		if (isEmpty(question) || isEmpty(users)) {
			return <NotFound />;
		}

		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;

		const optionOneChosen = question.optionOne.votes.includes(authedUser);
		const optionTwoChosen = question.optionTwo.votes.includes(authedUser);

		return (
			<div className="uk-container uk-container-large uk-margin-large-top">
				<div className='uk-card uk-card-default question'>

					<Notification
						isActive={isActive}
						message={notificationMessage}
						action="Dismiss"
						title="Whoops."
						dismissAfter={4000}
						onDismiss={() => this.setState({ isActive: false })}
						onClick={() => this.setState({ isActive: false })}
					/>

					<div className='header'>Would You Rather...</div>
					<div className='options'>
						<div
							className={`option option--one${optionOneChosen ? ' option--selected' : ''}`}
							onClick={this.chooseAnswer('optionOne')}
						>
							<span className='percentage'>{(totalVotes === 0 ? totalVotes : optionOneVotes / totalVotes * 100).toFixed(2)}%</span>
							<span className='count'>{optionOneVotes === 1 ? '1 person' : `${optionOneVotes} people`} chose this option</span>
							<span className='choice'>{question.optionOne.text}</span>
						</div>
						<div className='divider'>or</div>
						<div
							className={`option option--two${optionTwoChosen ? ' option--selected' : ''}`}
							onClick={this.chooseAnswer('optionTwo')}
						>
							<span className='percentage'>{(totalVotes === 0 ? totalVotes : optionTwoVotes / totalVotes * 100).toFixed(2)}%</span>
							<span className='count'>{optionTwoVotes === 1 ? '1 person' : `${optionTwoVotes} people`} chose this option</span>
							<span className='choice'>{question.optionTwo.text}</span>
						</div>
					</div>
				</div>

				<hr className="uk-divider-icon" />

				<div className='uk-child-width-1-2@s uk-grid-match' data-uk-grid>
					<div>
						<div className="uk-card uk-card-default">
							<div className="uk-card-header">
								<div className="uk-grid-small uk-flex-middle" data-uk-grid>
									<div className="uk-width-auto">
										<img className="uk-border-circle"
										     width="40"
										     height="40"
										     src={users[question.author].avatarURL}
										     alt={users[question.author].name}
										/>
									</div>
									<div className="uk-width-expand">
										<h3 className="uk-card-title uk-margin-remove-bottom">Written by: {users[question.author].name}</h3>
										<p className="uk-text-meta uk-margin-remove-top">
											<time dateTime="2016-04-01T19:00">{formatDate(question.timestamp)}</time>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="uk-card uk-card-default">
							<div className="uk-card-header">
								<span className='uk-text-lead'>Recent Questions</span>
								<hr />
								{sortedQuestions.slice(0, 5).map((question) => {
									const author = users[question.author];
									return (
										<div key={question.id}>
											<div>By {author.name}.</div>
											<div className='uk-text-large'>{question.optionOne.text} or ...</div>
											<div><button className='uk-button uk-button-link' onClick={this.viewQuestion(question.id)}>View Question</button></div>
											<hr />
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Question.defaultProps = {
	question: {},
	users: []
};

const mapStateToProps = createSelector(
	selectRouterMatch(),
	selectQuestions(),
	selectUsers(),
	selectAuthedUser(),
	(match, questions, users, authedUser) => ({
		question: questions[match.params.id],
		questions,
		users,
		authedUser
	})
);

export default withRouter(connect(mapStateToProps)(Question));