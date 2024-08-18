const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')

const testnet = bitcoin.networks.testnet;

const fac = BIP32Factory(ecc);

const mnemonic = bip39.generateMnemonic();
console.log(`Frase Mnêmica: ${mnemonic}`);

const seed = bip39.mnemonicToSeedSync(mnemonic);

const root = fac.fromSeed(seed, testnet);

const account = root.derivePath("m/44'/1'/0'/0/0");
const keyPair = bitcoin.payments.p2pkh({
	pubkey: account.publicKey,
	network: testnet,
});

console.log(`Endereço de Testnet: ${keyPair.address}`);
console.log(`Chave Privada: ${account.toWIF()}`);
