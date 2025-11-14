Rails.application.routes.draw do
  use_doorkeeper

  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  resources :books, only: %i[index show]

  get '/check_books', to: 'books#check'

  namespace :api do
      post '/login', to: 'sessions#create'
      get '/profile', to: 'users#profile'
      end
end