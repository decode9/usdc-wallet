import Tableschemas from './schemas'
import { run } from './dbConnect';

const constructSQL = (schema: any, table: string) => {
    let sql = 'CREATE TABLE IF NOT EXISTS ' + table;
    let tableValues = '(';

    for (let column in schema) {
        tableValues += column;
        let count = 0
        for (let option in schema[column]) {
            count++
            let value = schema[column][option];
            switch (option) {
                case 'type':
                    tableValues += ' ' + value;
                    break;
                case 'primaryKey':
                    if (value) tableValues += ' PRIMARY KEY';
                    break;
                case 'nullable':
                    if (!value) tableValues += ' NOT NULL';
                    break;
                case 'unique':
                    if (value) tableValues += ' UNIQUE';
                    break;
            }
        }
        if (count != schema[column].length) tableValues += ', '
    }
    tableValues += ')';
    sql += ' ' + tableValues;
    return sql;
}


export const createTables = () => {
    for (let schema of Tableschemas) {
        let table = constructSQL(schema.colums, schema.table);
        run(table);
    }
}