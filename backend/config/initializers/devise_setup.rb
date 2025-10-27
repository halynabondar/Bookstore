# Ensure Devise loads before models are eager-loaded
require "devise"

# Load Devise modules explicitly (avoids Zeitwerk order issues)
Devise.setup do |config|
  # Secret key (use ENV in production)
  config.secret_key = ENV["DEVISE_SECRET_KEY"] || "temporary_devise_secret_key"

  # Configure the mailer sender (Devise requires it)
  config.mailer_sender = "please-change-me@example.com"

  require "devise/orm/active_record"
end