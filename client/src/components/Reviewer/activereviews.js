import React, { Component } from "react";
import PropTypes from "prop-types";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const options = [
    { value: "Algebra", label: "Algebra" },
    { value: "Art", label: "Art" },
    { value: "Astronomy", label: "Astronomy" },
    { value: "Biology", label: "Biology" },
    { value: "Calculus", label: "Calculus" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Chinese", label: "Chinese" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Discrete Mathematics", label: "Discrete Mathematics" },
    { value: "Earth Science", label: "Earth Science" },
    { value: "English", label: "English" },
    { value: "French", label: "French" },
    { value: "Geography", label: "Geography" },
    { value: "Geology", label: "Geology" },
    { value: "German", label: "German" },
    { value: "Physics", label: "Physics" },
    { value: "Psychology", label: "Psychology" },
    { value: "Resume Advice", label: "Resume Advice" },
    { value: "Robotics", label: "Robotics" },
    { value: "Spanish", label: "Spanish" },
    { value: "US History", label: "US History" },
    { value: "World History", label: "World History" },
];

const initialState = {
    requests: [{
        _id: '',
        user_email: '',
        user_id: '',
        reviewer_id: '',
        title: '',
        field: '',
        notes: '',
        date: new Date(),
        complete: false,
        isMounted: false,
    }], 
};

var display = '';

class ActiveReviews extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
        this.renderTableBody = this.renderTableBody.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
        this.getData();
      }
    
      componentWillUnmount() {
        this.state.isMounted = false;
      }

      handleChange = newField => {
        this.setState(initialState);
        display = newField.value;
        this.sortrequests();
        this.renderTableBody();
    };

    getData(){
        axios.get('/api/reviews/requests', {
            responseType: 'json',
            params: {
                reviewer_id: this.props.auth.user.id
          },
        }).then(result => {
            this.setState({ requests: result.data });
        });
    }

    sortrequests(){
        axios.get('/api/reviews/sortreviewers', {
            responseType: 'json',
            params: {
                reviewer_id: this.props.auth.user.id,
                field: display
          },
        }).then(result => {
            this.setState({ requests: result.data });
        });
    }


    render() {
        return (
            <div>
                <div className="col s12" 
                style={{ 
                    paddingLeft: "11.250px", 
                    paddingRight: "11.250px",  
                    paddingTop: "11.250px",
                    zIndex: 1
                    }}>
                        <Select
                            onChange={this.handleChange}
                            value={this.state.field}
                            id="field"
                            options={options}
                        />
            </div>
                <table className = "striped bordered">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Field</th>
                            <th>Notes</th>
                            <th>Created On</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableBody() {
        let rows = [];
        let self = this;
        this.state.requests.map((row, idx) => {
            row.id = 
            rows.push(
                <tr>
                    <td>{idx + 1}.</td>
                    <td>{row.title}</td>
                    <td>{row.field}</td>
                    <td>{row.notes}</td>
                    <td>{new Date(row.date).toLocaleString()}</td>
                    <td>{row.complete ? 'Yes' : 'No'}</td>
                </tr>
            );
        });

        return rows;
    }

}

ActiveReviews.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(ActiveReviews));