import React, { Component } from "react";
import "./faq.css";
import "../../../bootstrap/bootstrap.css";
class FAQ extends Component {
  render() {
    return (
       
      <div style={{ height: "75vh" }} className="container valign-wrapper" id="pushDown">
        <div className="row">
          <div className="col s12 center-align">
            <h4>FAQ </h4>
            <p className="flow-text grey-text text-darken-1">
              Get connect today and start standing out!
            </p>

    <div className="panel-group" id="accordion">
        <div className="faqHeader">General questions</div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Is account registration required?</a>
                </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse in">
                <div className="panel-body">
                    Account registration at <strong>ReviewMe</strong> is only required if you will be joining the application as a student or a reviewer. 
                    This ensures a valid communication channel for all parties involved in any transactions. 
                </div>
            </div>
        </div>
      
        <div className="panel panel-default">
            <div classname="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEleven">What is the currency used for all transactions?</a>
                </h4>
            </div>
            <div id="collapseEleven" className="panel-collapse collapse">
                <div className="panel-body">
                    There is no cost for work needing to be reviewed at <strong>ReviewMe</strong>. ReviewMe is completely free for students!
                </div>
            </div>
        </div>

        <div className="faqHeader">Students</div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Who can become a student?</a>
                </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
                <div className="panel-body">
                    Any registed user, who presents a work in need of reviewing, can post it on <strong>ReviewMe</strong>.
                </div>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">I want my work to be reviewed - what are the steps?</a>
                </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
                <div className="panel-body">
                    The steps involved in this process are really simple. All you need to do is:
                    <ul>
                        <li>Register an account</li>
                        <li>Sign in to your account</li>
                        <li>Go to the <strong>Upload</strong> section and email the reviewer you wish to have review your work</li>
                        <li>The next step is the approval step, which usually takes up to 72 hours.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix">Why have my work reviewed here?</a>
                </h4>
            </div>
            <div id="collapseSix" className="panel-collapse collapse">
                <div className="panel-body">
                    There are a number of reasons why you should join us:
                    <ul>
                        <li>All of our reviewers have a background in education.</li>
                        <li>Fast response/approval times. Many sites take several days to review an assignment. For us, it only takes up to 72 hours for a template/theme to get reviewed.</li>
                        <li>You can have your work reviewed by our reviewers here on <strong>ReviewMe</strong> for free!</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="faqHeader">Reviewers</div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">I want to become a reviewer - what are the steps?</a>
                </h4>
            </div>
            <div id="collapseFour" className="panel-collapse collapse">
                <div className="panel-body">
                    Becoming a reviewer on <strong>ReviewMe</strong> is really simple. First you register an account as a reviewer. 
                    While registering, be sure to attach a resume. Once you have registered, our <strong>ReviewMe</strong> team will examine your resume, then contact you in 72 hours or less regarding an interview with us if all goes well. 
                </div>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">Can a reviewer earn money from <strong>ReviewMe</strong>?</a>
                </h4>
            </div>
            <div id="collapseSeven" className="panel-collapse collapse">
                <div className="panel-body">
                    Currently, no. In the future, reviewers will earn money from advertisement revenue, as well as student donations.
                </div>
            </div>
        </div>
    </div>
</div>


            <br />
          </div>
        </div>
    )

  }
}
export default FAQ;
