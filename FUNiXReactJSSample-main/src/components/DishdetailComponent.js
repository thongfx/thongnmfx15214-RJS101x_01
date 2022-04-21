import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from 'dateformat';

function RenderDish({ selectedDish }) {
    return (
        <Card>
            <CardImg top src={selectedDish.image} alt={selectedDish.name} />
            <CardBody>
                <CardTitle>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
            </CardBody>
        </Card>
    );
}
function RenderComments({ comments }) {
    return (
        <div>
            <h4>Comments</h4>
            {comments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {dateFormat(comment.date, "dd/mm/yyyy")}</p>
                    </div>
                );
            })}
        </div>
        );
}
        
const DishDetail = ({ selectedDish }) => {
    if (selectedDish != null)
    return (
        <div className="container">
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                <RenderDish selectedDish={selectedDish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments = {selectedDish.comments}/>       
            </div>
        </div>
        </div>
        );
    else
        return (
            <div></div>
        ); 
}

export default DishDetail;