const express = require('express');
const { createPool } = require('mysql2/promise');
const cors = require('cors');

const app = express();

app.use(cors()); // { origin: 'http://localhost:5173' }
app.use(express.json());

const dbClient = createPool({
    user: 'root',
    password: 'manager',
    host: 'localhost',
    database: 'book_store'
});

// create book
app.post('/book', async (req, res) => {
    try{
        const { title, description, author, pages, rating } = req.body;

        if(!title || !description || !author || !pages || !rating){
            return res.send({ success: false, message: 'all fields are required!' });
        }

        const sql = `insert into books(title,description,author,pages,rating) values (?,?,?,?,?)`;

        const query = await dbClient.query(sql, [title, description, author, pages, rating]);

        return res.send({ success: true, data: query[0] });

    }catch(error){
        return res.send({ success: false, message: error })
    }
});

// read books
app.get('/books', async (req, res) => {
    try{
        
        const sql = 'select * from books';
        const query = await dbClient.query(sql);
        return res.send({ success: true, data: query[0] }) // []

    }catch(error){
        return res.send({ success: false, message: error });
    }
});

//  retrieve one book
app.get('/books/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const sql = 'select * from books where id=?';
        const query = await dbClient.query(sql, [id]);
        if(!query[0][0]){
            return res.send({ success: false, message: "data not found" }) // {}
        }

        return res.send({success: true, data: query[0][0]})

    }catch(error){
        return res.send({ success: false, message: error });
    }
});

// delete books
app.delete('/book/:id', async (req, res) => {
    try{
        const id = req.params.id;
        
        const sql = 'delete from books where id = ?';
        const query = await dbClient.query(sql, [id]);

        return res.send({success: true,  data: query[0]});
        
    }catch(error){
        // console.log(error);
        return res.send({ success: false, message: error });
    }
});

// update book
app.put('/book/:id', async (req, res) => {
    try{
        const id = req.params.id
        const { title, description, author, pages, rating } = req.body;

        if(!title || !description || !author || !pages || !rating){
            return res.send({ success: false, message: 'all fields are required!' });
        }

        const sql = `update books set title=?, description=?, author=?, pages=?, rating=? where id = ?`;

        const query = await dbClient.query(sql, [title, description, author, pages, rating, id]);

        return res.send({ success: true, data: query[0] });

    }catch(error){
        return res.send({ success: false, message: error })
    }
});





app.listen(5000);

console.log("Server running at: 5000");