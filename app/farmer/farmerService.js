const Farmer = require('./farmerModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerFarmer = async (farmerParam) => {
    try {
        if (await Farmer.findOne({ email: farmerParam.email })) {
            throw 'Email already registered';
        } else if (await Farmer.findOne({ phone: farmerParam.phone })) {
            throw 'Phone number already registered';
        } else {
            const farmer = new Farmer(farmerParam);
            let username = generateString();
            while (await Farmer.findOne({ username: `farmer-${username}` })) {
                username = generateString();
            }
            farmer.username = `farmer-${username}`;
            farmer.password = generateString();
            await sendGrid.sendWelcomeMail(farmer);
            await farmer.save();
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

const loginFarmer = async (farmerParam) => {
    try {
        const farmerByEmail = await Farmer.findOne({
            email: farmerParam.username
        });
        const farmerByUsername = await Farmer.findOne({
            username: farmerParam.username
        });
        if (farmerByEmail || farmerByUsername) {
            if (farmerByUsername) {
                if (farmerByUsername.password === farmerParam.password) {
                    const email = farmerByUsername.email;
                    const isVerified = farmerByUsername.isVerified;
                    return { email, isVerified };
                } else {
                    throw 'Incorrect password';
                }
            }
            if (farmerByEmail) {
                if (farmerByEmail.password === farmerParam.password) {
                    const email = farmerByEmail.email;
                    const isVerified = farmerByEmail.isVerified;
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
    registerFarmer,
    loginFarmer
};
