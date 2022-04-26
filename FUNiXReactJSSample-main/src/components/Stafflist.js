import React from 'react';
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderStafflist({staff}) {
    return (
        <Link to={`/Nhanvien/${staff.id}`}>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <Card>
                <CardTitle className='text-center'>{staff.name}</CardTitle>
            </Card>
        </Link>
    )
}

const Stafflist = (props) => {
    const stafflist = props.staffs.map((staff) => {
      return (
        <div className="col-6 col-md-4 col-lg-2 mb-3 " key={staff.id}>
            <RenderStafflist staff={staff}/>
        </div>
      );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
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