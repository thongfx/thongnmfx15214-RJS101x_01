import React from 'react';
import { Card, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const grossSalary = 3000000;
const overTimeSalary= 200000;

function RenderSalary ({staff}) {
  return (
      <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
          <Card>
            <CardTitle className="m-2">{staff.name}</CardTitle>
            <CardBody>
              <CardText>
                Mã nhân viên: {staff.id}
              </CardText>
              <CardText>
                Hệ số lương: {staff.salaryScale}
              </CardText><CardText>
                Số ngày làm thêm: {staff.overTime}
              </CardText>
              <CardText className="bg-light p-2 shadow">
              Lương:{" "}
              {(staff.salaryScale * grossSalary  + staff.overTime * overTimeSalary).toFixed(0)}
            </CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    );
}


const Salary = (props) => {
  const Totalsalary = props.staffs.staffs.map((staff) => {
        return (
        <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={staff.id}>
            <RenderSalary staff={staff}/>
        </div>
        );
  });
  
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{this.props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.staffs != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/Nhanvien">Nhân Viên</Link></BreadcrumbItem>
            <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Stagger in>
          <Fade in>
            <div className="row">
              {Totalsalary}
            </div>
          </Fade>
        </Stagger>
      </div>
    );
  }
}

export default Salary;