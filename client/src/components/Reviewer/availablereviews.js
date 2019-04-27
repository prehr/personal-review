import React, { Component } from "react";
import PropTypes from "prop-types";
import { /*Link,*/ withRouter } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Select from "react-select";
import axios from "axios";

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

class AvailableReviews extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
        this.renderTableBody = this.renderTableBody.bind(this);
        this.onCompleteChange = this.onCompleteChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    handleChange = newField => {
        this.setState(initialState);
        display = newField.value;
        this.getDataByField();
        this.renderTableBody();
    };

    getData(){
        axios.get('/api/reviews/available', {
            responseType: 'json',
        }).then(result => {
            this.setState({ requests: result.data });
        });
    }

    getDataByField(){
        axios.get('/api/reviews/byfield', {
            responseType: 'json',
            params: {
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
            <table className="table table-striped center">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Field</th>
                        <th>Notes</th>
                        <th>Created On</th>
                        <th>Completed</th>
                        <th>Select</th>
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
                    <td>
                     <button
                    style={{
                      width: "1px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: ".03rem",
                      zIndex: 0
                    }} type="button" id={ row._id } 
                        onClick={ self.onCompleteChange }
                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                        />
                    </td>
                </tr>
            );
        });

        return rows;
    }

    onCompleteChange(e){
        var txt = "";
        if (window.confirm("Are you sure? This action can NOT be undone!")) {
            txt = "Yes";
          } else {
            txt = "No";
          }
          if(txt === "Yes"){
          const payload = {  reviewer_id: this.props.auth.user.id };
          axios.put('/api/reviews/select/' + e.target.id, payload, {responseType: 'json'})
          .then(this.props.history.push("/activereviews"));
          }
    }

}

AvailableReviews.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(AvailableReviews));