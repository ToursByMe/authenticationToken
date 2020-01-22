import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import https from 'https';


//consts

const app = express();


/*app.get('/', (req, res) =>{
    res.send("Hello world");
});*/

app.get('/api', (req, res) =>{
    res.json({
        message:" Hello World, your API is ready"
    });

});




app.post('/api/post', verifyToken,( req, res)=>{
    //erificacion token
    
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.json({
                message:'You shall not enter'
            });
        }else{
            res.json({
                message:"Post created...",
                authData
            });
        }
    });
   
});

app.post('/api/login',(req, res)=>{

    //usuario
    //how to create users?
    const user = {
        name: 'robby',
        password: '1234',
        mail: 'hello@theclick36.com'
    }
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token)=>{
        
        res.json({
            token
        });
        
    
    });
} );

//FORMATO TOKEN
//aUTHORITATION: Bearer <token>
//debemos coger el token y desacernos de bearer!!!

//verifyToken

function verifyToken(req, res, next){
    //Get authorization header value
//token from header
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){

        //split bearer(sobre el espacio en blanco) para coger solo el token

        const bearer = bearerHeader.split(' ');

        //get token from array despues separación espacio
        //cero based!! posicion dos[1]

        const bearerToken = bearer[1];

        // declarar token

        req.token = bearerToken;

        //next middelware para seguir adelante

        next();

    }else{
        //forbidden
        res.json({
            message:'Usuario no validado'
        });
    }


}



//recordar que no podemos proteger el login
const opt = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}

https.createServer(opt, app).listen(4000, _=> console.log('Listening at port: https://localhost:4000'));