import React, { Component, Fragment } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import selectQuestions from '../selectors/questions';
import selectUsers from '../selectors/users';

class LeaderBoard extends Component {

	sortArray = (array) => array.sort( (a, b) => {
		const lengthA = Object.keys( a.answers ).length + a.questions.length;
		const lengthB = Object.keys( b.answers ).length + b.questions.length;
		return (lengthA < lengthB) ? 1 : ((lengthB < lengthA) ? -1 : 0);
	} );

	render () {
		const { users } = this.props;
		const userArray = this.sortArray( Object.values( users ) );
		const maxCount = Object.keys( userArray[0].answers ).length + userArray[0].questions.length;
		return (
			<div className='leader-board'>
				<div className='uk-container uk-container-large uk-margin-large-top'>
					Leader Board

					<hr />

					{ userArray.length > 0 && userArray.map( (user, i) => {
						const count = Object.keys( user.answers ).length + user.questions.length;
						return (
							<Fragment key={ user.id }>
								<div className='leader-board-item uk-child-width-expand@s' data-uk-grid>
									<div className='uk-width-1-4'>
										<img className='uk-border-circle'
										     width='40'
										     height='40'
										     src={ user.avatarURL }
										     alt={ user.name }
										/>
										{ user.name }
										{ i === 0 &&
											<span className='award uk-label uk-label-success'>
												<span data-uk-icon='icon: bookmark' /> 1st
											</span>
										}
									</div>
									<div className='stats uk-width-1-4'>
										<span>... has answered <b>{ Object.keys( user.answers ).length }</b> questions</span>
										<span>... has submitted <b>{ user.questions.length }</b> questions</span>
									</div>
									<div>
										<progress className='uk-progress' value={ count } max={ maxCount } />
									</div>
									<div className='uk-width-auto'>
										<span className='uk-label'>{ count } points</span>
									</div>
								</div>
								<hr />
							</Fragment>
						);
					} ) }
				</div>
			</div>
		);
	};
}

const mapStateToProps = createSelector(
	selectQuestions(),
	selectUsers(),
	(questions, users) => ({
		questions,
		users
	})
);

export default connect( mapStateToProps )( LeaderBoard );