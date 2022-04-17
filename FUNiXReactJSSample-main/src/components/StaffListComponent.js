import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    }
    
  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className={"col-12 col-md-6 col-lg-4 mt-3 "}>
          <Card key={staff.id}>
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
            <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
