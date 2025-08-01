function lagrangeInterpolationBigInt(points, x0) {
    let result = 0n;
    const k = points.length;
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let numerator = 1n;
        let denominator = 1n;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                numerator *= (x0 - xj);
                denominator *= (xi - xj);
            }
        }
        let term = yi * numerator / denominator;
        result += term;
    }
    return result;
}
module.exports = { lagrangeInterpolationBigInt };
