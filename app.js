const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");
const multer = require('multer');
const photo=require('./model/photo')

mongoose
    .connect('mongodb://localhost:27017/photo')
    .then(connection =>console.log('DB CONNECTED'))
    .catch(e => console.log(`Error occured ${e}`));

 const app=express();
 app.use(cors({credentials:true}));
 app.use(express.json());
 

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({ storage: storage });


app.post('/', upload.single('image'), (req, res, next) => {
	var obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	photo.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}else{
                console.log("success");
        }
	});
});

 


const PORT=process.env.port || 4000;
 app.listen( PORT,function (){
    console.log(`server is running ! on ${PORT}` );
 })