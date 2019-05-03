const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const assignmentModel = require('./models/model');
const app = express();

app.use(express.static('../internshipAssignment'));

//connecting to the database 
mongoose.connect('mongodb://127.0.0.1:27017/AssignmentDB',{useNewUrlParser:true});
var db = mongoose.connection;
console.log('connected to database sucessfully !');
//handling connection error 
db.on('error',console.error.bind(console,'Mongodb connection error'));

//including body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var idCount = 1;
//save data function
function saveData(req,res){
    if(req.body.name=='' || req.body.age=='' || req.body.email=='' || req.body.password=='')
        {
            var status_400 = {"status_code " : 400,
            "error":"Wrong Parameter",
            "message":"Please check the entered parameters"};
            res.json(status_400);
            
        }
    else{
    var id = idCount++;    
    var data = {
        storeId: id,
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        password : req.body.password
    }
        var status_200={"status_code":200,
        "mesage":"User created successfully",
        "data" : {
                "newUser" :{
                    "id":data.storeId,
                    "name": data.name,
                    "age" : data.age,
                    "email" : data.email,
                    "password" : data.password
                }   
            }
        }
        var userData = new assignmentModel(data);
        userData.save().then(function(data){
            console.log(data);
            console.log('data saved !');
        res.json(status_200);
        }).catch(function(err){
            console.log({error:err.message});
        });
    }

};

//user Login function
function userLogin(req,res){
    if(req.body.email=='' || req.body.password=='')
    {
        var status_400 = {"status_code " : 400,
        "error":"Wrong Parameter",
        "message":"Please check the entered parameters"};
        res.status(400).json(status_400);
    }
    else{
        assignmentModel.findOne({email:req.body.email,password:req.body.password},function(err,user){
            if(err){
                console.log(err);
            }

            else if(!user){
                console.log('user not found !');
                 res.json({
                    "status_code":204,
                    "error":"Invalid User",
                    "message":"User not found"
                });
            }
            else{            
            return res.json({
                "status_code":200,
                "mesage":"User Logged in",
                "data" : {
                    "newUser" :{
                        "id":user.storeId,
                        "name": user.name,
                        "age" : user.age,
                        "email" : user.email,
                        "password" : user.password
                    }   
                }
            });}

        });
    }
};

//creating POST request for user registration 
app.post('/api/register',function(req,res){
    console.log(req.body);
    saveData(req,res);
});

//creating POST request for user login 
app.post('/api/login',function(req,res){
    console.log(req.body);
    userLogin(req,res);
});
var port = 5000;
app.listen(port,()=>{
    console.log('listening to port 5000')
});