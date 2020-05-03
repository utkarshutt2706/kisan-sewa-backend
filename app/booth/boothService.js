const Booth = require('./boothModel');
const generateString = require('../utility/randomString');
const sendGrid = require('../utility/sendGrid');

const registerBooth = async (boothParam) => {
    try {
        const lang = boothParam.lang;
        if (await Booth.findOne({ email: boothParam.email })) {
            if (lang === 'hi') {
                throw 'ईमेल पहले से ही पंजीकृत हैईमेल पहले से ही पंजीकृत है';
            } else {
                throw 'Email already registered';
            }
        } else if (await Booth.findOne({ phone: boothParam.phone })) {
            if (lang === 'hi') {
                throw 'फ़ोन नंबर पहले से पंजीकृत है';
            } else {
                throw 'Phone number already registered';
            }
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

const loginBooth = async (boothParam) => {
    try {
        const lang = boothParam.lang;
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
                    if (lang === 'hi') {
                        throw 'पासवर्ड गलत है';
                    } else {
                        throw 'Incorrect password';
                    }
                }
            }
            if (boothByEmail) {
                if (boothByEmail.password === boothParam.password) {
                    const email = boothByEmail.email;
                    const isVerified = boothByEmail.isVerified;
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
    registerBooth,
    loginBooth
};
