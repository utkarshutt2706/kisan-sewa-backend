const User = require('./userModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerUser = async (userParam) => {
    try {
        const lang = userParam.lang;
        if (await User.findOne({ email: userParam.email })) {
            if (lang === 'hi') {
                throw 'ईमेल पहले से ही पंजीकृत हैईमेल पहले से ही पंजीकृत है';
            } else {
                throw 'Email already registered';
            }
        } else if (await User.findOne({ phone: userParam.phone })) {
            if (lang === 'hi') {
                throw 'फ़ोन नंबर पहले से पंजीकृत है';
            } else {
                throw 'Phone number already registered';
            }
        } else {
            const user = new User(userParam);
            let username = generateString();
            while (await User.findOne({ username: `user-${username}` })) {
                username = generateString();
            }
            user.username = `user-${username}`;
            user.password = generateString();
            await sendGrid.sendWelcomeMail(user);
            await user.save();
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

const loginUser = async (userParam) => {
    try {
        const lang = userParam.lang;
        const userByEmail = await User.findOne({
            email: userParam.username,
        });
        const userByUsername = await User.findOne({
            username: userParam.username,
        });
        if (userByEmail || userByUsername) {
            if (userByUsername) {
                if (userByUsername.password === userParam.password) {
                    const email = userByUsername.email;
                    const isVerified = userByUsername.isVerified;
                    return { email, isVerified };
                } else {
                    if (lang === 'hi') {
                        throw 'पासवर्ड गलत है';
                    } else {
                        throw 'Incorrect password';
                    }
                }
            }
            if (userByEmail) {
                if (userByEmail.password === userParam.password) {
                    const email = userByEmail.email;
                    const isVerified = userByEmail.isVerified;
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
    registerUser,
    loginUser,
};
