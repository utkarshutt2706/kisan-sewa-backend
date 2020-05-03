const Farmer = require('./farmerModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerFarmer = async (farmerParam) => {
    try {
        const lang = farmerParam.lang;
        if (await Farmer.findOne({ email: farmerParam.email })) {
            if (lang === 'hi') {
                throw 'ईमेल पहले से ही पंजीकृत हैईमेल पहले से ही पंजीकृत है';
            } else {
                throw 'Email already registered';
            }
        } else if (await Farmer.findOne({ phone: farmerParam.phone })) {
            if (lang === 'hi') {
                throw 'फ़ोन नंबर पहले से पंजीकृत है';
            } else {
                throw 'Phone number already registered';
            }
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

const loginFarmer = async (farmerParam) => {
    try {
        const lang = farmerParam.lang;
        const farmerByEmail = await Farmer.findOne({
            email: farmerParam.username,
        });
        const farmerByUsername = await Farmer.findOne({
            username: farmerParam.username,
        });
        if (farmerByEmail || farmerByUsername) {
            if (farmerByUsername) {
                if (farmerByUsername.password === farmerParam.password) {
                    const email = farmerByUsername.email;
                    const isVerified = farmerByUsername.isVerified;
                    return { email, isVerified };
                } else {
                    if (lang === 'hi') {
                        throw 'पासवर्ड गलत है';
                    } else {
                        throw 'Incorrect password';
                    }
                }
            }
            if (farmerByEmail) {
                if (farmerByEmail.password === farmerParam.password) {
                    const email = farmerByEmail.email;
                    const isVerified = farmerByEmail.isVerified;
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
    registerFarmer,
    loginFarmer,
};
