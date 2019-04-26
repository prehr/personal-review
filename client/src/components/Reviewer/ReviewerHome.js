import React, { Component } from "react";
import PropTypes from "prop-types";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";

class ReviewerHome extends Component {
  constructor() {
    super();
    this.state = {
      requests: {
        _id: "",
        name: "",
        email: "",
        password: "",
        reviewer: "",
        isMounted: false
      }
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  componentWillUpdate() {
    if (this.state.requests.reviewer === "student") {
      this.props.history.push("/studenthome");
    }
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
        if (this.state.isMounted) {
          this.setState({ requests: res.data[0] });
        }
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  activeReviews = e => {
    e.preventDefault();
    this.props.history.push("/activereviews");

  };

  availableReviews = e => {
    e.preventDefault();
    this.props.history.push("/availablereviews");

  };
  render() {
    const { user } = this.props.auth;
    if (this.state.isMounted && this.state.requests.reviewer !== "reviewer") {
      this.getData();
    }
    if (this.state.requests.reviewer === "reviewer") {
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

              {/*David Adding new */}
              <br></br>
              <button
                    style={{
                      width: "250px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    onClick={this.availableReviews}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Available Reviews
                </button> 
                <br></br>
                <button
                    style={{
                      width: "250px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    onClick={this.activeReviews}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Active Reviews
                  </button> 
              {/* */}
            </div>
          </div>
        </div>
      );
    }
    return <h1 className="center">Loading</h1>;
  }
}
ReviewerHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(ReviewerHome));
