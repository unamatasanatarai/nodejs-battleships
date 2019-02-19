module.exports = {
    makeZeroFilledRectangle: (width, height) => {
        const resultArray = Array(height);
        for (let i = 0; i < height; i++) {
            resultArray[i] = Array(width).fill(0);
        }
        return resultArray;
    }
};
