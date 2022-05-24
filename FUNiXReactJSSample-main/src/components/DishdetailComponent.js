import React, {Component} from 'react';
import {
    Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader,
    Label, Col, Row, Card, CardBody, CardImg, CardTitle, CardText
} from "reactstrap";
import { Control, LocalForm } from 'react-redux-form';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderDish({dish}) {
    return(
        <div>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />                    
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        );

}

function RenderComments({comments, addComment, dishId}) {
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
                                        <p>-- {comment.author} , {dateFormat(comment.date, "dd/mm/yy")}</p>
                                    </li>
                                </div>
                            );
                        })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    else
        return(
            <div></div>
        );
}
 class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                            </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author"
                                        rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
            </Modal>
        </div>
        );
    }

}
 
class DishDetail extends Component {
    render() {
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.dish != null) 
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
                        <RenderComments comments={this.props.comments}
                            addComment={this.props.addComment}
                            dishId={this.props.dish.id} />
                    </div>
                </div>
            </div>
            );
        else
            return (
                <div></div>
            );  
 }
    
}

export default DishDetail;