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

class Dashboard2 extends Component {
  constructor() {
    super();
    this.state = {
      requests: [
        {
          _id: "",
          name: "",
          email: "",
          password: "",
          reviewer: ""
        }
      ]
    };
    this.renderTableBody = this.renderTableBody.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("/api/users/getdata", {
        // params: {
        //   _id: this.props.auth.user.id
        // },
        responseType: "json"
      })
      .then(res => {
        console.log(res.data);
        this.setState({ requests: res.data });
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
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
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Account Type</th>
                </tr>
              </thead>
              <tbody>{this.renderTableBody()}</tbody>
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

  renderTableBody() {
    let rows = [];
    let self = this;
    this.state.requests.map((row, idx) => {
      rows.push(
        <tr>
          <td>{idx + 1}.</td>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>{row.reviewer}</td>
        </tr>
      );
    });

    return rows;
  }
}

Dashboard2.propTypes = {
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
)(Dashboard2);
