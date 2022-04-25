import React from 'react';
import { Card, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderStafflist({staffs}) {
    return (
    <Card key={staffs.id}>
        <CardBody>
            <CardTitle >{staffs.name}</CardTitle>
        </CardBody>
    </Card>
    )
}
const Stafflist = (props) => {
    const stafflist = props.staffs.map((staff) => {
      return (
        <div>
            <RenderStafflist staffs={staffs}/>
        </div>
      );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Nhân Viên</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {stafflist}
            </div>
        </div>
    );

}

export default Stafflist;