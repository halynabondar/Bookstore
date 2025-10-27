ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
require "bundler/setup"

# Only load bootsnap in non-test, non-CI environments
if ENV["RAILS_ENV"] != "test" && !ENV["CI"]
  require "bootsnap/setup"
end