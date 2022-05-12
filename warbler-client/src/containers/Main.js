// responsible for routing logic
import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Homepage from '../components/Homepage';
import { authUser } from '../store/actions/auth';

const Main = (props) => {
	// const navigate = useNavigate();
	const { authUser } = props;
	return (
		<div className="container">
			<Routes>
				<Route exact path="/" element={<Homepage {...props} />}></Route>
				<Route
					exact
					path="/signin"
					element={
						<AuthForm
							onAuth={authUser}
							buttonText="Log In"
							heading="Welcome back."
							{...props}
						/>
					}
				></Route>
				<Route
					exact
					path="/signup"
					element={
						<AuthForm
							onAuth={authUser}
							buttonText="Sign Up"
							heading="Join Warbler today."
							signUp
							{...props}
						/>
					}
				></Route>
			</Routes>
		</div>
	);
};

// used for selecting the part of the data from the store that the connected component needs
function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, { authUser })(Main);
