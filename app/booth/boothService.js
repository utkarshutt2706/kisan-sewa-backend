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
            email: boothParam.username,
        });
        const boothByUsername = await Booth.findOne({
            username: boothParam.username,
        });
        if (boothByEmail || boothByUsername) {
            if (boothByUsername) {
                if (boothByUsername.password === boothParam.password) {
                    boothByUsername.password = null;
                    return boothByUsername;
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
                    boothByEmail.password = null;
                    return boothByEmail;
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

const findNearByBooths = async (coords) => {
    try {
        const booths = await Booth.find();
        let distance = [];
        for (i = 0; i < booths.length; i++) {
            distance.push(calcDist(coords.lat, coords.lon, booths[i]));
        }
        let limit;
        if (coords.limit) {
            limit = coords.limit;
        } else {
            limit = 2;
        }
        distance.sort(sortAccDist);
        const slicedArr = distance.slice(0, limit);
        const viewMore = !(slicedArr.length === distance.length);
        return { booths: slicedArr, viewMore };
    } catch (error) {
        throw error;
    }
};

const calcDist = (lat1, lon1, booth) => {
    let lat2 = booth.lat;
    let lon2 = booth.lon;
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        dist = dist.toFixed();
        booth.password = null;
        return { dist, booth };
    }
};

const sortAccDist = (a, b) => {
    if (a.dist < b.dist) {
        return -1;
    } else if (a.dist > b.dist) {
        return 1;
    } else {
        return 0;
    }
};

const updateBooth = async (bodyObj, fileObj) => {
    try {
        const lang = bodyObj.lang;
        const booth = await Booth.findOne({ email: bodyObj.email });
        booth.name = bodyObj.name;
        booth.boothName = bodyObj.boothName;
        booth.address = bodyObj.address;
        booth.phone = bodyObj.phone;
        if (fileObj) {
            booth.picture = `booths/${fileObj.filename}`;
        }
        await booth.save();
        if (lang === 'hi') {
            return {
                message: 'प्रोफाइल को सफलतापूर्वक अपडेट किया गया'
            };
        } else {
            return {
                message: 'Profile updated successfully'
            };
        }
    } catch (error) {
        throw error;
    }
};

const updatePassword = async (param) => {
    try {
        const lang = param.lang;
        const booth = await Booth.findOne({ email: param.email });
        if (booth.password === param.currentPass) {
            if (param.newPass === param.currentPass) {
                if (lang === 'hi') {
                    throw 'वर्तमान पासवर्ड और नया पासवर्ड समान नहीं हो सकते';
                } else {
                    throw 'Current password and old password cannot be same';
                }
            } else if(param.newPass === param.confirmPass) {
                booth.password = param.newPass;
                await booth.save();
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
}

module.exports = {
    registerBooth,
    loginBooth,
    findNearByBooths,
    updateBooth,
    updatePassword,
};
