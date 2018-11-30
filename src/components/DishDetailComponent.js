import React, {Component} from 'react'
import {
    Card, CardBody, CardImg, CardText, CardTitle,
    Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col
} from "reactstrap";
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom'


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const RenderDish = ({dish}) => {
    return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const RenderComments = ({commentsArray}) => {
    if (commentsArray) {
        const commentsObj = commentsArray.map((commentObj) => {
                return (

                    <ul className="list-unstyled" key={Math.random()}>
                        <li>
                            {commentObj.comment}
                        </li>
                        <li>
                            -- {commentObj.author},
                            {new Intl.DateTimeFormat(
                                'en-US',
                                {year: 'numeric', month: 'short', day: '2-digit'})
                                .format(new Date(commentObj.date))}
                        </li>

                    </ul>

                )
            }
        )
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>

                {commentsObj}
                < CommentForm/>
            </div>
        )
    }

    else {
        return (<div></div>)
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.setState({isModalOpen: false})

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span>Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating"> Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                                    className="form-control">
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
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength: minLength(2), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comments">Comments</Label>
                                    <Control.textarea model=".comments" id="comments" name="comments"
                                                      rows="6"
                                                      className="form-control"/>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>


                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

const DishDetail = (props) => {
    if (props.dish) {
        return (

            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row" key={props.dish.id}>
                    < RenderDish dish={props.dish}/>
                    < RenderComments commentsArray={props.comments}/>

                </div>


            </div>
        )
    }
    else {
        return <div></div>
    }
}


export default DishDetail