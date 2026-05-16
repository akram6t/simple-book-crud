import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

export default function UpdatePage() {
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    const { id } = useParams();

    const loadBookData = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        const { success, message, data } = response.data;

        if (!success) {
            return alert(message);
        }

        setBook(data);

    }

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });

    }

    const updateBook = async () => {
        const response = await axios.put(`http://localhost:5000/book/${id}`, book, {
            headers: {
                "Content-Type": 'application/json'
            }
        });

        const { success, message } = response.data;

        if (!success) {
            return alert(message);
        }

        alert("Data updated!")
        navigate('/');

    }

    useEffect(() => {
        loadBookData();
    }, []);

    if (!book) {
        return <div>
            <h3>please wait...</h3>
            <Link to={'/'} >Go to home page</Link>
        </div>
    }

    return (
        <main className="p-5">
            {/* Go back to home button */}
            <div>
                <Link to={'/'}> {'<-'} Go to home</Link>
            </div>
            {/* title */}
            <label className="form-label">Title</label>
            <input className="form-control" name="title" value={book.title} onChange={onValueChange} type="text" />
            {/* description */}
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={book.description} onChange={onValueChange}></textarea>
            {/* author */}
            <label className="form-label">Author</label>
            <input className="form-control" name="author" value={book.author} type="text" onChange={onValueChange} />
            {/* pages */}
            <label className="form-label">Pages</label>
            <input className="form-control" name="pages" value={book.pages} type="number" onChange={onValueChange} />
            {/* rating */}
            <label className="form-label">Rating</label>
            <input className="form-control" name="rating" value={book.rating} type="number" onChange={onValueChange} />
            {/* update button */}
            <button className="btn btn-primary" onClick={updateBook}>Update book</button>
        </main>
    )
}