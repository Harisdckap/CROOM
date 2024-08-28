<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
        
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #f1f1f1;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
            text-align: center;
        }
        .content img {
            width: 150px;
            height: auto;
            margin-bottom: 20px;
        }
        .content h2 {
            font-size: 22px;
            color: #333333;
            margin: 20px 0 10px;
        }
        .content p {
            font-size: 16px;
            color: #555555;
            margin: 10px 0;
        }
        .content h3 {
            font-size: 28px;
            color: #26a4d3;
            margin: 10px 0 20px;
        }
        .button {
            background-color: #26a4d3;
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>C-room</h1>
        </div>
        <div class="content">
            <!-- <img src="./image/otp.png" alt="Logo"> -->
            <img src="{{ asset('images/otp.png') }}" alt="Logo" />

            <h2>Your OTP Code</h2>
            <p>Thank you for registering with C-room. Please use the following OTP to verify your account:</p>
            <h3>{{ $otp }}</h3>
            <p>This OTP will expire in 10 minutes.</p>
            <a href="http://localhost:5173/verifyotp?token={{ $auth_token }}" class="button">Verify OTP</a>
        </div>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>&copy; 2024 C-room. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
