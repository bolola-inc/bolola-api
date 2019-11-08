/**
 * @file This file contains utility functions to be used by other services
 */
const _ = require('lodash');
const gid_crypto = require('globalid-crypto-library');
const jwt = require('jsonwebtoken');

/**
 * Getting tokens for the PII from the ID token
 * @param id_token - ID token from globalid
 */
async function getTokensForThePII (id_token) {
    const decoded_token = jwt.decode(id_token);
    let consents = await _.filter(decoded_token, (value, index)=> {
        return _.includes(index, 'idp.globalid.net/claims/') && _.isEmpty(value) !== true
    });

    return _.flattenDeep(await Promise.all(consents.map(decryptedConsent)));
}

/**
 * Decrypting consents
 * @param consent - Consent object
 */
async function decryptedConsent (consent) {
    return Promise.all(
        _.map(consent, async (values) =>
            Promise.all(
                _.map(values, async (value) =>
                    gid_crypto.default.rsa.decrypt({
                        key: process.env.PRIVATE_KEY,
                        passphrase: process.env.PRIVATE_KEY_PASSPHPHRASE,
                    }, value),
                ),
            ),
        ),
    )
}

/**
 * Decrypts password
 */
async function decryptPIIPassword (enc_password) {
  return await  gid_crypto.default.rsa.decrypt({
        key: process.env.PRIVATE_KEY,
        passphrase: process.env.PRIVATE_KEY_PASSPHPHRASE,
  }, enc_password)
}

/**
 * Decrypting values
 * @param password - encrypted password
 * @param enc_value - encrypted value
 */
async function decryptingPIIData(password, enc_value) {
  const value = await gid_crypto.default.aes.decrypt(enc_value, password);

  return JSON.parse(value)
}

module.exports = { getTokensForThePII, decryptPIIPassword, decryptingPIIData };
