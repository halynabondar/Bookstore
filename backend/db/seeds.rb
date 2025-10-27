books = [
  {
    title: "The Hobbit",
    genre: "Fantasy",
    author: "J.R.R. Tolkien",
    icon: "🧙‍♂️",
    price: 15,
    average_review_score: 4.8,
    number_of_review: 1250
  },
  {
    title: "1984",
    genre: "Dystopian",
    author: "George Orwell",
    icon: "📘",
    price: 12,
    average_review_score: 4.6,
    number_of_review: 980
  },
  {
    title: "Pride and Prejudice",
    genre: "Romance",
    author: "Jane Austen",
    icon: "💌",
    price: 10,
    average_review_score: 4.7,
    number_of_review: 1100
  }
]

books.each do |attrs|
  Book.find_or_create_by!(title: attrs[:title]) do |book|
    book.genre = attrs[:genre]
    book.author = attrs[:author]
    book.icon = attrs[:icon]
    book.price = attrs[:price]
    book.average_review_score = attrs[:average_review_score]
    book.number_of_review = attrs[:number_of_review]
  end
end

puts "✅ Seeded #{Book.count} books!"