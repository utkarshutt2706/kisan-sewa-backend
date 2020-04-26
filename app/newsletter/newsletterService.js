const Newsletter = require('./newsletterModel');

const newsLetter = async (param) => {
    try {
        const emailExists = await Newsletter.findOne({ email: param.email });
        if (emailExists) {
            throw 'Already subscribed';
        } else {
            const newSub = new Newsletter(param);
            await newSub.save();
            return { message: 'Success' };
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    newsLetter
};
