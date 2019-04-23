import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Login from "../../components/auth/Login";
//import StudentHome from "../../components/Student/StudentHome";
//import ReviewerHome from "../../components/Reviewer/ReviewerHome";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    const { user } = this.props.auth;
    //console.log(this.props.getUser(this.props.auth.id));
    if (user.find === "student") {
      return <Redirect to="/studenthome" /*component={StudentHome}*/ />;
    } else if (user.reviewer === "reviewer") {
      return <Redirect to="/reviewerhome" /*component={ReviewerHome}*/ />;
    }
    return (
      <div>
        App wrapper
        <Route path="/login" component={Login} />
      </div>
    );
  }
}
//     const { user } = this.props.auth;
//     return (
//       <div style={{ height: "75vh" }} className="container valign-wrapper">
//         <div className="row">
//           <div className="col s12 center-align">
//             <h4>
//               <b>Hey there,</b> {user.name.split(" ")[0]}
//               <p className="flow-text grey-text text-darken-1">
//                 You are a student{" "}
//                 <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
//               </p>
//             </h4>
//             <button
//               style={{
//                 width: "150px",
//                 borderRadius: "3px",
//                 letterSpacing: "1.5px",
//                 marginTop: "1rem"
//               }}
//               onClick={this.onLogoutClick}
//               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
