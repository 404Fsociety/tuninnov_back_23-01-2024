import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname : { type: String, required:  true },
    lastname  : { type: String, required:  true },
    prefix  : { type: String},
    suffix  : { type: String},
    nickname  : { type: String},
    photo  : { type: String},
    birthday  : { type: Date},
    gender  : { type: String},
    address_home  : { type: String},
    address_work   : { type: String},
    address_other   : { type: String},
    phone_home   : { type: String},
    phone_work   : { type: String},
    phone_fax   : { type: String},
    phone_cell   : { type: String},
    phone_other   : { type: String},
    email_home   : { type: String},
    email_work   : { type: String},
    email_other   : { type: String},
    organization   : { type: String},
    title   : { type: String},
    role   : { type: String},
    website   : { type: String},
    social_facebook   : { type: String},
    social_twitter   : { type: String},
    social_linkedin   : { type: String},
    social_instagram   : { type: String},
    social_other   : { type: String},
    notes   : { type: String},
  
  });

  var UserVCF = mongoose.model('UserVCF', userSchema);

export default UserVCF;