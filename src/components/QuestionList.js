import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import selectQuestions from '../selectors/questions';
import selectUsers from '../selectors/users';
import QuestionListItem from './QuestionListItem';
import selectAuthedUser from '../selectors/authedUser';

class QuestionList extends Component {

	state = {
		activeTab: 'unanswered'
	};

	handleTabChange = (a, b) => {
		this.setState(() => ({
			activeTab: b
		}));
	};

	render() {
		const { questions, users, authedUser } = this.props;
		const { activeTab } = this.state;
		return (
			<div className='question-list'>
				<ul className='uk-flex-center' data-uk-tab>
					<li className={activeTab === 'unanswered' ? 'uk-active' : undefined}>
						<button
							className='uk-button uk-button-link'
							onClick={() => this.handleTabChange( this, 'unanswered' ) }
						>
							Unanswered Questions
						</button>
					</li>
					<li className={activeTab === 'answered' ? 'uk-active' : undefined}>
						<button
							className='uk-button uk-button-link'
							onClick={() => this.handleTabChange( this, 'answered' ) }
						>
							Answered Questions
						</button>
					</li>
				</ul>
				<div className='question-list__tab' style={{display: (activeTab === 'answered' ? 'block' : 'none')}}>
					<div className='uk-child-width-1-2@s uk-grid-match' data-uk-grid>
						{!isEmpty(questions) && !isEmpty(users) &&
							Object.keys(questions).filter((key) => {
								const votes = questions[key].optionOne.votes.concat(questions[key].optionTwo.votes);
								return votes.includes(authedUser)
							}).sort((a, b) => questions[b].timestamp - questions[a].timestamp).map((key) => {
								const question = questions[key];
								const author = users[question.author];
								return (
									<QuestionListItem
										key={question.id}
										question={question}
										author={author}
									/>
								)
							})
						}
					</div>
				</div>
				<div className='question-list__tab' style={{display: (activeTab === 'unanswered' ? 'block' : 'none')}}>
					<div className='uk-child-width-1-2@s uk-grid-match' data-uk-grid>
						{!isEmpty(questions) && !isEmpty(users) &&
							Object.keys(questions).filter((key) => {
								const votes = questions[key].optionOne.votes.concat(questions[key].optionTwo.votes);
								return !votes.includes(authedUser)
							}).sort((a, b) => questions[b].timestamp - questions[a].timestamp).map((key) => {
								const question = questions[key];
								const author = users[question.author];
								return (
									<QuestionListItem
										key={question.id}
										question={question}
										author={author}
									/>
								)
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createSelector(
	selectQuestions(),
	selectUsers(),
	selectAuthedUser(),
	(questions, users, authedUser) => ({
		questions,
		users,
		authedUser
	})
);

export default compose(
	withRouter,
	connect(mapStateToProps)
)(QuestionList);