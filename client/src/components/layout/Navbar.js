import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./tabs.css";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    if(this.props){
    this.props.logoutUser();
    }
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div className="navbar-fixed">
              <nav className="z-depth-0 right">
                <div className="nav-wrapper white">
                  <Link to="/" className="col s5 brand-logo center black-text">
                    <i className="material-icons">assignment_turned_in</i>
                    <b>Review</b>Me.
                  </Link>
                </div>
              </nav>
            </div>
          </div>
          <nav className="nav-extended white">
            <div className="nav-content">
              <div id="tabs">
                <ul className="tabs tabs-transparent white lighten-4">
                  <li className="tab">
                    <Link to="/dashboard" className="black-text">
                      Dashboard
                    </Link>
                  </li>
                  <li className="tab">
                    <Link to="/FAQ" className="black-text">
                      F.A.Q.
                    </Link>
                  </li>
                  <li className="tab">
                    <Link to="/contactus" className="black-text">
                      Contact Us
                    </Link>
                  </li>
                  <li className="tab">
                    <Link to="/" className="black-text" onClick={this.onLogoutClick}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
