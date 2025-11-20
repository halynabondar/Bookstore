class GoogleAuthService
  class Error < StandardError; end

  def self.verify(id_token)
    validator = GoogleIDToken::Validator.new
    client_id = ENV["GOOGLE_CLIENT_ID"]

    raise Error, "Missing GOOGLE_CLIENT_ID" if client_id.blank?

    payload = validator.check(id_token, client_id)

    {
      email: payload["email"],
      first_name: payload["given_name"],
      last_name: payload["family_name"],
      email_verified: payload["email_verified"],
      sub: payload["sub"],
      picture: payload["picture"]
    }
  rescue GoogleIDToken::ValidationError => e
    Rails.logger.error("Google ID token validation error: #{e.message}")
    nil
  end
end