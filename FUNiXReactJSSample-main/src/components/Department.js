import React from 'react';
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Loading } from './LoadingComponent'
import { Link } from 'react-router-dom';

function RenderDept (props) {
  return (
    <div>
      <Link to={`/Phongban/${props.dept.id}`}>
        <Card>
          <CardTitle className="m-2">{props.dept.name}</CardTitle>
          <CardBody>
            <CardText>
              Số lượng nhân viên: {props.dept.numberOfStaff}
            </CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
      
      
    );
  }

const Department = (props) => {
  const department = props.department.department.map((department) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
        <RenderDept dept={department} />
      </div>
    );
  });

  if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{this.props.errMess}</h4>
              </div>
          </div>
      );
  }
  else 
  return (
    <div className="container">
      <div className="row shadow m-3">{department}</div>
    </div>
  );
}

export default Department;
