package iame.twofactor.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;

import iame.twofactor.exception.InvalidCredentialsException;
import iame.twofactor.model.TwoFactorAuth;

@RestController
@RequestMapping(value = "/auth", method = RequestMethod.POST)
public class AuthController {

	private static final Logger log = LoggerFactory.getLogger(AuthController.class);

	@Value("${2fa.enabled}")
	private boolean isTwoFaEnabled;

	@Value("${2fa.issuer}")
	private String authIssuer;

	@Value("${user.email}")
	private String username;

	@Value("${user.password}")
	private String password;

	@RequestMapping(value = "/confirm-two-factor", method = RequestMethod.POST)
	@ResponseBody
	public boolean confirmTwoFactorAuth(@RequestBody TwoFactorAuth auth) throws InvalidCredentialsException {
		if (auth.getUsername().equals(username) && auth.getPassword().equals(password)) {
			GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();

			// checks the validity of the specified password against the provided
			// secretKey(i.e. 'username')
			boolean result = googleAuthenticator.authorize(auth.getUsername(), auth.getTotp());
			return result;
		}
		throw new InvalidCredentialsException("Incorrect Secret.");
	}

	@RequestMapping(value = "/requires-two-factor", method = RequestMethod.POST)
	@ResponseBody
	public TwoFactorAuth requiresTwoFactor(@RequestBody TwoFactorAuth auth) throws InvalidCredentialsException {
		// If user name and password are valid and isTwoFactor required then return true
		if (auth.getUsername().equals(username) && auth.getPassword().equals(password)) {
			if (isTwoFaEnabled) {
				GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();
				GoogleAuthenticatorKey googleAuthenticatorKey = googleAuthenticator.createCredentials();

				// Generate TOTP by providing username as a secret, we can send TOTP by email in
				// future.
				auth.setTotp(googleAuthenticator.getTotpPassword(auth.getUsername()));

				// Generate QR with account name & email
				auth.setQrUrl(GoogleAuthenticatorQRGenerator.getOtpAuthURL(authIssuer, auth.getUsername(),
						googleAuthenticatorKey));

				return auth;
			}
		}
		throw new InvalidCredentialsException("Incorrect login details.");
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public void logout() {
		SecurityContextHolder.clearContext();
	}

}
