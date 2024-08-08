import { db } from "../server.js";


export default async function update(name, dept, id) {
    console.log(name + dept + id);
    if(name === '' && dept === '') {
        return "invalid";
    } else if(name === '') {
        const user = await new Promise((resolve, reject) => {
            db.run("UPDATE Student SET dept = ? WHERE id = ?", [dept, id], (err, row) => {
                if (err) {
                    console.log('inside reject');
                    reject(err);
                } else {
                    console.log('inside resolve');
                    resolve(row);
                }
            });
        });
        return user;
    } else if(dept === '') {
        const user = await new Promise((resolve, reject) => {
            db.run("UPDATE Student SET name = ? WHERE id = ?", [name, id], (err, row) => {
                if (err) {
                    console.log('inside reject');
                    reject(err);
                } else {
                    console.log('inside resolve');
                    resolve(row);
                }
            });
        });
        return user;
    } else {
        const user = await new Promise((resolve, reject) => {
            db.run("UPDATE Student SET dept = ?, name = ? WHERE id = ?", [dept, name,id], (err, row) => {
                if (err) {
                    console.log('inside reject');
                    reject(err);
                } else {
                    console.log('inside resolve');
                    resolve(row);
                }
            });
        });
        return user;
    }
}