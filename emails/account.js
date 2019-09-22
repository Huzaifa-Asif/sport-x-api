const sgMail = require('@sendgrid/mail')

const sgMailApiKey = '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'

sgMail.setApiKey(sgMailApiKey)


module.exports.sendEmail = (email, password) => {
    sgMail.send({
        to: email,
        from: 'sportx8580@gmail.com',
        subject: 'Password Recovery SPORT-X!',
        text: `Hello. your new Password is: ${password} `
    })
}