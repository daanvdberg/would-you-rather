import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

const QuestionListItem = ({ question, author }) => {
	const voteCount = question.optionOne.votes.length + question.optionTwo.votes.length;
	return (
		<div className='question-list__item'>
			<div className="uk-card uk-card-default">
				<div className="uk-card-header">
					<div className="uk-grid-small uk-flex-middle" data-uk-grid>
						<div className="uk-width-auto">
							<img className="uk-border-circle"
							     width="40"
							     height="40"
							     src={author.avatarURL}
							     alt={author.name}
							/>
						</div>
						<div className="uk-width-expand">
							<h3 className="uk-card-title uk-margin-remove-bottom">Written by: {author.name}</h3>
							<p className="uk-text-meta uk-margin-remove-top">
								<time dateTime="2016-04-01T19:00">{formatDate(question.timestamp)}</time>
							</p>
						</div>
					</div>
				</div>
				<div className="uk-card-body">
					<p>{question.optionOne.text} ... or ...</p>
				</div>
				<div className="uk-card-footer">
					<Link className="uk-button uk-button-text" to={`questions/${question.id}`}>View Question</Link>
					<span className="uk-label">Answered {voteCount === 1 ? ' Once' : `${voteCount} Times`}</span>
				</div>
			</div>
		</div>
	);
};

QuestionListItem.propTypes = {
	question: PropTypes.object.isRequired,
	author: PropTypes.object.isRequired
};

export default QuestionListItem;