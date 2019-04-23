import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./tabs.css";

class Navbar extends Component {
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
                    <Link to="/faq" className="black-text">
                      <h6>F.A.Q</h6>
                    </Link>
                  </li>
                  <li className="tab">
                    <a href="#test2">Test 2</a>
                  </li>
                  <li className="tab">
                    <a href="#test3">Disabled Tab</a>
                  </li>
                  <li className="tab">
                    <a href="#test4">Test 4</a>
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

export default Navbar;
