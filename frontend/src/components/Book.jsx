import axios from "axios"
import { Link } from "react-router-dom";

export function Book({ id, title, description, author, pages, rating, whenDelete }){
    
    const deleteBook = async () => {
        const response = await axios.delete(`http://localhost:5000/book/${id}`);
        const { success, message } = response.data;
        if(success){
            whenDelete();
        }else{
            alert(message);
        }
    }
    
    return(
        <div className="border p-2 m-2 bg-warning">
            <h1 className="border text-primary">{id}</h1>
            <h1>{title}</h1>
            <p>{description}</p>
            <h6>Author: {author}</h6>
            <p>Rating: {rating} </p>
            <p>Pages: {pages}</p>

            <button onClick={deleteBook}>delete</button>
            <button>
                <Link to={`/update/${id}`}>update</Link>
            </button>

        </div>
    )
}