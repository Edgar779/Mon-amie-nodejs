import multer from 'multer';
import mime from 'mime';
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/products');
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString('hex') +
          Date.now() +
          '.' +
          mime.getExtension(file.mimetype)
      );
    });
  }
});
export const upload = multer({ storage: storage }).any();

