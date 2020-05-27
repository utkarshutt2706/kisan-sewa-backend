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
                    userByUsername.password = null;
                    return userByUsername;
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
                    userByEmail.password = null;
                    return userByEmail;
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

const updateUser = async (bodyObj) => {
    try {
        const lang = bodyObj.lang;
        const user = await User.findOne({ email: bodyObj.email });
        user.name = bodyObj.name;
        user.occupation = bodyObj.occupation;
        user.address = bodyObj.address;
        user.phone = bodyObj.phone;
        if (bodyObj.picture) {
            user.picture = bodyObj.picture;
        }
        await user.save();
        if (lang === 'hi') {
            return {
                message: 'प्रोफाइल को सफलतापूर्वक अपडेट किया गया',
            };
        } else {
            return {
                message: 'Profile updated successfully',
            };
        }
    } catch (error) {
        throw error;
    }
};

const updatePassword = async (param) => {
    try {
        const lang = param.lang;
        const user = await User.findOne({ email: param.email });
        if (user.password === param.currentPass) {
            if (param.newPass === param.currentPass) {
                if (lang === 'hi') {
                    throw 'वर्तमान पासवर्ड और नया पासवर्ड समान नहीं हो सकते';
                } else {
                    throw 'Current password and old password cannot be same';
                }
            } else if(param.newPass === param.confirmPass) {
                user.password = param.newPass;
                await user.save();
                if (lang === 'hi') {
                    return {
                        message: 'पासवर्ड सफलतापूर्वक अपडेट किया गया',
                    };
                } else {
                    return {
                        message: 'Password updated successfully',
                    };
                }
            } else {
                if (lang === 'hi') {
                    throw 'पासवर्ड मेल नहीं खाते';
                } else {
                    throw 'Passwords do not match';
                }
            }
        } else {
            if (lang === 'hi') {
                throw 'मौजूदा पासवर्ड गलत है';
            } else {
                throw 'Incorrect current password';
            }
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    updatePassword,
};
