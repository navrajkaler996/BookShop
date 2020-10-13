import React from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import products from "../products.js"
import Rating from "../components/Rating.js";

const ProductScreen = ({ match }) => {
    
    const product = products.find((product) => product._id === match.params.id)

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt="image" fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? "In Stock": "Out Of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn btn-block" type="button" disabled={product.countInStock===0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
    