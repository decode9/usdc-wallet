export const constructSQL = (schema: any, table: string) => {
    try {
        let sql = 'CREATE TABLE IF NOT EXISTS ' + table;
        let tableValues = '(';
        let count = 0
        for (let column in schema) {
            tableValues += column;
            count++
            for (let option in schema[column]) {

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
            if (count !== Object.keys(schema).length) tableValues += ', '
        }
        tableValues += ')';
        sql += ' ' + tableValues + ';';
        return sql;
    } catch (error) {
        throw new Error(error);
    }
}

export const filterSQL = (filters: any) => {
    let sqlFilter = 'WHERE';
    let count = 0;
    for (let filter in filters) {
        sqlFilter += (typeof filters[filter][1] == 'string') ? ` ${filter} ${filters[filter][0]} '${filters[filter][1]}'` : ` ${filter} ${filters[filter][0]} ${filters[filter][1]}`;
        count++;
        if (count !== Object.keys(filters).length) sqlFilter += ', ';
    }
    return sqlFilter
}

export const selectionSQL = (selection: any) => {
    let sql = 'SELECT';
    let count = 0
    for (let select of selection) {
        sql += ` ${select}`;
        count++;
        if (count !== selection.length) sql += ', ';
    }
    return sql;
}

export const insertSQL = (data: any) => {
    let datas = '('
    let values = ' VALUES ('
    let count = 0;
    for (let value in data) {
        count++;
        datas += `${value}`;

        values += (typeof data[value] == 'string') ? `'${data[value]}'` : `${data[value]}`;

        if (count !== Object.keys(data).length) {
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
        if (count !== Object.keys(data).length) update += ', ';
    }

    return update;
}