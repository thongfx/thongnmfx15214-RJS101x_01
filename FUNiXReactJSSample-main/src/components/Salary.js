import React from 'react';
import { Card, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

const grossSalary = 3000000;
const overTimeSalary= 200000;

function RenderSalary ({staff}) {
    return (
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
    );
}


const Salary = (props) => {
  const Totalsalary = props.staffs.map((staff) => {
        return (
        <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={staff.id}>
            <RenderSalary staff={staff}/>
        </div>
        );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/Nhanvien">Nhân Viên</Link></BreadcrumbItem>
              <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb> 
        </div>
        <div className="row">
            {Totalsalary}
        </div>
      </div>
    );
}

export default Salary;