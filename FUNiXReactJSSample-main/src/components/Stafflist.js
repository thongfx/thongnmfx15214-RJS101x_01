import React, {Component} from 'react';
import {
    Card, CardImg, CardTitle, Form, FormGroup, FormFeedback, Label,
    Button, Input, Col, Modal, ModalBody, ModalHeader, 
} from "reactstrap";
import { Link } from 'react-router-dom';

class Stafflist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            doB: "",
            startDate: "",
            department: "",
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0,
            salary: 3000,
            findStaff: "",
            isModalOpen: false,
            touched: {
                name: false,
                doB: false,
                department: false,
                startDate: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
            }
        }

        
        this.handlefindStaff = this.handlefindStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleNewstaff = this.handleNewstaff.bind(this);
        this.handleNewstaffChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(
            this.state = {
                [name]: value
            });
    }

    handleNewstaff(event) {
        event.preventDefault();
        alert('Current State is: ' + JSON.stringify(this.state));
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: '/assets/images/alberto.png',
        };

        this.props.onAdd(newStaff);
    } 

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate(name, doB, startDate, salaryScale, annualLeave, overTime) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            department: '',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
        };
        
        if (this.state.touched.name && name.length < 1)
            errors.name = 'Yêu cầu nhập';
        else if (this.state.touched.name && name.length < 2)
            errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Tên nhân viên phải ít hơn 30 ký tự';

        if (this.state.touched.doB && doB.length < 1)
            errors.doB = 'Yêu cầu nhập';
        
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Yêu cầu nhập';
        
        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = '1.0 -> 3.0';
        
        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = 'Yêu cầu nhập';
        
        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime = 'Yêu cầu nhập';
        
        return errors;

    }
    
    render() {
        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate, this.state.salaryScale, this.state.annualLeave, this.state.overTime);
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
                                <Button onClick={this.toggleModal}>
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
                <hr />
                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleNewstaff}>
                            <FormGroup row>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type="text" id="name" name="name" 
                                        placeholder="Tên Nhân Viên"
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB" 
                                        value={this.state.doB}
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate" 
                                        value={this.state.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input type="select" id="department" name="department" 
                                        value={this.state.department}
                                        valid={errors.department === ''}
                                        invalid={errors.department !== ''}
                                        onBlur={this.handleBlur('department')}
                                        onChange={this.handleNewstaffChange}>
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="number" step="0.1" min="1" max="3" id="salaryScale" name="salaryScale" 
                                        value={this.state.salaryScale}
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        placeholder={errors.salaryScale}
                                        onBlur={this.handleBlur('salaryScale')}
                                        onChange={this.handleNewstaffChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input type="number" min="0" id="annualLeave" name="annualLeave" 
                                        value={this.state.annualLeave}
                                        valid={errors.annualLeave === ''}
                                        invalid={errors.annualLeave !== ''}
                                        onBlur={this.handleBlur('annualLeave')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.annualLeave}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input type="number" min="0" id="overTime" name="overTime" 
                                        value={this.state.overTime}
                                        valid={errors.overTime === ''}
                                        invalid={errors.overTime !== ''}
                                        onBlur={this.handleBlur('overTime')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.overTime}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className='row'>
                    {stafflist}
                </div>
            </div>
        )
    }
}

export default Stafflist;