const Booth = require('../booth/boothModel');
const Farmer = require('../farmer/farmerModel');
const Seller = require('../seller/sellerModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const register = async (param) => {
    try {
        console.log(param);
        switch (param.registerAs) {
            case 'farmer':
                return registerFarmer(param);
            case 'seller':
                return registerSeller(param);
            case 'booth':
                return registerBooth(param);
            default:
                throw 'Invalid request';
        }
    } catch (error) {
        throw error;
    }
};

const login = async (param) => {
    try {
        switch (param.registerAs) {
            case 'farmer':
                return param;
            case 'seller':
                return param;
            case 'booth':
                return param;
            default:
                throw 'Invalid request';
        }
    } catch (error) {
        throw error;
    }
}

const forgotPassword = async () => {
    try {
        
    } catch (error) {
        throw error;
    }
}

const resetPassword = async () => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};

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
                detail: 'A mail has been sent to your email ID containing your username and password. Use it to login into your account.'
            };
        }
    } catch (error) {
        throw error;
    }
};

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
                detail: 'A mail has been sent to your email ID containing your username and password. Use it to login into your account.'
            };
        }
    } catch (error) {
        throw error;
    }
};

const registerSeller = async (sellerParam) => {
    try {
        if (await Seller.findOne({ email: sellerParam.email })) {
            throw 'Email already registered';
        } else if (await Seller.findOne({ phone: sellerParam.phone })) {
            throw 'Phone number already registered';
        } else {
            const seller = new Seller(sellerParam);
            let username = generateString();
            while (await Seller.findOne({ username: `seller-${username}` })) {
                username = generateString();
            }
            seller.username = `seller-${username}`;
            seller.password = generateString();
            await sendGrid.sendWelcomeMail(seller);
            await seller.save();
            return { 
                message: 'Registered successfully',
                detail: 'A mail has been sent to your email ID containing your username and password. Use it to login into your account.'
            };
        }
    } catch (error) {
        throw error;
    }
};
