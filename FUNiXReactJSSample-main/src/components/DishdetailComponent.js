import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from 'dateformat';

class Dishdetail extends Component {
    constructor(props) {
        super(props);
    }
    renderDish(selectedDish) {
        if (selectedDish != null)
            return (
                <Card>
                    <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                    <CardBody>
                      <CardTitle>{selectedDish.name}</CardTitle>
                      <CardText>{selectedDish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComment(selectedDish) {
        if (selectedDish != null)
            return (
            <div>
                <h4>Comments</h4>
                {this.props.selectedDish.comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}, {dateFormat(comment.date, "dd/mm/yyyy")}</p>
                        </div>
                        );
                    })}
            </div>
        );
        else
            return(
                <div></div>
            );
    }
    render() {
        return (
        <div className="container">
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.selectedDish)}
            </div>
            <div className="col-12 col-md-5 m-1">
                {this.renderComment(this.props.selectedDish)}        
            </div>
        </div>
        </div>
        );
    }
}

export default Dishdetail;