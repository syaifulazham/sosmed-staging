require("dotenv").config();

const auth = function(){
    return {
        techlympic:{
            host: process.env.DB_MYSQL_HOST,
            port: process.env.DB_MYSQL_PORT,
            user: process.env.DB_MYSQL_USER,
            password: process.env.DB_MYSQL_PASS,
            database: process.env.DB_MYSQL_DBAS
        },
        sosmed:{
          fb: process.env.FB_ACCESS_TOKEN,
          fbid: process.env.FB_PAGE_ID,
          insta: process.env.INSTA_ACCESS_TOKEN,
          tiktok: process.env.TIKTOK_ACCESS_TOKEN
        }
    }
}


module.exports = {auth}