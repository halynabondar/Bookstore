# config/initializers/devise.rb
# Ensure Devise is loaded before Zeitwerk eager load in test/CI
require 'devise'