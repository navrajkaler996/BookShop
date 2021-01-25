import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Book from "../components/Book";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import BookCarousel from "../components/BookCarousel";
import Meta from "../components/Meta.js";
import { listBooks } from "../actions/bookActions";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();

	const bookList = useSelector((state) => state.bookList);

	const { loading, error, books, pages, page } = bookList;

	useEffect(() => {
		dispatch(listBooks(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta />
			{!keyword && <BookCarousel />}
			<h1>Latest Books</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger"> {error} </Message>
			) : (
				<>
					<Row>
						{books.map((book) => (
							<Col key={book._id} sm={12} md={6} lg={4} xl={3}>
								<Book book={book} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
