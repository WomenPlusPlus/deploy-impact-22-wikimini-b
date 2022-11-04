import mailer from "nodemailer";

const mailTransporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendTextEmail(receiverEmail, subject, textContent) {
    let mailDetails = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: subject,
        text: textContent
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error occured while sending email');
            throw Error("Error occured while sending email: " + err);
        } else {
            console.log('Email sent successfully');
            return true;
        }
    });
}



