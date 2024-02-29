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
            var con = mysql.createConnection(auth.auth()[__DATA__SCHEMA__]);
            console.log('ID----->', id);
            try {
                con.query("SELECT * FROM sosmed_posts where id = ?", [id],function (err, result) {
                    if (err) {
                        console.log('but with some error: ',err);
                    } else {
                        console.log('... with some data: ',result);
                        con.end();
                        
                        return result;
                    }
                });
            } catch (e) {
                console.log(e);
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