//including modules
const express = require('express'); 
const path = require('path');  
const fs = require('fs');

//Code for ExpressJs
const app = express();  //Create Express app
const port = 80;  //create express app at port number 80
app.use('/static', express.static('static')); //For using static files 
app.use(express.urlencoded()); //We grab the data in urlencoded form


//Code for PUG 
app.set('view-engine', 'pug') //Set template engine pug 
app.set('views', path.join(__dirname, 'views')); //Set views directory  

//Mongoose code 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db'); 
const bodyparser = require('body-parser'); 


//Define Mongoose Schema 
var contactSchema = new mongoose.Schema({ 
    name : String, 
    mail : String, 
    phone : String
}); 

var Contact = mongoose.model('Contact', contactSchema);


//Endpoints 
app.get('/', (req, res)=> {  
    const param = {};
    res.status(200).render('index.pug', param);
});   

app.post('/', (req, res) =>{ 
    let name = req.body.name;
    let email = req.body.mail;
    let phone = req.body.phone;  

    var myData = new Contact(req.body); 

    myData.save().then(()=> {
        res.send("This item is sent");
    }).catch(()=> { 
        res.status(400).send("not saved");
    });
 
    // let str = `name = ${name}, email = ${email}, phone=${phone}\n`;  

    // fs.appendFileSync('db.txt', str);  

    // console.log(str);

    res.status(200).render('index.pug');
});

//server  
app.listen(port, ()=> { 
    console.log(`Server Stared at port no ${port}`); 
});


