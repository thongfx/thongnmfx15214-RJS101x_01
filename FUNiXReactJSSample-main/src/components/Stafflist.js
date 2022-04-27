import React, {useState} from 'react';
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';
import { number } from 'prop-types';

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
    const [inputId, setInputId] = useState("");

    let inputHandler = (e) => {
        //input dữ liệu 
        setInputId(e.target.value);
    };

    const filteredData = props.staffs.filter((el) => {
        //Không có dữ liệu trả về stafflist 
        if (inputId === "") {
            return el;
        }
        //Trả về nhân viên có id
        else {
            return el.id === parseInt(inputId);
        }
    }) 


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    <h3>Nhân Viên</h3>
                    <hr />
                </div>
                <div class="form-outline mb-3">
                    <input
                        class="form-control"
                        type="number" min="0"
                        onChange={inputHandler}
                        placeholder="Tìm nhân viên theo Id"
                    />
                </div>
            </div>
            <div className="row">
                {filteredData.map((staff) => (
                    <div className="col-6 col-md-4 col-lg-2 mb-3 " key={staff.id}>
                        <RenderStafflist staff={staff} />
                    </div>))}
            </div>
        </div>
    );
}

export default Stafflist;