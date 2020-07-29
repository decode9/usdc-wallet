import Tableschemas from './schemas'
import { run } from './dbConnect';
import { constructSQL, filterSQL, selectionSQL, insertSQL, updateSQL } from './builders';

export const createTables = () => {
	try {
		for (let schema of Tableschemas) {
			let table = constructSQL(schema.colums, schema.table);
			run(table);
		}
	} catch (error) {
		throw new Error(error);
	}
}

export const getData = async (table: any, filters: any = {}, selection = []) => {
	try {
		let sql = `SELECT * FROM ${table}`;

		if (selection.length) {
			sql = selectionSQL(selection);
			sql += ` FROM ${table}`;
		}

		if (filters.length) {
			let sqlFilter = filterSQL(filters)
			sql += ` ${sqlFilter}`;
		}

		let result;

		await run(sql).then((res) => {
			result = res;
		}, (err) => {
			result = err;
		})

		return result;
	} catch (error) {
		throw new Error(error);
	}
}

export const insertData = async (table: any, data: any = {}) => {
	try {
		let sql = `INSERT INTO ${table}`;
		let result;

		if (!data.length) throw new Error('NO DATA TO INSERT');

		let datas = insertSQL(data);

		sql += ` ${datas[0]} ${datas[1]}`;

		await run(sql).then((res) => {
			result = res;
		}, (err) => {
			result = err;
		})

		return result;
	} catch (error) {
		throw new Error(error);
	}
}

export const updateData = async (table: any, data: any = {}, filters: any = {}) => {
	try {
		let sql = `UPDATE ${table}`;


		if (!data.length) throw new Error('NO DATA TO UPDATE');

		let update = updateSQL(data);
		sql += ` ${update}`;

		if (filters.length) {
			let sqlFilter = filterSQL(filters)
			sql += ` ${sqlFilter}`;
		}

		let result;

		await run(sql).then((res) => {
			result = res;
		}, (err) => {
			result = err;
		})

		return result;
	} catch (error) {
		throw new Error(error);
	}
}

export const deleteData = async (table: any, filters: any = {}) => {
	try {
		let sql = `DELETE FROM ${table}`;

		if (filters.length) {
			let sqlFilter = filterSQL(filters)
			sql += ` ${sqlFilter}`;
		}

		let result;

		await run(sql).then((res) => {
			result = res;
		}, (err) => {
			result = err;
		})

		return result;
	} catch (error) {
		throw new Error(error);
	}
}

