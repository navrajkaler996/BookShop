import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating.js";
import { listBookDetails, createBookReview } from "../actions/bookActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { BOOK_CREATE_REVIEW_RESET } from "../constants/bookConstants";
import Meta from "../components/Meta.js";
const BookScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const bookDetails = useSelector((state) => state.bookDetails);
	const { loading, error, book } = bookDetails;

	const bookReviewCreate = useSelector((state) => state.bookReviewCreate);
	const {
		success: successBookReview,
		error: errorBookReview,
	} = bookReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successBookReview) {
			alert("Review submitted");
			setRating(0);
			setComment("");
			dispatch({ type: BOOK_CREATE_REVIEW_RESET });
		}
		dispatch(listBookDetails(match.params.id));
	}, [match, dispatch, successBookReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createBookReview(match.params.id, { rating, comment }));
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger"> {error} </Message>
			) : (
				<>
					<Meta title={book.name} />
					<Row>
						<Col md={6}>
							<Image src={book.image} alt="image" fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{book.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={book.rating}
										text={`${book.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${book.price}</ListGroup.Item>
								<ListGroup.Item>Description: {book.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${book.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{book.countInStock > 0 ? "In Stock" : "Out Of Stock"}
										</Col>
									</Row>
								</ListGroup.Item>

								{book.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col> Qty </Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(book.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className="btn btn-block"
										type="button"
										disabled={book.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{book.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant="flush">
								{book.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{errorBookReview && (
										<Message variant="danger">{errorBookReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login">sign in</Link>
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default BookScreen;
