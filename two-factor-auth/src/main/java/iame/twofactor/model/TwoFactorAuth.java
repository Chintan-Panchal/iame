package iame.twofactor.model;

public class TwoFactorAuth {

	private String username;
	private String password;
	private Integer totp;
	private String qrUrl;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getTotp() {
		return totp;
	}

	public void setTotp(Integer totp) {
		this.totp = totp;
	}

	public String getQrUrl() {
		return qrUrl;
	}

	public void setQrUrl(String qrUrl) {
		this.qrUrl = qrUrl;
	}

}
