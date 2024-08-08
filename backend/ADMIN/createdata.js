import { db } from "../server.js";

export default async function createdata(name, rollno, dept) {
    try {
        let sql = 'INSERT INTO Student (name, password, dept) VALUES (?, ?, ?)';
    db.run(sql, [name, rollno, dept], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('student added');


    let sql2 = 'SELECT * FROM Student';
    db.all(sql2, [], (err, rows) => {
        if (err) {
            console.log('in error')
            throw err;
        }
        console.log(rows);
    });
        return this.lastID;
    });
    } catch(err) {
        console.log(err);
    }
}