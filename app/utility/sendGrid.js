const sendGrid = require('@sendgrid/mail');

const config = require('../config/development.json');

const sendWelcomeMail = async (user) => {
    sendGrid.setApiKey(config.sendGrid.apiKey);
    const msg = {
        to: user.email,
        from: 'developers@kisan-sewa.co',
        subject: 'Welcome',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            width: 100%;
                        }
                        div {
                            width: 800px;
                            margin: 0 auto;
                            border: solid black 1px;
                            -webkit-box-shadow: 3px 3px 45px 0px rgba(0, 0, 0, 0.75);
                            -moz-box-shadow: 3px 3px 45px 0px rgba(0, 0, 0, 0.75);
                            box-shadow: 3px 3px 45px 0px rgba(0, 0, 0, 0.75);
                        }
                        h1 {
                            background-color: #0275d8;
                            padding: 30px 0px;
                            color: #f7f7f7;
                        }
                        h1, h2, h3, p {
                            text-align: center;
                        }
                        a {
                            box-shadow:inset 0px -3px 7px 0px #29bbff;
                            background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
                            background-color:#2dabf9;
                            border-radius:3px;
                            border:1px solid #0b0e07;
                            display:inline-block;
                            cursor:pointer;
                            font-family:Arial;
                            font-size:15px;
                            padding:9px 23px;
                            text-decoration:none;
                            text-shadow:0px 1px 0px #263666;
                            margin: 30px 0px;
                            margin-left: 43%;
                            color: black;
                            font-weight: bold;
                        }
                        a:hover {
                            background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
                            background-color:#0688fa;
                            top: 1px;
                            color: white;
                        }
                        a:active {
                            position:relative;
                            top:2px;
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <h1>Welcome on board</h1>
                        <h2>Hi, ${user.name}!</h2>
                        <h3>Use these credentials to verify your account and please update your password.</h3>
                        <p>Username: <strong>${user.username}</strong></p>
                        <p>Password: <strong>${user.password}</strong></p>
                        <a href="https://kisan-sewa.herokuapp.com/kisan/login">Click to login</a>
                    </div>
                </body>
            </html>
        `,
    };
    try {
        await sendGrid.send(msg);
    } catch (error) {
        throw error.toString();
    }
};

module.exports = {
    sendWelcomeMail,
};
