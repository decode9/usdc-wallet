import Database from 'better-sqlite3'

class DataConnect {

    db: any;

    constructor() {
        this.db = new Database('sqlite2.db');
    }

    run(sql: string) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(sql);
            const result = stmt.run();

            if (result.code === 'SQLITE_ERROR') { reject(result); return };

            resolve(result);
        })
    }

    getMany(sql: string) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(sql);
            const result = stmt.all();

            if (result.code === 'SQLITE_ERROR') { reject(result); return };

            resolve(result);
        })
    }
}

export default DataConnect;