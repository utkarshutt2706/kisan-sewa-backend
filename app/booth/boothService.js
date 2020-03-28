const Booth = require('./boothModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerBooth = async (boothParam) => {
    try {
        if (await Booth.findOne({ email: boothParam.email })) {
            throw 'Email already registered';
        } else if (await Booth.findOne({ phone: boothParam.phone })) {
            throw 'Phone number already registered';
        } else {
            const booth = new Booth(boothParam);
            let username = generateString();
            while (await Booth.findOne({ username: `booth-${username}` })) {
                username = generateString();
            }
            booth.username = `booth-${username}`;
            booth.password = generateString();
            await sendGrid.sendWelcomeMail(booth);
            await booth.save();
            return {
                message: 'Registered successfully',
                detail:
                    'A mail has been sent to your email ID containing your username and password. Use it to login into your account.'
            };
        }
    } catch (error) {
        throw error;
    }
};

const loginBooth = async (boothParam) => {
    try {
        const boothByEmail = await Booth.findOne({
            email: boothParam.username
        });
        const boothByUsername = await Booth.findOne({
            username: boothParam.username
        });
        if (boothByEmail || boothByUsername) {
            if (boothByUsername) {
                if (boothByUsername.password === boothParam.password) {
                    const email = boothByUsername.email;
                    const isVerified = boothByUsername.isVerified;
                    return { email, isVerified };
                } else {
                    throw 'Incorrect password';
                }
            }
            if (boothByEmail) {
                if (boothByEmail.password === boothParam.password) {
                    const email = boothByEmail.email;
                    const isVerified = boothByEmail.isVerified;
                    return { email, isVerified };
                } else {
                    throw 'Incorrect password';
                }
            }
        } else {
            throw 'You are not registered. Please register first!';
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerBooth,
    loginBooth
};
