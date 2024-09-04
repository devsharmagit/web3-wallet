import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

export const makeWallet = (seedHash: string, walletIndex: number)=>{
    try {
        const path = `m/44'/501'/${walletIndex || 0}'/0'`;
        const derivedSeed = derivePath(path, seedHash || '').key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const publickKey = keypair.publicKey.toBase58()
        const privateKey = bs58.encode(keypair.secretKey.slice(0,32))
        return {publickKey, privateKey, path}
    } catch (error) {
        throw error
    }

}