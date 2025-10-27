Rails.application.routes.draw do
  use_doorkeeper
  get "up" => "rails/health#show", as: :rails_health_check
  resources :books, only: %i[index show]

  get '/check_books', to: 'books#check'
end