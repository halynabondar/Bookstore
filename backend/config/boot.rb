# config/boot.rb
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.

# Disable Bootsnap in test environment (it causes FrozenError sometimes)
unless ENV["RAILS_ENV"] == "test"
  require "bootsnap/setup"
end