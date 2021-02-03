import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import type { IUserSchema } from '../types/schema-types';

const UserSchema: Schema = new Schema({
    first_name: { type: String, required: true  },
    last_name:  { type:String, required: true   },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true, minlength: 6 },
    image:      { type: String, required: true  },
    places:     { type: String, required: true  },
    isPublic:   { type: Boolean, required: true }
});

UserSchema.plugin(uniqueValidator);     // Query email faster and makes sure that emails are unique

const UserModel = mongoose.model<IUserSchema>('User', UserSchema);

export default UserModel;