const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "b0f3b3f3c39a02",
        pass: "c5716a541ec1f6"
    }
})

exports.send = async (req, res, next) => {
    message = {
        from: "from-example@email.com",
        to: "to-example@email.com",
        subject: "Subject",
        text: req.body.message
    }
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(info)
        }
    })
    
}