import React, {Component} from 'react';
import {
    Card, CardImg, CardTitle, Label,
    Button, Input, Col, Modal, ModalBody, ModalHeader, Form, FormGroup,Row
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class Stafflist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: this.props.staffs.staffs,
            findStaff: "",
            isModalOpen: false,
        }

        this.handlefindStaff = this.handlefindStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleNewstaff = this.handleNewstaff.bind(this);
    }
    
    filterStaff() {
        console.log('finstaff', this.findStaff.value)
        this.setState({
            findStaff: this.findStaff.value
        });
    }

    handlefindStaff(event) {
        this.filterStaff();
        event.preventDefault();
    }

    toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    }

    handleNewstaff(values) {
        this.toggleModal();
        this.props.postStaff(values.name, values.doB, values.salaryScale, values.startDate, values.departmentId, values.annualLeave, values.overTime);
    }

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        const stafflist = this.state.staffs
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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Link to={`/Nhanvien/${staff.id}`}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <Card>
                            <CardTitle className='text-center'>{staff.name}</CardTitle>
                        </Card>
                    </Link>
            </FadeTransform>
                </div>
            )
            });
        
        if (this.props.staffs.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else {
            return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                        <div className="row">
                            <div className='col-10 col-md-8'>
                                <h3>Nhân Viên</h3>
                            </div>
                            <div className='col-2 col-md-4'>
                                <Button onClick={this.toggleModal}>
                                    <span className='fa fa-plus fa-lg'>
                                    </span>
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
                <hr />
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleNewstaff(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name" name="name" 
                                        placeholder="Tên Nhân Viên"
                                        className='form-control'
                                        defaultValue=''
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập ',
                                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                            maxLength: 'Tên nhân viên phải ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Control type='date' model=".doB" id="doB" name="doB" 
                                        className='form-control'
                                        defaultValue=''
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập ',
                                        }}
                                    />   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Control type='date' model=".startDate" id="startDate" name="startDate" 
                                        className='form-control'
                                        defaultValue=''
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập ',
                                        }}
                                    />   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="departmentId" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Control.select model=".departmentId" id="departmentId" name="departmentId" 
                                        className='form-control'>
                                            <option value="">---Chọn phòng ban---</option>
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Control type='number' min="1" max="3" step="0.1" model=".salaryScale" id="salaryScale" name="salaryScale" 
                                        defaultValue='1'
                                        className='form-control'
                                        validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".salaryScale"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập ',
                                            }}
                                        />      
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control type='number' min="0" model=".annualLeave" id="annualLeave" name="annualLeave" 
                                        className='form-control'
                                        defaultValue='0'
                                        validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".annualLeave"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập ',
                                            }}
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control type='number' min="0" model=".overTime" id="overTime" name="overTime" 
                                        className='form-control'
                                        defaultValue='0'
                                        validators={{
                                                    required
                                                }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".overTime"
                                            show="touched"
                                            messages={{
                                                required: 'Yêu cầu nhập ',
                                            }}
                                        /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Stagger in>
                    <Fade in>
                        <div className='row'>
                            {stafflist}
                        </div>
                    </Fade>
                </Stagger>
            </div>
        )
        }
    }
}

export default Stafflist;