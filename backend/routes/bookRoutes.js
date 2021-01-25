import express from "express";
const router = express.Router();
import {
	getBooks,
	getBookById,
	deleteBook,
	createBook,
	updateBook,
	createBookReview,
	getTopBooks,
} from "../controllers/bookController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getBooks).post(protect, admin, createBook);
router.route("/:id/reviews").post(protect, createBookReview);
router.get("/top", getTopBooks);
router
	.route("/:id")
	.get(getBookById)
	.put(protect, admin, updateBook)
	.delete(protect, admin, deleteBook);

export default router;
