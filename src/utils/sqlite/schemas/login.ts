export default {
    table: 'users',
    colums: {
        id: { type: 'INTEGER', primaryKey: true, nullable: false, unique: true },
        username: { type: 'STRING', nullable: false, unique: true },
        password: { type: 'STRING', nullable: false, unique: true }
    }
}