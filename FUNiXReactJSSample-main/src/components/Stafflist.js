import React, {Component} from 'react';
import { Card, CardImg, CardTitle, Form, FormGroup, Label, Button, Input, Col } from "reactstrap";
import { Link } from 'react-router-dom';

class Stafflist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findStaff: "",
        }
     
        this.handlefindStaff = this.handlefindStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);

    }
   
    filterStaff() {
        this.setState({
            findStaff: this.findStaff.value
        });
    }

    handlefindStaff(event) {
        this.filterStaff();
        event.preventDefault();
    }
    
    render() {
        const stafflist = this.props.staffs
            .filter((staff) => {
                if (this.state.findStaff === "") {
                    return staff;
                }
                else if (staff.name.toLowerCase().includes(this.state.findStaff.toLowerCase())) {
                    return staff;
                } else {
                    return 0;
                }
            } )
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
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                        <div className="row">
                            <div className='col-10 col-md-8'>
                                <h3>Nhân Viên</h3>
                            </div>
                            <div className='col-2 col-md-4'>
                                <Button>
                                    <span className='fa fa-plus fa-lg'></span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 mt-3'>
                        <Form onSubmit={this.handlefindStaff}>
                            <FormGroup row >
                                <div className='col-10 col-md-10'>
                                    <Input type="text" id="findStaff" name="findStaff"
                                        innerRef={(input) => this.findStaff = input} />
                                </div>
                                <div className='col-2 col-md-2'>
                                    <Button type="submit" value="submit" color="primary">Tìm</Button>                                              
                                </div>
                            </FormGroup>    
                        </Form>    
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    {stafflist}
                </div>
            </div>
        )
    }
}

export default Stafflist;