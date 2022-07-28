const  express = require('express');
const nodemon = require('nodemon');
const  path = require('path');
const app = express();
app.use(express.static (path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));   
app.get ('/', (req, res) => { res.render("home.ejs")});
app.get ('/r/:subreddit', (req, res) => { 
   const { subreddit} = req.params;
    res.render("subreddit.ejs" , {subreddit })});
app.get ('/rand', (req, res) => { 
    const num = Math.floor(Math.random() * 10 ) + 1 ;
    res.render("rand.ejs" , { floor: num });

});
app.get ('/cats', (req, res) => { 
    const cats = [ 'kayshal' ,'cdssdc' ,'cscsc' ];
    res.render("cats.ejs" , { cats });
});   
app.listen(3000 , ()=> {console.log("..litsening........ on port 3000...")});