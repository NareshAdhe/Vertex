export const getOtpEmailTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f7;
            color: #51545e;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            width: 100% !important;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }
        .email-content {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #4F46E5; /* Indigo-600 */
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            padding: 30px;
            text-align: center;
        }
        .email-body p {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #51545e;
        }
        .otp-code {
            display: inline-block;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #4F46E5;
            background-color: #f0f0f5;
            padding: 15px 30px;
            border-radius: 6px;
            margin: 20px 0;
            border: 1px dashed #4F46E5;
        }
        .email-footer {
            background-color: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b6e76;
        }
        .email-footer p {
            margin: 5px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-content {
                width: 100% !important;
            }
            .email-body {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <!-- Header -->
            <div class="email-header">
                <h1>Verification Code</h1>
            </div>
            
            <!-- Body -->
            <div class="email-body">
                <p>Hello,</p>
                <p>Use the following One-Time Password (OTP) to complete your verification process. This code is valid for <strong>10 minutes</strong>.</p>
                
                <div class="otp-code">${otp}</div>
                
                <p>If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Advanced Auth. All rights reserved.</p>
                <p>This is an automated message, please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const getWelcomeEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Advanced Auth</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f7;
            color: #51545e;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            width: 100% !important;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }
        .email-content {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #10B981; /* Emerald-500 */
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            padding: 30px;
            text-align: center;
        }
        .email-body p {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #51545e;
        }
        .action-button {
            display: inline-block;
            background-color: #10B981;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 6px;
            margin-top: 10px;
        }
        .email-footer {
            background-color: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b6e76;
        }
        .email-footer p {
            margin: 5px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-content {
                width: 100% !important;
            }
            .email-body {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <!-- Header -->
            <div class="email-header">
                <h1>Welcome Aboard!</h1>
            </div>
            
            <!-- Body -->
            <div class="email-body">
                <p>Hi ${name},</p>
                <p>Congratulations! Your account has been successfully verified and created.</p>
                <p>We are thrilled to have you with us. You can now access all the features of Advanced Auth and start building amazing things.</p>
                
                <a href="#" class="action-button">Go to Dashboard</a>
                
                <p style="margin-top: 30px; font-size: 14px; color: #999;">If you have any questions, feel free to reply to this email.</p>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Advanced Auth. All rights reserved.</p>
                <p>This is an automated message, please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
