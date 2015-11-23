var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    var data = req.query.data || 'hello world';
    var B         = 'base64';
    var U         = 'utf8';
    var keyBytes  = 32; // 16 or 32
    var algorithm = 'aes-' + (keyBytes * 8) + '-ecb';
    var key       = crypto.randomBytes(keyBytes);
    var iv        = crypto.randomBytes(keyBytes);
    var cipher    = crypto.createCipheriv(algorithm, key, '');
    var encrypted = cipher.update(data, U, B) + cipher.final(B);
    var decipher  = crypto.createDecipheriv(algorithm, key, '');
    var decrypted = decipher.update(encrypted, B, U) + decipher.final(U);
    console.log(data, key.toString(B), iv.toString(B), encrypted, decrypted);
    res.render('index', {
      title       : data,
      key         : key.toString(B),
      iv          : iv.toString(B),
      encrypted   : encrypted,
      decrypted   : decrypted,
    });
  } catch (err) {
    console.log(err);
    err.status = 500;
    return next(err);
  }
});

module.exports = router;
