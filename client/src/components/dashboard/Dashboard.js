import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { BrowserRouter as Route } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
//import Login from "../../components/auth/Login";
import axios from "axios";

//import StudentHome from "../../components/Student/StudentHome";
//import ReviewerHome from "../../components/Reviewer/ReviewerHome";

class Dashboard extends Component {
  constructor(props) {
    super(props);
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
    if (this.state.requests.reviewer === "reviewer") {
      this.props.history.push("/reviewerhome");
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

  render() {
    if (this.state.isMounted) {
      this.getData();
    }
    return <h1 className="center">Loading</h1>;
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
)(withRouter(Dashboard));
