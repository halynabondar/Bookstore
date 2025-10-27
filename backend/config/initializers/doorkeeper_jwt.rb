Doorkeeper::JWT.configure do
  # Define what goes inside the JWT payload
  token_payload do |opts|
    user = User.find(opts[:resource_owner_id])

    {
      iss: 'BookstoreApp',         # Issuer
      iat: Time.current.to_i,      # Issued at timestamp
      sub: user.id,                # Subject (user id)
      email: user.email            # Extra field
    }
  end

  # Use Rails secret key to sign the JWT
  secret_key Rails.application.secret_key_base
  signing_method :hs256
end