import React from 'react'
import {
    Card, CardBody, CardImg, CardText, CardTitle,
    Breadcrumb, BreadcrumbItem
} from "reactstrap";
import {Link} from 'react-router-dom'


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
            </div>
        )
    }

    else {
        return (<div></div>)
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
                        <hr />
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