import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";


// user_email: {
//     type: String,
//     required: true
//     },
// user_id: {
// type: String,
// required: true
// },
// reviewer_id: {
// type: String,
// required: true
// },
//   title: {
//     type: String,
//     required: true
//   },
//   field: {
//     type: String,
//     required: true
//   },
//   notes: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   complete: {
//     type: Boolean,
//     default: false,
//     required: true
//   }
// });

const options = [
    { value: "english", label: "English" },
    { value: "math", label: "Math" },
    { value: "computerscience", label: "Computer Science" }
  ];

class StartReview extends Component{
    constructor() {
        super();
        this.state = {
          user_email: "",
          user_id: "",
          reviewer_id: "",
          title: "",
          field: "",
          notes: "",
          isMounted: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.getData = this.getData.bind(this);
      }
    
      handleChange = field => {
        this.setState({ field: field });
        console.log(`Option selected:`, field);
      };

      componentDidMount() {
        this.setState({ isMounted: true });
        this.getData();
      }
    
      componentWillUnmount() {
        this.state.isMounted = false;
      }

      getData(){
        console.log(this.props.auth.user.id);
        axios.get('/api/users/getdata', {
            params: {
                  _id: this.props.auth.user.id
            },
            responseType: 'json',
        }).then(result => {
            console.log(result);
            this.setState({ user_email: result.data[0].email});
        });
        console.log(this.state);
      }
    
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
        const newReq = {
          user_email: this.state.user_email,
          user_id: this.props.auth.user.id,
          reviewer_id: this.state.reviewer_id,
          title: this.state.title,
          field: this.state.field.value,
          notes: this.state.notes,
        };
        console.log(newReq);
        axios
        .post("/api/reviews/requests", newReq)
        .then(res => null) 
        .catch(err => console.log(err));
        this.props.history.push("/myreviews")
      };
    
      render() {
        if (this.state.isMounted){
        return (
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <Link to="/dashboard" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back to
                  your Dashboard
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Request</b> Review
                  </h4>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.title}
                      id="title"
                      type="text"
                    />
                    <label htmlFor="title">Review Title</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.notes}
                      id="notes"
                      type="text"
                    />
                    <label htmlFor="notes">Notes</label>
                  </div>
                  <label
                    className="col s12"
                    style={{ paddingLeft: "11.250px", marginBottom: "1rem" }}
                    htmlFor="field"
                  >
                    Field
                  </label>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <Select
                      onChange={this.handleChange}
                      value={this.state.field}
                      id="field"
                      options={options}
                    />
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "390px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "7rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
                    }
                    return <h1 className="center">Loading</h1>;
      }
    }

    StartReview.propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
      };
      const mapStateToProps = state => ({
        auth: state.auth
      });
      export default connect(
        mapStateToProps,
        { logoutUser }
      )(withRouter(StartReview));