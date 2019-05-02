import React, { Component } from "react";
import "./faq.css";

class FAQ extends Component {
  render() {
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper" id="pushDown">
          <div className="row">
            <div className="col s12 center-align">
              <h3>FAQ </h3>
              <p className="flow-text grey-text text-darken-1">
                Get connect today and start standing out!
              </p>

              <div className="panel-group" id="accordion">
                <div className="faqHeader"><h3>General questions</h3></div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                      >
                        Is account registration required?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseOne" className="panel-collapse collapse in">
                    <div className="panel-body">
                      Account registration at <strong>ReviewMe</strong> is
                      required as we need to facilitate communication between a
                      student and a reviewer.
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                      >
                        What is the currency used for all transactions?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseEleven" className="panel-collapse collapse">
                    <div className="panel-body">
                      There is no cost for work needing to be reviewed at{" "}
                      <strong>ReviewMe</strong>. ReviewMe is completely free for
                      students during this beta period!
                    </div>
                  </div>
                </div>

                <div className="faqHeader"><h3>Students</h3></div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseTwo"
                      >
                        Who can become a student?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseTwo" className="panel-collapse collapse">
                    <div className="panel-body">
                      Anyone registered as a student and needs a piece of work
                      reviewed, can post it on <strong>ReviewMe</strong>.
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseThree"
                      >
                        I want my work to be reviewed - what are the steps?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseThree" className="panel-collapse collapse">
                    <div className="panel-body">
                      The steps involved in this process are really simple. All
                      you need to do is:
                      <ul>
                        <li>Register as a student.</li>
                        <li>Sign in to your account.</li>
                        <li>
                          Go to the <strong>Start Review</strong> section and make a
                          post of what you need reviewed.
                        </li>
                        <li>
                          Shortly after a reviewer will select your project and you'll
                          be emailed instructions.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseSix"
                      >
                        Why have my work reviewed here?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseSix" className="panel-collapse collapse">
                    <div className="panel-body">
                      There are a number of reasons why you should join us:
                      <ul>
                        <li>
                          All of our reviewers have a background in education.
                        </li>
                        <li>
                          Fast response and we're open 24/7. Most sites just accept payment and
                          do the work for you, but you don't learn anything!
                          At <strong>ReviewMe</strong>, we want to help you... not do it for you.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="faqHeader"><h3>Reviewers</h3></div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseFour"
                      >
                        I want to become a reviewer - what are the steps?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseFour" className="panel-collapse collapse">
                    <div className="panel-body">
                      Becoming a reviewer on <strong>ReviewMe</strong> is really
                      simple. First you register an account as a reviewer. Once you have
                      registered, our <strong>ReviewMe</strong> team will
                      contact you for a resume and examine your qualifications, then
                      approve your account if you seem like a good fit.
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2 className="panel-title">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseSeven"
                      >
                        Can a reviewer earn money from <strong>ReviewMe</strong>
                        ?
                      </a>
                    </h2>
                  </div>
                  <div id="collapseSeven" className="panel-collapse collapse">
                    <div className="panel-body">
                      Currently, no. In the future, reviewers will earn money
                      from advertisement revenue, as well as student donations.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
    );
  }
}
export default FAQ;
