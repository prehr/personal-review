//https://github.com/prehr/personal-review.git
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FAQ from "./components/pages/FAQ";
import ThankYou from "./components/pages/ThankYou";
import ContactUs from "./components/pages/contact/ContactUs";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import StudentHome from "./components/Student/StudentHome";
import ReviewerHome from "./components/Reviewer/ReviewerHome";

//import student components
// import StartReview from "./components/Student/startreview";
// import MyReviews from "./components/Student/myreviews";
// import AvailableReviews from "./components/Reviewer/availablereviews";
// import ActiveReviews from "./components/Reviewer/activereviews";

import StartReview from "./components/Student/startreview";
import MyReviews from "./components/Student/myreviews";
import AvailableReviews from "./components/Reviewer/availablereviews";
import ActiveReviews from "./components/Reviewer/activereviews";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/thankyou" component={ThankYou} />
            {/*David adding new */}
            {/* <Route exact path="/startreview" component ={StartReview}/>
            <Route exact path ="/myreviews" component={MyReviews}/>
            <Route exact path ="/activereviews" component={ActiveReviews}/>
            <Route exact path ="/availablereviews" component={AvailableReviews}/> */}
            {/* */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/studenthome" component={StudentHome} />
              <PrivateRoute
                exact
                path="/reviewerhome"
                component={ReviewerHome}
              />
              <PrivateRoute exact path="/startreview" component ={StartReview}/>
            <PrivateRoute exact path ="/myreviews" component={MyReviews}/>
            <PrivateRoute exact path ="/activereviews" component={ActiveReviews}/>
            <PrivateRoute exact path ="/availablereviews" component={AvailableReviews}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
