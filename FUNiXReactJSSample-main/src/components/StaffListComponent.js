import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectstaff: null,
            columnDefaut: "col-12 col-md-6 col-lg-4 mt-3",
        };
    }
    staffselect(staff) {
        this.setState({
            selectstaff: staff
        });
    }
    changecolumn(col) {
        this.setState({
            columnDefaut: col
        });
    }
    renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-6">
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
    }
    render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
          <div className={this.state.columnDefaut} onClick={() => { this.staffselect(staff) }}>
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
            <div>
                <button
                    className="btn btn-primary mr-3 mt-3"
                    onClick={() => this.changecolumn("col-md-12 mt-2")}
                >
                    1 cột
                </button>
                <button
                    className="btn btn-primary mr-3 mt-3"
                    onClick={() => this.changecolumn("col-md-6 mt-2")}
                >
                    2 cột 
                </button>
                <button
                    className="btn btn-primary mr-3 mt-3"                
                    onClick={() => this.changecolumn("col-md-4 mt-2")}
                >
                    3 cột
                </button>
                <button
                    className="btn btn-primary mr-3 mt-3"
                    onClick={() => this.changecolumn("col-md-3 mt-2")}                    
                >
                    4 cột
                </button>
                <button
                    className="btn btn-primary mr-3 mt-3"                
                    onClick={() => this.changecolumn("col-md-2 mt-2")}
                >
                    6 cột
                </button>
            </div>
            <div className="row">{staffList}</div>
            <div className="row mt-5">
                {this.renderStaff(this.state.selectstaff)}
            </div>
      </div>
    );
  }
}

export default StaffList;
