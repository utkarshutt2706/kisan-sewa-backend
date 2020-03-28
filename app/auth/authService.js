const { registerFarmer, loginFarmer } = require('../farmer/farmerService');
const { registerSeller, loginSeller } = require('../seller/sellerService');
const { registerBooth, loginBooth } = require('../booth/boothService');

const register = async (param) => {
    try {
        switch (param.registerAs) {
            case 'farmer':
                return await registerFarmer(param);
            case 'seller':
                return await registerSeller(param);
            case 'booth':
                return await registerBooth(param);
            default:
                throw 'Invalid request';
        }
    } catch (error) {
        throw error;
    }
};

const login = async (param) => {
    try {
        switch (param.loginAs) {
            case 'farmer':
                return await loginFarmer(param);
            case 'seller':
                return await loginSeller(param);
            case 'booth':
                return await loginBooth(param);
            default:
                throw 'Invalid request';
        }
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (param) => {
    try {
        switch (param.forgotAs) {
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
};

const resetPassword = async (param) => {
    try {
        switch (param.resetAs) {
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
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};
