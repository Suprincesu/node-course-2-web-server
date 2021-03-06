const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(request,response)=>{
   response.render('home.hbs',{
       pageTitle:'Welcome to the HomePage',
   });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
    });
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTitle:'Project page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'Cannot find the page',
        statuscode:404
    });
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});