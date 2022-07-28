const express = require('express');
const app = express();
const nodemon = require('nodemon');
var methodOverride = require('method-override');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
  
app.set('views' , path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

let comments = [
    {
        id : uuidv4() , 
        username: "KUSHAL",
        comment: "hjdvjdbcvhfhfhjb"
    },
    {
        id : uuidv4() , 
        username: "SHREE",
        comment: "hjdvjdbfhfghfghcvjb"
    }, 
    {
        id : uuidv4() ,
        username: "PRIYANSHU",
        comment: "hjdvjdfhghfhbcvjb"
    },
    {
        id : uuidv4() ,
        username: "Paayush",
        comment: "hjdvjdfhghfhdcdddddddddddddddddbcvjb"
    },  

    {
        id : uuidv4() ,
        username: "CARLOVER",
        comment: "hjdhhfhgfxxvjdbcvjb"
    
    }
]

app.get('/' , (req, res) => {
    res.render('comments/home' )
});

app.get('/comments' , (req, res) => {
    res.render('comments/index' , {comments})
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username , comment  } = req.body;
    console.log(req.body);
    comments.push({ username ,
                  comment , id : uuidv4()
               });
    res.redirect('/comments');
});    
    
   app.get('/tacos', (req, res) =>{
    console.log("got tacos request");
    res.send("response from server");

});

app.get('/comments/:id', (req, res) => {
   const { id } = req.params ;
   const comment = comments.find( c => c.id === (id));
   res.render('comments/show' , {comment} );
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params ;
    const comment = comments.find( c => c.id === (id));
    res.render('comments/edit' , {comment} );
 });

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params ;
    const newCommentText = req.body.comment;
   const foundComment = comments.find( c => c.id === (id));
   foundComment.comment = newCommentText;
   res.redirect( '/comments');

 });--

 app.delete("/comments/:id", (req, res) => {
    const { id } = req.params ;
    comments = comments.filter( c => c.id!== (id));
    res.redirect( '/comments');
});


app.listen(3000 , () => {
    console.log("listening on http://localhost:3000");
});