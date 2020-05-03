const Newsletter = require('./newsletterModel');

const newsLetter = async (param) => {
    try {
        const lang = param.lang;
        const emailExists = await Newsletter.findOne({ email: param.email });
        if (emailExists) {
            if (lang === 'hi') {
                throw 'आप पहले से ही सदस्य हैं।';
            } else {
                throw 'Already subscribed';
            }
        } else {
            const newSub = new Newsletter(param);
            await newSub.save();
            if (lang === 'hi') {
                return {
                    message: 'सदस्यता सफल',
                    detail:
                        'आप हमारे आधुनिक साप्ताहिक समाचार पत्र की सदस्यता ले चुके हैं।',
                };
            } else {
                return {
                    message: 'Subscription Successful',
                    detail:
                        'You have been subscribed to our modern weekly newsletter.',
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    newsLetter,
};
