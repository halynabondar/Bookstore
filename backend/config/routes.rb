Rails.application.routes.draw do
  use_doorkeeper

  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  resources :books, only: %i[index show]

  get "/check_books", to: "books#check"

  namespace :api do
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    get "/profile", to: "users#profile"
    patch "/profile", to: "users#update"
    post "/signup", to: "users#create"
    get "/users", to: "users#index"
    post "google_login", to: "sessions#google_login"
  end
end
