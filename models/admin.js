const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { collection: 'admin' }
);

module.exports = Admin = mongoose.model('admin', AdminSchema);
