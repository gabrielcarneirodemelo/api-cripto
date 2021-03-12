
module.exports = app => {
//Encrypt///////////////////////////////////////////////////////////////////////////////
    app.post('/encrypt', (req, res) => {
        console.log('##############################################################################')
        var codigo = req.body
        console.log(codigo)
        console.log('##############################################################################')
        
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
CryptoJS = require("crypto-js");


const keySize = 256;
const iterations = 1035;
const pass = CryptoJS.enc.Utf8.parse('2DD370CDC573491550BAB80BCF2115EA');
const salt = CryptoJS.enc.Utf8.parse('14DDAF26');
const iv   = CryptoJS.enc.Utf8.parse('3CA8682A94E09EEC');

const key = CryptoJS.PBKDF2(pass, salt, { keySize: keySize / 32, iterations });

utils = {

    decryptToJSON: value => {
        const decrypted = CryptoJS.AES.decrypt(value, key, { iv })
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    },

    encryptToString: payload => {
        return CryptoJS.AES.encrypt(payload, key, { iv }).ciphertext.toString(CryptoJS.enc.Base64)
    }

}


const jsonRequest = JSON.stringify(codigo);


const encryptedBody = JSON.stringify(utils.encryptToString(jsonRequest));
//pm.environment.set("encryptedBody", encryptedBody);
console.log(encryptedBody);


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //res.send('Encriptado')
    res.send(encryptedBody)
})
    
//POST METHOD/////////////////////////////////////////////////////////////////////////////////////    
app.post('/decrypt', (req, res) => {

var dado = req.body
console.log('################log#####################') 
console.log(dado)
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
CryptoJS = require("crypto-js");

const keySize = 256;
const iterations = 1035;
const pass = CryptoJS.enc.Utf8.parse('2DD370CDC573491550BAB80BCF2115EA');
const salt = CryptoJS.enc.Utf8.parse('14DDAF26');
const iv   = CryptoJS.enc.Utf8.parse('3CA8682A94E09EEC');

const key = CryptoJS.PBKDF2(pass, salt, { keySize: keySize / 32, iterations });

utils = {

  decryptToJSON: value => {
      const decrypted = CryptoJS.AES.decrypt(value, key, { iv })
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  },

}

const decrypted = utils.decryptToJSON(dado);

console.log(decrypted);
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
res.send(decrypted)
})    
} 