const Seller = require('./sellerModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

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

const loginSeller = async (sellerParam) => {
    try {
        const sellerByEmail = await Seller.findOne({
            email: sellerParam.username
        });
        const sellerByUsername = await Seller.findOne({
            username: sellerParam.username
        });
        if (sellerByEmail || sellerByUsername) {
            if (sellerByUsername) {
                if (sellerByUsername.password === sellerParam.password) {
                    const email = sellerByUsername.email;
                    const isVerified = sellerByUsername.isVerified;
                    return { email, isVerified };
                } else {
                    throw 'Incorrect password';
                }
            }
            if (sellerByEmail) {
                if(sellerByEmail.password === sellerParam.password) {
                    const email = sellerByEmail.email;
                const isVerified = sellerByEmail.isVerified;
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
    registerSeller,
    loginSeller
};