var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = req.query.data || 'hello world';
  crypto.randomBytes(32, function(err, key) {
    if (err) {
      console.log(err);
      return res.status(500).json("error");
    }
    var cipher = crypto.createCipheriv('aes-256-ecb', key, '');
    cipher.update(data, 'utf8');
    var encrypted = cipher.final();
    var decipher = crypto.createDecipheriv('aes-256-ecb', key, '');
    decipher.update(encrypted, 'base64');
    var decrypted = decipher.final('utf8');
    res.render('index', {
      title       : data,
      key         : key.toString('base64'),
      keyHex      : key.toString('hex'),
      encrypted   : encrypted.toString('base64'),
      encryptedHex: encrypted.toString('hex'),
      decrypted   : decrypted,
    });
  });
});

module.exports = router;
