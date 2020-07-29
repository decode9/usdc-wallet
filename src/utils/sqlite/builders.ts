export const constructSQL = (schema: any, table: string) => {
    try {
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
    } catch (error) {
        throw new Error(error);
    }
}

export const filterSQL = (filters: any) => {
    let sqlFilter = ' WHERE';
    let count = 0;
    for (let filter in filters) {
        sqlFilter = ` ${filter} ${filters[filter][0]} ${filters[filter][1]}`;
        count++;
        if (count != filters.length) sqlFilter += ', ';
    }
    return sqlFilter
}

export const selectionSQL = (selection: any) => {
    let sql = 'SELECT';
    let count = 0
    for (let select of selection) {
        sql += ` ${select}`;
        count++;
        if (count != selection.length) sql += ', ';
    }
    return sql;
}

export const insertSQL = (data: any) => {
    let datas = '('
    let values = ' VALUES ('
    let count = 0;
    for (let value in data) {
        count++;
        datas += ` ${value}`;
        values += ` ${data[value]}`;

        if (count != data.length) {
            datas += ', ';
            values += ', ';
        }
    }

    datas += ')';
    values += ')';

    return [datas, values];
}

export const updateSQL = (data: any) => {
    let update = 'SET '
    let count = 0
    for (let value in data) {
        update += ` ${value} = ${data[value]}`;
        count++;
        if (count != data.length) update += ', ';
    }

    return update;
}