import auth from 'basic-auth';

// credenciales

const admins ={
    'robby':{password:'1234'}
};

export default(req, res, next) =>{
    //obtencion usuario

    const user = auth(req);
    //generamos objeto user!
    console.log(user);

    if(!user || !admins[user.name] || admins [user.name].password !== user.pass){

        res.set ('WWW-Authenticate', 'Basic realm = "example"');
        return response.sendStatus(401);
    }

    next();
};