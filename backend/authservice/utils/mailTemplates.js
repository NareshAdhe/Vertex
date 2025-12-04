export const getOtpEmailTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vertex Verification Code</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            width: 100% !important;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 20px;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .email-header {
            background-color: #0f172a; /* Slate-900 */
            padding: 32px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .email-body {
            padding: 40px 32px;
            text-align: center;
        }
        .email-body p {
            margin-bottom: 24px;
            line-height: 1.6;
            font-size: 16px;
            color: #475569;
        }
        .otp-code {
            display: inline-block;
            font-family: 'Courier New', Courier, monospace;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #0f172a;
            background-color: #f1f5f9;
            padding: 24px 48px;
            border-radius: 8px;
            margin: 32px 0;
            border: 2px solid #e2e8f0;
        }
        .email-footer {
            background-color: #f8fafc;
            padding: 32px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
        }
        .email-footer p {
            margin: 8px 0;
        }
        .brand-name {
            color: #0f172a;
            font-weight: 600;
        }
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 10px !important;
            }
            .email-content {
                width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                box-shadow: none !important;
            }
            .email-header {
                padding: 24px !important;
            }
            .email-header h1 {
                font-size: 24px !important;
            }
            .email-body {
                padding: 24px !important;
            }
            .otp-code {
                font-size: 28px !important;
                padding: 20px 24px !important;
                letter-spacing: 4px !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <div style="display: inline-flex; align-items: center; justify-content: center;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;">
                        <defs>
                            <linearGradient id="logo_grad_v" x1="12" y1="6" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#06b6d4" />
                                <stop offset="1" stop-color="#2563eb" />
                            </linearGradient>
                            <linearGradient id="logo_grad_d" x1="12" y1="3" x2="12" y2="13" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#67e8f9" />
                                <stop offset="1" stop-color="#06b6d4" />
                            </linearGradient>
                        </defs>
                        <path d="M2 6L12 23L22 6H17L12 16L7 6H2Z" fill="url(#logo_grad_v)" />
                        <path d="M12 3L15 8L12 13L9 8L12 3Z" fill="url(#logo_grad_d)" />
                    </svg>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vertex</h1>
                </div>
            </div>
            
            <div class="email-body">
                <p>Hello,</p>
                <p>Please use the verification code below to securely sign in to your Vertex account. This code will expire in <strong>10 minutes</strong>.</p>
                
                <div class="otp-code">${otp}</div>
                
                <p>If you did not request this code, please disregard this email. Your account security is important to us.</p>
            </div>
            
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} <span class="brand-name">Vertex</span>. All rights reserved.</p>
                <p>Secure Authentication Service</p>
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
    <title>Welcome to Vertex</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            width: 100% !important;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 20px;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .email-header {
            background-color: #0f172a;
            padding: 32px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .email-body {
            padding: 40px 32px;
            text-align: center;
        }
        .email-body p {
            margin-bottom: 24px;
            line-height: 1.6;
            font-size: 16px;
            color: #475569;
        }
        .action-button {
            display: inline-block;
            background-color: #2563eb; /* Blue-600 */
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            padding: 16px 32px;
            border-radius: 8px;
            margin-top: 16px;
            transition: background-color 0.2s;
        }
        .action-button:hover {
            background-color: #1d4ed8;
        }
        .email-footer {
            background-color: #f8fafc;
            padding: 32px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
        }
        .email-footer p {
            margin: 8px 0;
        }
        .brand-name {
            color: #0f172a;
            font-weight: 600;
        }
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 10px !important;
            }
            .email-content {
                width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                box-shadow: none !important;
            }
            .email-header {
                padding: 24px !important;
            }
            .email-header h1 {
                font-size: 24px !important;
            }
            .email-body {
                padding: 24px !important;
            }
            .action-button {
                width: 100% !important;
                box-sizing: border-box !important;
                text-align: center !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <div style="display: inline-flex; align-items: center; justify-content: center;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;">
                        <defs>
                            <linearGradient id="logo_grad_v" x1="12" y1="6" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#06b6d4" />
                                <stop offset="1" stop-color="#2563eb" />
                            </linearGradient>
                            <linearGradient id="logo_grad_d" x1="12" y1="3" x2="12" y2="13" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#67e8f9" />
                                <stop offset="1" stop-color="#06b6d4" />
                            </linearGradient>
                        </defs>
                        <path d="M2 6L12 23L22 6H17L12 16L7 6H2Z" fill="url(#logo_grad_v)" />
                        <path d="M12 3L15 8L12 13L9 8L12 3Z" fill="url(#logo_grad_d)" />
                    </svg>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vertex</h1>
                </div>
            </div>
            
            <div class="email-body">
                <p>Hi ${name},</p>
                <p>Welcome to <strong>Vertex</strong>! We're excited to have you on board.</p>
                <p>Your account has been successfully verified. You now have full access to our secure platform and all its features.</p>
                
                <a href="#" class="action-button">Go to Dashboard</a>
                
                <p style="margin-top: 40px; font-size: 14px; color: #64748b;">If you have any questions, our support team is always here to help.</p>
            </div>
            
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} <span class="brand-name">Vertex</span>. All rights reserved.</p>
                <p>Secure Authentication Service</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const getResetEmailTemplate = (resetUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Vertex Password</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            width: 100% !important;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 20px;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .email-header {
            background-color: #0f172a;
            padding: 32px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .email-body {
            padding: 40px 32px;
            text-align: center;
        }
        .email-body p {
            margin-bottom: 24px;
            line-height: 1.6;
            font-size: 16px;
            color: #475569;
        }
        .reset-button {
            display: inline-block;
            background-color: #ef4444; /* Red-500 */
            color: #ffffff !important;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            padding: 16px 32px;
            border-radius: 8px;
            margin: 24px 0;
            transition: background-color 0.2s;
        }
        .reset-button:hover {
            background-color: #dc2626;
        }
        .info-box {
            background-color: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            margin: 24px 0;
            text-align: left;
            border-radius: 4px;
        }
        .info-box p {
            margin: 0;
            font-size: 14px;
            color: #1e40af;
        }
        .email-footer {
            background-color: #f8fafc;
            padding: 32px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
        }
        .email-footer p {
            margin: 8px 0;
        }
        .brand-name {
            color: #0f172a;
            font-weight: 600;
        }
        .link-text {
            color: #ef4444;
            word-break: break-all;
            font-size: 13px;
        }
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 10px !important;
            }
            .email-content {
                width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                box-shadow: none !important;
            }
            .email-header {
                padding: 24px !important;
            }
            .email-header h1 {
                font-size: 24px !important;
            }
            .email-body {
                padding: 24px !important;
            }
            .reset-button {
                width: 100% !important;
                box-sizing: border-box !important;
                text-align: center !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <div style="display: inline-flex; align-items: center; justify-content: center;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;">
                        <defs>
                            <linearGradient id="logo_grad_v" x1="12" y1="6" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#06b6d4" />
                                <stop offset="1" stop-color="#2563eb" />
                            </linearGradient>
                            <linearGradient id="logo_grad_d" x1="12" y1="3" x2="12" y2="13" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#67e8f9" />
                                <stop offset="1" stop-color="#06b6d4" />
                            </linearGradient>
                        </defs>
                        <path d="M2 6L12 23L22 6H17L12 16L7 6H2Z" fill="url(#logo_grad_v)" />
                        <path d="M12 3L15 8L12 13L9 8L12 3Z" fill="url(#logo_grad_d)" />
                    </svg>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vertex</h1>
                </div>
            </div>
            
            <div class="email-body">
                <p>Hello,</p>
                <p>We received a request to reset the password for your Vertex account. If you made this request, please click the button below to securely reset your password:</p>
                
                <a href="${resetUrl}" class="reset-button">Reset Password</a>
                
                <div class="info-box">
                    <p><strong>Note:</strong> This link is valid for <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email. Your account remains secure.</p>
                </div>
                
                <p style="margin-top: 32px; font-size: 13px; color: #94a3b8;">
                    Having trouble with the button? Copy and paste this link into your browser:<br>
                    <span class="link-text">${resetUrl}</span>
                </p>
            </div>
            
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} <span class="brand-name">Vertex</span>. All rights reserved.</p>
                <p>Secure Authentication Service</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
