import React, { Component } from "react";
import PropTypes from "prop-types";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const options = [
    { value: "English", label: "English" },
    { value: "Math", label: "Math" },
    { value: "Computer Science", label: "Computer Science" }
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
        if(this.state.isMounted){
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
                <table class = "striped bordered">
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
        return <h1 className="center">Loading</h1>;
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