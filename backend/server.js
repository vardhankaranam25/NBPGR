import express from 'express';
import sqlite from 'sqlite3';
import createuser from './ADMIN/createuser.js';
import cors from 'cors';
import login from './LOGIN/login.js';
import update from './ADMIN/update.js';
import createdata from './ADMIN/createdata.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const sql = sqlite.verbose();

app.listen(5003, ()=> {
    console.log('server listening');
})

export let db = new sql.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS Student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    password TEXT,
    dept TEXT
)`);

app.get('/students', (req, res) => {
    let sql = 'SELECT * FROM Student';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log('in error')
            throw err;
        }
        console.log(rows);
    });
});

app.get('/data', async(req, res) => {
    try {
        const sql = 'SELECT * FROM Student';
        db.all(sql, [], (err, rows) => {
        if (err) {
        res.status(400).json({"error":err.message});
        return;
        }
        res.json({
        message: "success",
        data: rows
        });
  }); 
    } catch(err) {
        console.log(err);
    }
})

app.post('/Admin/CreateUser', async (req, res) => {
    try {
      const { username, password, role } = req.body; // Destructure directly from req.body
      const user = await createuser(username, password, role);
      res.status(201).json({ message: "User created successfully " + user}); // Send success response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

app.post('/Login', async(req, resp) => {
    try {
        const body = req.body;
        const log = await login(body.username, body.password); 
        resp.json(log);
    } catch(err) {
        console.log(err);
    }
})

app.get('/UpdateAdmin', async(req, res) => {
    try {
        const sql = 'SELECT * FROM Student';
        db.all(sql, [], (err, rows) => {
        if (err) {
        res.status(400).json({"error":err.message});
        return;
        }
        res.json({
        message: "success",
        data: rows
        });
  });

    } catch(err) {
        console.log(err);
    }
})

app.put('/ADMIN/Update', async(req, resp) => {
    try {
        const body = req.body;
       const user = await update(body.name, body.dept, body.id);
       let sql = 'SELECT * FROM Student';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log('in error')
            throw err;
        }
        console.log(rows);
    });
    } catch(err) {
        console.log(err);
    }
})

app.post('/ADMIN/Create', async(req, resp) => {
    try {
        const body = req.body;
        const user = await createdata(body.name, body.rollno, body.dept);
        resp.status(201).json({ message: "Data added successfully " + user});
    } catch(err) {
        console.log(err);
    }
})

app.delete('/delete', async(req, resp) => {
    try {
        console.log('in del')
        const { id } = req.query;
        console.log(id);
        db.run('DELETE FROM Student WHERE id = ?', [id], function(err) {
            if (err) {
                console.error('Delete error:', err.message);
                resp.status(500).send('Failed to delete');
            } else {
                console.log(`Row(s) deleted ${this.changes}`);
                resp.send({ message: 'Deleted successfully', changes: this.changes });
            }
        });

    } catch(err) {
        console.log(err);
    }
})
  


