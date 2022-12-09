const {Schema, model} = require('mongoose')

    const userSchema = new  Schema({
        name:{
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        lastname:{
            type: String,
            required: [true, 'El apellido es obligatorio']
        },
        email:{
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true
        },
        password:{
            type: String,
            required: [true, 'El contraseña es obligatorio']
        },
        img:{
            type: String,
        },
        role:{
            type: String,
            required: [true, 'El rol es obligatorio'],
        },
        status:{
            type: Boolean,
            default: true
        },
        google:{
            type: Boolean,
            default: false
        }
    })

    userSchema.methods.toJSON = function(){
        const{_id, __v, password, ...user} = this.toObject();
        user.uid = _id;
        return user;
    }

module.exports = model('User', userSchema);