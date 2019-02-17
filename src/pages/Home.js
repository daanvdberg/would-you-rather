import React from 'react';
import QuestionList from '../components/QuestionList';

const Home = () => {
	return (
		<div className='page-home'>
			<div className="uk-container uk-container-small uk-margin-large-top">
				<QuestionList />
			</div>
		</div>
	);
};

export default Home;