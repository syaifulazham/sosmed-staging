var express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crud = require('./crud_mysql')

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Ensure the uploads directory exists
const uploadDir = './public/uploads';
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index', { page: 'create.ejs' });
});

router.get('/list', (req, res) => {
    crud.posts.list(data=>{
        console.log('the data: ', data);
        res.render('index', { page : 'list', data: data});
    })
})

function isImage(fileName) {
    // Regular expression to match common image file extensions
    const pattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    return pattern.test(fileName);
}

function isVideo(fileName) {
    // Regular expression to match common image file extensions
    const pattern = /\.(mp4|avi|mov|wmv|flv|mkv)$/i;
    return pattern.test(fileName);
}


// Endpoint for form submission
router.post('/create', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    // Access title and content from the body
    //console.log('req.body: ',req);
    const { title, content } = req.body;
    console.log('Title:', title);
    console.log('Content:', content);
    
    var images = [];
    var videos = [];
    // Access uploaded files
    if (req.files) {
        console.log('Uploaded files:', req.files.images);
        var fnames = req.files.images;
        fnames.forEach( d=> {
            if(isImage(d.filename)){
                images.push(d.filename)
            }
            if(isVideo(d.filename)){
                videos.push(d.filename)
            }
        })
    }

    var img='', vid='';
    img = (images) ? images.join('|') : '';
    vid = (videos) ? videos.join('|') : '';
    crud.posts.create(title, content, img, vid, 'draft', result=>{
        res.send('Data and files received successfully!');
    });
});

module.exports = router;