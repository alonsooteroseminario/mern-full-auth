import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBucket } from "../../actions/forgeManagementActions";

// Delete this component and functionality, Create three buckets and keep those forever, create new api
export class CreateBucket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bucketKey: "",
      policyKey: "transient"
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { bucketKey, policyKey } = this.state;

    this.props.createBucket(bucketKey, policyKey, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className=" my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Create a bucket</h5>
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="form-label-group text-left">
                    <label htmlFor="bucketKey"> Bucket Key </label>
                    <input
                      type="text"
                      id="bucketKey"
                      className="form-control"
                      placeholder="Bucket Key"
                      required
                      autoFocus
                      name="bucketKey"
                      value={this.state.bucketKey}
                      onChange={this.handleChange}
                    />
                  </div>
                  <br />
                  {/* <div className="form-label-group text-left">
                    <label htmlFor="policyKey">Policy Key</label>
                    <select
                      className="form-control form-control-lg"
                      name="policyKey"
                      value={this.state.policyKey}
                      onChange={this.handleChange}
                      id="policyKey"
                    >
                      <option value="transient"> transient </option>
                      <option value="temporary"> temporary </option>
                      <option value="persistent"> persistent </option>
                    </select>
                  </div> */}

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBucket.propTypes = {
  createBucket: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBucket }
)(CreateBucket);
