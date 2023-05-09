import { ObjectId } from "mongodb";
import {model, models, Schema} from "mongoose";

const settingSchema = new Schema({
  name: {type:String, required: true, unique: true},
  value: {type:ObjectId},
}, {timestamps: true});

export const Setting = models?.Setting || model('Setting', settingSchema);