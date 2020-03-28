const generateString = () => {
    const string = Math.random().toString(36).slice(2);
    return string;
}

module.exports = generateString;