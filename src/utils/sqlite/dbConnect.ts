const sqlite3 = window.require('sqlite3').verbose();
const dbFile = `C:\\Users\\jorge\\Proyectos\\Test\\electron-react\\src\\assets\\sqlite.sqlite3`;


class DataConnect {

    db: any;

    constructor() {
        this.db = new sqlite3.Database(dbFile, (err: any) => {
            (err) ? console.log('Could not connected to database', err) : console.log('Connection success');
        })
    }

    run(sql: string) {
        return new Promise((resolve, reject) => {
            console.log('this happend?')

            this.db.run(sql, [], (err: any, result: any) => {
                console.log('result?')

                if (err) {
                    console.log('Error in SQL' + sql);
                    console.log(err);
                    reject(err);
                    return
                }

                resolve(result);
            }, () => { console.log('complete??') })
        })
    }
}

export default DataConnect;