import React from 'react';
import { Card, CardBody, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderStafflist({staff}) {
    return (
        <Link to={`/menu/${staff.id}`}>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <Card>
                <CardBody>
                    <CardTitle >{staff.name}</CardTitle>
                </CardBody>
            </Card>
        </Link>
    )
}

const Stafflist = (props) => {
    const stafflist = props.staffs.map((staff) => {
      return (
        <div className="col-6 col-md-4 col-lg-2" key={staff.id}>
            <RenderStafflist staff={staff}/>
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