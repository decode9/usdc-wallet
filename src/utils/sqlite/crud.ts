import Tableschemas from './schemas'
import DataConnect from './dbConnect';
import { constructSQL, filterSQL, selectionSQL, insertSQL, updateSQL } from './builders';

const dbConnect = new DataConnect();

export const createTables = async () => {
	try {
		for (let schema of Tableschemas) {
			let table = constructSQL(schema.colums, schema.table);

			await dbConnect.run(table).then((result) => {
				if (result) console.log(`TABLE ${schema.table} CREATED SUCCESSFULLY`);
			});

			console.log('run exec');
		}
	} catch (error) {
		throw new Error(error);
	}
}

export const getData = async (table: any, filters: any = {}, selection: any = []) => {
	try {
		let sql = `SELECT * FROM ${table}`;

		if (selection.length) {
			sql = selectionSQL(selection);
			sql += ` FROM ${table}`;
		}

		if (Object.keys(filters).length) {
			let sqlFilter = filterSQL(filters)
			sql += ` ${sqlFilter}`;
		}

		let result;

		await dbConnect.run(sql).then((res) => {
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

		if (!Object.keys(data).length) throw new Error('NO DATA TO INSERT');

		let datas = insertSQL(data);

		sql += ` ${datas[0]} ${datas[1]}`;
		console.log('Running?')
		await dbConnect.run(sql).then((res) => {
			console.log(res);
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


		if (!Object.keys(data).length) throw new Error('NO DATA TO UPDATE');

		let update = updateSQL(data);
		sql += ` ${update}`;

		if (filters.length) {
			let sqlFilter = filterSQL(filters)
			sql += ` ${sqlFilter}`;
		}

		let result;

		await dbConnect.run(sql).then((res) => {
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

		await dbConnect.run(sql).then((res) => {
			result = res;
		}, (err) => {
			result = err;
		})

		return result;
	} catch (error) {
		throw new Error(error);
	}
}

