import React from 'react';
import {Card, CardImg, CardTitle, Breadcrumb,BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';

const Departmentdetail = (props) => {
    const deptid = props.department.id;
    const deptlist = props.staffs
            .filter((staff) => staff.departmentId === deptid )
            .map((staff) => {
            return (
                <div className="col-6 col-md-4 col-lg-2 mb-3">
                    <Link to={`/Nhanvien/${staff.id}`}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <Card>
                            <CardTitle className='text-center'>{staff.name}</CardTitle>
                        </Card>
                    </Link>
                </div>
            )
            });
    
        return (
            <div className="container">
                <Breadcrumb className='col-3'>
                    <BreadcrumbItem><Link to="/Phongban/">Phòng ban</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='row'>{deptlist}</div>
            </div>
        );
}

export default Departmentdetail;