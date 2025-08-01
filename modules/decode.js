function decodeBaseToBigInt(str, base) {
    let result = 0n;
    const bigBase = BigInt(base);
    for (let i = 0; i < str.length; i++) {
        let digit = parseInt(str[i], 36); 
        result = result * bigBase + BigInt(digit);
    }
    return result;
}
module.exports = { decodeBaseToBigInt };
