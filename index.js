// index.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { decodeBaseToBigInt } = require('./modules/decode');
const { lagrangeInterpolationBigInt } = require('./modules/secretKey');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const fileName = await new Promise((resolve) => {
        rl.question("Which test file do you want to run? (test1 or test2): ", answer => {
            rl.close();
            resolve(answer.trim());
        });
    });

    const testFileName = `${fileName}.json`;

    let rawData;
    try {
        rawData = fs.readFileSync(path.join(__dirname, 'data', testFileName), 'utf8');
    } catch (err) {
        console.error(`❌ File not found: ${testFileName}`);
        return;
    }

    const jsonData = JSON.parse(rawData);

    const n = jsonData.keys.n;
    const k = jsonData.keys.k;

    console.log(`\nRunning test case: ${testFileName}`);
    console.log(`Total roots (n): ${n}`);
    console.log(`Minimum roots needed (k): ${k}\n`);

    const points = [];

    for (const key in jsonData) {
        if (key !== 'keys') {
            const x = BigInt(key);
            const base = parseInt(jsonData[key].base, 10);
            const encoded = jsonData[key].value;

            const decodedY = decodeBaseToBigInt(encoded, base);
            console.log(decodedY);
            points.push({ x, y: decodedY });
        }
    }

    const selectedPoints = points.slice(0, k);
    const secret = lagrangeInterpolationBigInt(selectedPoints, 0n);

    console.log(`\n✅ Secret (c) computed at x=0: ${secret}`);
}

main();
