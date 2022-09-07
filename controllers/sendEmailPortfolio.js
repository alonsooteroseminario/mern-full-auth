const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmailPortfolio = (toEmail, message, toname) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    let msgHtml = `
                    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Hello ${toname} </h2>
                    <p>Congratulations! Your message was sent to Luis Otero!. He will get in touch with you sooner</p>

                    <h2> Message you sent: </h2>
                    <p> \n\n ${message} </p>
                    </div>
                `

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: toEmail,
        subject: `Hello from Luis Otero!`,
        html: msgHtml
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmailPortfolio