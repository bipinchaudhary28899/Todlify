const nodemailer = require("nodemailer");

// Function to send email reminder
function SendReminder(issue, title, email) {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ydsandy431@gmail.com",
      pass: "bbdu pwon xczf twge",
    },
  });

  // Create email message based on issue priority
  let subject, text;
  subject = issue + " Priority Issue Reminder";
  text = `This is a reminder for a ${issue} priority issue: ${title}`;

  // Create email options
  const mailOptions = {
    from: "t82837220@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID:", info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }
  });
}

module.exports = SendReminder;
