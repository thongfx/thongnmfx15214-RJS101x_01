import React from 'react';
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function RenderStaffdetail({ staff }) {
        return (
            <div className="col-12 mb-3">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3 ">
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 ">
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>
                            Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>
                            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>Phòng ban: {staff.department&&staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </div>
                </div>
            </div>
        )
}

const Staffdetail = (props) => {
    if (props.staff != null ) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/Nhanvien">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>
                </div>
                <div>                
                    <RenderStaffdetail staff={props.staff} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        ); 
    }
}

export default Staffdetail;