var mysql = require('mysql');
const util = require('util');
const auth = require('./auth');

let __DATA__SCHEMA__ = 'techlympic';

let API = {
    posts: {
        list: fn => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                con.query("SELECT * FROM sosmed_posts", function (err, result) {
                    if (err) {
                        console.log('but with some error: ',err);
                    } else {
                        console.log('... with some data: ',result);
                        con.end();
                        
                        fn(result);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        post: async (id) => {
            const con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            // Convert the query function to return a promise
            const query = util.promisify(con.query).bind(con);
            
            try {
                console.log('ID----->', id);
                // Await the promise returned by the query
                const result = await query("SELECT * FROM sosmed_posts WHERE id = ?", [id]);
                console.log('... with some data: ', result);
                return result;
            } catch (err) {
                console.log('Error:', err);
                throw err; // Rethrow the error if you want the caller to handle it
            } finally {
                con.end(); // Ensure connection is closed even if there's an error
            }
        },
        create: (title, contents, images, video, post_status, fn) => {
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            try {
                con.query("insert into sosmed_posts(title, content, image_urls, video_urls, status) values(?,?,?,?,?)", [title, contents, images, video, post_status],function (err, result) {
                    if (err) {
                        console.log('but with some error: ',err);
                    } else {
                        console.log('... with some data: ',result);
                        con.end();
                        
                        fn(result);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
}

module.exports = API;