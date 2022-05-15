import React, {Component} from 'react';
import {
    Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader,
    Label, Col, Row, Card, CardBody, CardImg, CardTitle, CardText
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    return(
        <div>
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />                    
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        );

}

function RenderComments({comments}) {
    if (comments != null)
        return(
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <div in key={comment._id}>
                                    <li>
                                    <p>{comment.comment}</p>
                                    <p>{comment.rating} stars</p>
                                    </li>
                                </div>
                            );
                        })}
                </ul>
            </div>
        );
    else
        return(
            <div></div>
        );
}
 
class DishDetail extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isModalopen: false,
            name: '',
            doB: '',
            salaryScale: ''
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleNewstaff = this.handleNewstaff.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalopen: !this.state.isModalopen,
        });
    }

    handleNewstaff(values) {
        this.setState({
            ame: values.name,
            doB: values.doB,
            salaryScale: values.salaryScale
        });
        alert('Current State is: ' + JSON.stringify(values));
    } 

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        if (this.props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>        
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                            <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments} />
                        <Button onClick={this.toggleModal}>
                            submit comment
                        </Button>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalopen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleNewstaff(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select type='number' model=".rating" id="rating" name="rating" 
                                        className='form-control' 
                                        validators={{
                                        required,
                                    }}
                                    >
                                        <option >---Rating---</option>
                                        <option >1</option>
                                        <option >2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".name" id="name" name="name" 
                                    placeholder="Your name"
                                    className='form-control'
                                    defaultValue=''
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>    
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                        className='form-control'
                                        defaultValue=''
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            );
        else
            return (
                <div></div>
            );  
 }
    
}

export default DishDetail;