import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Login from "../../components/auth/Login";
import axios from "axios";

//import StudentHome from "../../components/Student/StudentHome";
//import ReviewerHome from "../../components/Reviewer/ReviewerHome";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      requests: {
        _id: "",
        name: "",
        email: "",
        password: "",
        reviewer: ""
      }
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("/api/users/getdata", {
        params: {
          _id: this.props.auth.user.id
        },
        responseType: "json"
      })
      .then(res => {
        this.setState({ requests: res.data[0] });
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    if (this.state.requests.reviewer === "student") {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are a student{" "}
                  <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
              </h4>
              <table className="table table-stripped table-condensed">
                <thead>
                  <tr>
                    <th>{this.state.requests.reviewer}</th>
                  </tr>
                </thead>
              </table>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are a reviewer{" "}
                  <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
              </h4>
              <table className="table table-stripped table-condensed">
                <thead>
                  <tr>
                    <th>{this.state.requests.reviewer}</th>
                  </tr>
                </thead>
              </table>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
