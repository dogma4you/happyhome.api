declare const _default: {
    development: {
        client: string;
        connection: {
            database: string;
            user: string;
            password: string;
        };
        migrations: {
            tableName: string;
            directory: string;
        };
        seeds: {
            directory: string;
        };
    };
};
export default _default;
