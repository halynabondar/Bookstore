# config/boot.rb
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.

# Disable Bootsnap when running in test or CI
if ENV["RAILS_ENV"] != "test" && !ENV["CI"]
  require "bootsnap/setup"
end