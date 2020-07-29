export default {
    table: 'user',
    colums: {
        id: { type: 'INTEGER', primaryKey: true, nullable: false, autoIncrement: true, unique: true },
        username: { type: 'STRING', nullable: false, unique: true },
        password: { type: 'STRING', nullable: false, unique: true }
    }
}