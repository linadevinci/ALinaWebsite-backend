import bycrypt from "bcryptjs";

export const compareToHash=bycrypt.compareSync;

export function getHashFromClearText(password){
    return bycrypt.hashSync(password, 10);
}