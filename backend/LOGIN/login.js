// Assume db is a database instance from a library that supports promises.
import { db } from '../server.js';

export default async function login(username, password) {
    try {
        console.log(`${username} ${password}`);
        // Perform a query to fetch the user
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM Student WHERE name = ? AND password = ?", [username, password], (err, row) => {
                if (err) {
                    console.log('inside reject');
                    reject(err);
                } else {
                    console.log('inside resolve');
                    resolve(row);
                }
            });
        });

        if (!user) {
            return 'Invalid username or password';  // No user found or wrong credentials
        }

        // Handling user roles
        switch (user.dept) {
            case 'admin': console.log('admin');return 'admin';
            case 'scientist': return 'scientist';
            case 'user': return 'user';
            case 'analyst': return 'analyst';
            default: return 'none';  // No specified role
        }
    } catch (err) {
        console.error(err);
        return 'Database error';  // Handle database errors gracefully
    }
}
