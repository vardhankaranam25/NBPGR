import { db } from "../server.js";

export default async function(username, password, role ) {
    try {
    console.log(username + " " + password + ' ' + role);
    let sql = 'INSERT INTO Student (name, password, dept) VALUES (?, ?, ?)';
    db.run(sql, [username, password, role], function (err) {
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