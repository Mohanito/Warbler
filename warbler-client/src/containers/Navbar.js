import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						Warbler
					</Link>
					<ul className="nav navbar-nav navbar-right">
						<li>
							<Link to="/signup">Sign Up</Link>
						</li>
						<li>
							<Link to="/signin">Log In</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

// used for selecting the part of the data from the store that the connected component needs
function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, null)(Navbar);
