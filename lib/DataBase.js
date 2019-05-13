/**
 * Operating on the database
 * Processing SQL statements
 * MYSQL
 * 
 */
const mysql = require('mysql');

class DataBase {

    constructor (config) {
        this.host = config.host || 'localhost';
        this.port = config.port || 3306;
        this.database = config.database || '';
        this.user = config.user || '';
        this.password = config.password || '';
        this.connection = null;
    }

    //  Set the SQL statement condition for execution
    static setQueryParam (type, pool = {}, param = {}) {
        if (!type || typeof type !== 'string') throw new Error('Please check that the parameters you passed in are correct.')
        try {
            let str = "";
            type = type.toUpperCase();
            for (var name in param) {
                if (type === 'QUERY_WHERE' || type === 'DELETE_WHERE' || type === 'UPDATE_WHERE') 
                    str += ` AND ${pool[name]}='${param[name]}'`;
                else if (type === 'INSERT_NAME')
                    str += `,'${pool[name]}'`;
                else if (type === 'INSERT_VALUE')
                    str += `,'${param[name]}'`;
                else if (type === 'UPDATE_VALUE')
                    str += `,${pool[name]}='${param[name]}'`;
            }
            if (type === 'QUERY_WHERE' || type === 'DELETE_WHERE' || type === 'UPDATE_WHERE') 
                str = str.substr(5).trim();
            else
                str = str.substr(1).trim();
            return str;
        } catch (error) {
            throw error
        }
    }

    //  create mysql instance
    create () {
        try {
            this.connection = mysql.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                database: this.database
            })
        } catch (error) {
            throw error
        }
    }

    //  query
    query (sql) {
        try {
            if (!sql || typeof sql !== 'string') throw new Error('The operation statement is invalid. Please check it and try again.')
            let resolve, reject;
            let promise = new Promise((x, y) => {resolve = x;reject = y;});
            this.connection.query(sql.trim(), (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
            return promise;
        } catch (error) {
            throw error
        }
    }
    
}

module.exports = DataBase