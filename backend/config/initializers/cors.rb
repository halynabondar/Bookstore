# Be sure to restart your server when you modify this file.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow both your deployed frontend and your local dev server
    origins 'https://bookstore-neon-pi.vercel.app', 'http://localhost:5173'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization],
             credentials: true
  end
end