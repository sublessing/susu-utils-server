## Introduction

    susu-utils-server is a quick ToolKit.

## ToolKit Body

    UploadFile(File Upload Processing | Server-side usage)
        
        upload(Request req)
            Receiving the Request Object, processing the uploaded file and returning the processing result.
            parameter
                req ------ required,Request Object
    
    DataBase(Operating on the database)

        DataBase.setQueryParam(type, pool, param)
            Set the SQL statement condition for execution
            parameter
                type ------ required,types of database operations
                    `INSERT_NAME`, 
                    `INSERT_VALUE`, 
                    `DELETE_WHERE`, 
                    `UPDATE_WHERE`,
                    `UPDATE_VALUE`,
                    `QUERY_WHERE`
                pool ------ required,corresponding Relations between Operational Parameters and Database Fields
                param ------ required,operational parameters
        create
            Create mysql instance
        query(sql)
            Function of Operating Database
            parameter
                sql ------ required, Statements for Operating Database


