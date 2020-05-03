const Seller = require('./sellerModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerSeller = async (sellerParam) => {
    try {
        const lang = boothParam.lang;
        if (await Seller.findOne({ email: sellerParam.email })) {
            if (lang === 'hi') {
                throw 'ईमेल पहले से ही पंजीकृत हैईमेल पहले से ही पंजीकृत है';
            } else {
                throw 'Email already registered';
            }
        } else if (await Seller.findOne({ phone: sellerParam.phone })) {
            if (lang === 'hi') {
                throw 'फ़ोन नंबर पहले से पंजीकृत है';
            } else {
                throw 'Phone number already registered';
            }
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
            if (lang === 'hi') {
                return {
                    message: 'पंजीकरण सफल',
                    detail:
                        'आपके ईमेल आईडी पर एक मेल भेजा गया है जिसमें आपका उपयोगकर्ता नाम और पासवर्ड है। इसे अपने खाते में लॉगिन करने के लिए उपयोग करें।',
                };
            } else {
                return {
                    message: 'Registered successfully',
                    detail:
                        'A mail has been sent to your email ID containing your username and password. Use it to login into your account.',
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

const loginSeller = async (sellerParam) => {
    try {
        const lang = boothParam.lang;
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
                    if (lang === 'hi') {
                        throw 'पासवर्ड गलत है';
                    } else {
                        throw 'Incorrect password';
                    }
                }
            }
            if (sellerByEmail) {
                if(sellerByEmail.password === sellerParam.password) {
                    const email = sellerByEmail.email;
                const isVerified = sellerByEmail.isVerified;
                return { email, isVerified };
                } else {
                    if (lang === 'hi') {
                        throw 'पासवर्ड गलत है';
                    } else {
                        throw 'Incorrect password';
                    }
                }
            }
        } else {
            if (lang === 'hi') {
                throw 'आप पंजीकृत नहीं हैं। कृपया पहले पंजीकरण करें!';
            } else {
                throw 'You are not registered. Please register first!';
            }
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerSeller,
    loginSeller
};