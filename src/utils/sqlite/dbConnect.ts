const path = require('path');
const sqlite3 = window.require('sqlite3');
const dbFile = `C:\\Users\\jorge\\Proyectos\\Test\\electron-react\\public\\assets\\sqlite.sqlite3`;
const connection = () => {
    let db = new sqlite3.Database(dbFile, (err: any) => {
        (err) ? console.log('Could not connected to database', err) : console.log('Connection success');
    })

    return db;
}

const db = connection();

export const run = (sql: any, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err: any, result: any) {
            if (err) {
                console.log('Error in SQL' + sql);
                console.log(err);
                reject(err);
                return
            }

            resolve(result)
        })
    })
}