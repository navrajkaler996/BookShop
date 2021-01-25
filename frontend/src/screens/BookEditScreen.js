import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listBookDetails, updateBook } from "../actions/bookActions";
import { BOOK_UPDATE_RESET } from "../constants/bookConstants";

const BookEditScreen = ({ match, history }) => {
	const bookId = match.params.id;

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [author, setauthor] = useState("");
	const [genre, setgenre] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const bookDetails = useSelector((state) => state.bookDetails);
	const { loading, error, book } = bookDetails;

	const bookUpdate = useSelector((state) => state.bookUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = bookUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: BOOK_UPDATE_RESET });
			history.push("/admin/booklist");
		} else {
			if (!book.name || book._id !== bookId) {
				dispatch(listBookDetails(bookId));
			} else {
				setPrice(book.price);
				setImage(book.image);
				setName(book.name);
				setauthor(book.author);
				setgenre(book.genre);
				setCountInStock(book.countInStock);
				setDescription(book.description);
			}
		}
	}, [dispatch, history, bookId, book, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateBook({
				_id: bookId,
				name,
				price,
				image,
				author,
				genre,
				description,
				countInStock,
			})
		);
	};

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];

		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post(`/api/upload`, formData, config);
			console.log(data);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	return (
		<>
			<Link to="/admin/booklist" className="btn btn-light my-3">
				Go Back
			</Link>

			<FormContainer>
				<h1> Edit Book</h1>

				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id="image-file"
								label="Choose File"
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId="author">
							<Form.Label>author</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter author"
								value={author}
								onChange={(e) => setauthor(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="countInStock">
							<Form.Label>Count in stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter count in stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="genre">
							<Form.Label>genre</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter genre"
								value={genre}
								onChange={(e) => setgenre(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default BookEditScreen;
