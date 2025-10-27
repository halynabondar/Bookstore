# config/boot.rb
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.

# Disable Bootsnap when running in CI or test mode
if ENV["CI"].nil? && ENV["RAILS_ENV"] != "test"
  require "bootsnap/setup"
end