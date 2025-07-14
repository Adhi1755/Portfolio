// app/api/contact/route.js

import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Validate required fields
  if (!name || !email || !message) {
    return Response.json(
      { message: 'Missing required fields: name, email, and message are required' },
      { status: 400 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      { message: 'Invalid email format' },
      { status: 400 }
    );
  }

  try {
    // Debug: Log environment variables (without exposing sensitive data)
    console.log('EMAIL_USER configured:', !!process.env.EMAIL_USER);
    console.log('EMAIL_PASS configured:', !!process.env.EMAIL_PASS);
    
    // Create transporter with your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Alternative SMTP configuration for Gmail (try this if service: 'gmail' doesn't work)
    /*
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    */

    // Test the connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 0 5px 5px 0;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #6c757d; text-align: center;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
      // Also include plain text version
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This email was sent from your website contact form.
      `,
      // Set reply-to as the sender's email
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    return Response.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Return different error messages based on the error type
    if (error.code === 'EAUTH') {
      return Response.json(
        { message: 'Email authentication failed. Please check your credentials.' },
        { status: 500 }
      );
    } else if (error.code === 'ECONNECTION') {
      return Response.json(
        { message: 'Failed to connect to email server. Please try again later.' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { 
          message: 'Failed to send email. Please try again later.',
          error: error.message,
          code: error.code 
        },
        { status: 500 }
      );
    }
  }
}