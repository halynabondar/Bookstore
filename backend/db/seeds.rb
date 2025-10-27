books = [
  {
    title: "The Hobbit",
    genre: "Fantasy",
    author: "J.R.R. Tolkien",
    icon: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    price: 15,
    average_review_score: 4.8,
    number_of_review: 1250
  },
  {
    title: "1984",
    genre: "Dystopian",
    author: "George Orwell",
    icon: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    price: 12,
    average_review_score: 4.6,
    number_of_review: 980
  },
  {
    title: "Pride and Prejudice",
    genre: "Romance",
    author: "Jane Austen",
    icon: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    price: 10,
    average_review_score: 4.7,
    number_of_review: 1100
  },
  {
    title: "The Great Gatsby",
    genre: "Classic",
    author: "F. Scott Fitzgerald",
    icon: "https://covers.openlibrary.org/b/id/7222248-L.jpg",
    price: 14,
    average_review_score: 4.5,
    number_of_review: 890
  },
  {
    title: "Harry Potter and the Sorcerer’s Stone",
    genre: "Fantasy",
    author: "J.K. Rowling",
    icon: "https://covers.openlibrary.org/b/id/7884861-L.jpg",
    price: 18,
    average_review_score: 4.9,
    number_of_review: 2500
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

puts "✅ Seeded #{Book.count} books with images!"