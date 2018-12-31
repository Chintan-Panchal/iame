# Two factor authentication using Google authenticator with Spring boot and Angular 4+

The Google Authenticator is a Java server library that implements the Time-based One-time Password (TOTP).


## Backend - Spring Boot Java 
AuthController.java is the key file which enables and triggers two factor authentication.

1. ``POST - /auth/requires-two-factor``  This API is responsible to check if user exists with provided credentials and if Yes, then will check if two factor is enable for that user then it will generates totp password by using secret key (i.e. Email/Username), We'll stores it as part of the user profile in DB in future.
Currently we are returning a URL to a QR code, for now we are sending TOTP to our angular client so user can directly enters that. We'll send that password via Email in future.

2. ``POST - /auth/confirm-two-factor`` The user enters the verification code shown in the client in a field that has appeared and clicks “Verify”.
If User doesn't enter correct TOTP then respective error message will be displayed. If enters correct TOTP then User will able to login successfully and see "Dashboard" page for now.



## Frontend - Angular 6 (Nebular bootstrap)
Nebular is a great toolkit to build Rich UI web-application based on Angular, Here you can find reference open source project for the same [Nebular](https://github.com/akveo/nebular). It provides you with a set of native Angular components, themeable components, authentication and security layers easily configurable for your API. At the same time, Nebular allows you to use it together with any other UI library you choose. 

Currently, I've kept a very generic and compact project structure, so can easily integrate future components/pages as and when required.

AuthGuard - We've created one AuthGuard which stores boolean value in sessionStorage based on two factor authentication is done successfully or not. 

LoginComponent - Which consists login related stuff (HTML, TS).

## Testing credentials
Username - iame.user@testing.com
Password - pass1234