import mailer from "nodemailer";

const mailTransporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// const html1 = '<body style="background-color:#9cfd99"><p style="color:#000000;">';
// const html2 = '</p></body>';

export async function sendEmail(receiverEmail, subject, textContent) {
    let mailDetails = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: subject,
        text: textContent,
        // html: textContent
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




