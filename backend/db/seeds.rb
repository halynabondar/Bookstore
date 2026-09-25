books = [
  ["The Hobbit", "Fantasy", "J.R.R. Tolkien", 15, "the-hobbit.avif"],
  ["1984", "Dystopian", "George Orwell", 12, "1984.avif"],
  ["Pride and Prejudice", "Romance", "Jane Austen", 10, "pride-and-prejudice.avif"],
  ["The Great Gatsby", "Classic", "F. Scott Fitzgerald", 14, "the-great-gatsby.avif"],
  ["Harry Potter and the Sorcerer’s Stone", "Fantasy", "J.K. Rowling", 18, "harry-potter.avif"],

  ["The Lord of the Rings", "Fantasy", "J.R.R. Tolkien", 24, "lord-of-the-rings.avif"],
  ["The Fellowship of the Ring", "Fantasy", "J.R.R. Tolkien", 19, "fellowship-of-the-ring.avif"],
  ["The Two Towers", "Fantasy", "J.R.R. Tolkien", 19, "the-two-towers.webp"],
  ["The Return of the King", "Fantasy", "J.R.R. Tolkien", 20, "return-of-the-king.jpg"],
  ["The Lion, the Witch and the Wardrobe", "Fantasy", "C.S. Lewis", 14, "lion-witch-wardrobe.avif"],

  ["Jane Eyre", "Classic", "Charlotte Brontë", 13, "jane-eyre.jpg"],
  ["Little Women", "Classic", "Louisa May Alcott", 12, "little-women.jpg"],
  ["The Picture of Dorian Gray", "Classic", "Oscar Wilde", 13, "dorian-gray.jpg"],
  ["Moby-Dick", "Classic", "Herman Melville", 16, "moby-dick.jpg"],
  ["Wuthering Heights", "Classic", "Emily Brontë", 13, "wuthering-heights.jpg"],
  ["The Catcher in the Rye", "Classic", "J.D. Salinger", 14, "catcher-in-the-rye.webp"],
  ["To Kill a Mockingbird", "Classic", "Harper Lee", 15, "to-kill-a-mockingbird.webp"],
  ["The Old Man and the Sea", "Classic", "Ernest Hemingway", 11, "old-man-and-the-sea.jpeg"],

  ["Brave New World", "Dystopian", "Aldous Huxley", 14, "brave-new-world.jpeg"],
  ["Fahrenheit 451", "Dystopian", "Ray Bradbury", 15, "fahrenheit-451.avif"],
  ["The Handmaid's Tale", "Dystopian", "Margaret Atwood", 17, "handmaids-tale.jpeg"],
  ["Animal Farm", "Dystopian", "George Orwell", 10, "animal-farm.avif"],

  ["Emma", "Romance", "Jane Austen", 11, "emma.webp"],
  ["Persuasion", "Romance", "Jane Austen", 12, "persuasion.webp"],
  ["Sense and Sensibility", "Romance", "Jane Austen", 12, "sense-and-sensibility.jpeg"],
  ["Me Before You", "Romance", "Jojo Moyes", 15, "me-before-you.webp"],
  ["The Notebook", "Romance", "Nicholas Sparks", 14, "the-notebook.jpeg"],

  ["The Book Thief", "History", "Markus Zusak", 16, "book-thief.jpg"],
  ["All the Light We Cannot See", "History", "Anthony Doerr", 18, "all-the-light.avif"],
  ["The Nightingale", "History", "Kristin Hannah", 17, "the-nightingale.avif"],
  ["The Tattooist of Auschwitz", "History", "Heather Morris", 15, "tattooist-of-auschwitz.jpg"],

  ["The Da Vinci Code", "Fiction", "Dan Brown", 16, "da-vinci-code.avif"],
  ["The Alchemist", "Fiction", "Paulo Coelho", 13, "the-alchemist.avif"],
  ["Life of Pi", "Fiction", "Yann Martel", 14, "life-of-pi.webp"],
  ["The Kite Runner", "Fiction", "Khaled Hosseini", 15, "kite-runner.avif"],
  ["A Thousand Splendid Suns", "Fiction", "Khaled Hosseini", 16, "thousand-splendid-suns.webp"],
  ["The Curious Incident of the Dog in the Night-Time", "Fiction", "Mark Haddon", 13, "curious-incident.avif"],

  ["Dune", "Science Fiction", "Frank Herbert", 19, "dune.avif"],
  ["Foundation", "Science Fiction", "Isaac Asimov", 17, "foundation.jpg"],
  ["The Martian", "Science Fiction", "Andy Weir", 16, "the-martian.avif"],
  ["Project Hail Mary", "Science Fiction", "Andy Weir", 18, "project-hail-mary.jpeg"],
  ["Neuromancer", "Science Fiction", "William Gibson", 15, "neuromancer.avif"],

  ["The Girl with the Dragon Tattoo", "Mystery", "Stieg Larsson", 16, "dragon-tattoo.jpg"],
  ["Gone Girl", "Mystery", "Gillian Flynn", 15, "gone-girl.jpeg"],
  ["The Silent Patient", "Mystery", "Alex Michaelides", 16, "silent-patient.avif"],
  ["Murder on the Orient Express", "Mystery", "Agatha Christie", 13, "orient-express.avif"],

  ["Sapiens", "History", "Yuval Noah Harari", 20, "sapiens.avif"],
  ["Educated", "Biography", "Tara Westover", 17, "educated.jpg"],
  ["Steve Jobs", "Biography", "Walter Isaacson", 19, "steve-jobs.jpeg"],
  ["Becoming", "Biography", "Michelle Obama", 18, "becoming.jpeg"]
]

book_formats = [
  "Hardcover",
  "Paperback",
  "E-book",
  "Large Print"
]

publishers = [
  "Penguin Books",
  "Vintage",
  "HarperCollins",
  "Scribner",
  "Bloomsbury"
]

publication_years = [
  1995,
  2003,
  2008,
  2012,
  2016,
  2019,
  2021,
  2023,
  2024,
  2025
]

books.each_with_index do |(title, genre, author, price, image), index|
  book = Book.find_or_initialize_by(title: title)

  book.genre = genre
  book.author = author
  book.price = price
  book.cover_image = "/books/#{image}"

  book.book_format = book_formats[index % book_formats.length]
  book.publisher = publishers[index % publishers.length]
  book.publication_year = publication_years[index % publication_years.length]

  book.average_review_score = (4.0 + (index % 10) * 0.1).round(1)
  book.number_of_review = 100 + (index * 73)

  book.save!
end

puts "✅ Seeded #{Book.count} books!"