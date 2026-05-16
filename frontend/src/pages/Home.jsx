import { useEffect, useState } from "react"
import axios from 'axios';
import { Book } from "../components/Book";
import { Link } from "react-router-dom";

export default function HomePage() {
    // its storing all books initial its empty.
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const response = await axios.get('http://localhost:5000/books');
        const { success, message, data } = response.data;
        if (success) {
            // after getting books from server set in books state
            setBooks(data);
        } else {
            alert(message);
        }

    };

    useEffect(() => {
        // Its run when component successfully render
        // load all books from backend
        loadBooks();
    }, []);

    return (
        <main>
            {/* Create book button when I click, Its going to another page */}
            <button className="m-2">
                <Link className="p-3" to={'/create'}>Create book</Link>
            </button>
            {/* Show all books */}
            {
                books.map(book => {
                    return (
                        <Book id={book.id} title={book.title}
                            description={book.description}
                            author={book.author}
                            rating={book.rating}
                            pages={book.pages}
                            whenDelete={() => loadBooks()} />
                    )
                })
            }
        </main>
    )
}