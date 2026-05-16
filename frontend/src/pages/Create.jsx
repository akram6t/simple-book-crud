import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

export default function CreatePage(){
    // Thats use to navigate to other pages
    const navigate = useNavigate();
    
    // It is manage book object initially its set to empty
    const [book, setBook] = useState({
        title: '',
        description: '',
        author: '',
        pages: 0,
        rating: 0
    });

    const { id } = useParams();

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });   
    }

    const updateBook = async () => {
        const response = await axios.post(`http://localhost:5000/book`, book, { 
            headers: {
                "Content-Type": 'application/json'
            }
         });

         const { success, message } = response.data;

         if(!success){
            return alert(message);
         }

         alert("Data created!")
         navigate('/');

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
            <button className="btn btn-primary" onClick={updateBook}>Create book</button>
        </main>
    )
}