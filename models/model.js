//creating model and schemas:

mongoose = require('mongoose');

var schema = mongoose.Schema;

var userInfoSchema = new schema({
    storeId: {
        type:Number,
        required:true
    },
    name :{
        type:String,
        required:true
    } ,
    age : {
        type:Number,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
});

var assignmentModel = mongoose.model('assignmentModel',userInfoSchema);

//exporting model
module.exports = assignmentModel;