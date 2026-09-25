export const filterTitle = 'Filter'

export const filterSections = [
  {
    id: 'categories',
    title: 'Categories',
    options: [
      {
        id: 'genre-all',
        name: 'category',
        value: 'all',
        label: 'All genres',
        type: 'radio',
      },
      {
        id: 'genre-history',
        name: 'category',
        value: 'history',
        label: 'History',
        type: 'radio',
      },
      {
        id: 'genre-romance',
        name: 'category',
        value: 'romance',
        label: 'Romance',
        type: 'radio',
      },
      {
        id: 'genre-classic',
        name: 'category',
        value: 'classic',
        label: 'Classic',
        type: 'radio',
      },
      {
        id: 'genre-fiction',
        name: 'category',
        value: 'fiction',
        label: 'Fiction',
        type: 'radio',
      },
      {
        id: 'genre-fantasy',
        name: 'category',
        value: 'fantasy',
        label: 'Fantasy',
        type: 'radio',
      },
      {
        id: 'genre-dystopian',
        name: 'category',
        value: 'dystopian',
        label: 'Dystopian',
        type: 'radio',
      },
    ],
  },
  {
    id: 'book-format',
    title: 'Book format',
    options: [
      {
        id: 'format-all',
        name: 'book-format',
        value: 'all',
        label: 'All formats',
        type: 'radio',
      },
      {
        id: 'format-hardcover',
        name: 'book-format',
        value: 'hardcover',
        label: 'Hardcover',
        type: 'radio',
      },
      {
        id: 'format-paperback',
        name: 'book-format',
        value: 'paperback',
        label: 'Paperback',
        type: 'radio',
      },
      {
        id: 'format-ebook',
        name: 'book-format',
        value: 'e-book',
        label: 'E-book',
        type: 'radio',
      },
      {
        id: 'format-large-print',
        name: 'book-format',
        value: 'large print',
        label: 'Large Print',
        type: 'radio',
      },
    ],
  },
  {
    id: 'publisher',
    title: 'Publisher',
    options: [
      {
        id: 'publisher-penguin',
        name: 'publisher',
        value: 'Penguin Books',
        label: 'Penguin Books',
        type: 'checkbox',
      },
      {
        id: 'publisher-vintage',
        name: 'publisher',
        value: 'Vintage',
        label: 'Vintage',
        type: 'checkbox',
      },
      {
        id: 'publisher-harpercollins',
        name: 'publisher',
        value: 'HarperCollins',
        label: 'HarperCollins',
        type: 'checkbox',
      },
      {
        id: 'publisher-scribner',
        name: 'publisher',
        value: 'Scribner',
        label: 'Scribner',
        type: 'checkbox',
      },
      {
        id: 'publisher-bloomsbury',
        name: 'publisher',
        value: 'Bloomsbury',
        label: 'Bloomsbury',
        type: 'checkbox',
      },
    ],
  },
  {
    id: 'years',
    title: 'Years',
    options: [
      {
        id: 'year-all',
        name: 'year',
        value: 'all',
        label: 'All years',
        type: 'radio',
      },
      {
        id: 'year-2020-2026',
        name: 'year',
        value: '2020-2026',
        label: '2020–2026',
        type: 'radio',
      },
      {
        id: 'year-2010-2019',
        name: 'year',
        value: '2010-2019',
        label: '2010–2019',
        type: 'radio',
      },
      {
        id: 'year-2000-2009',
        name: 'year',
        value: '2000-2009',
        label: '2000–2009',
        type: 'radio',
      },
      {
        id: 'year-before-2000',
        name: 'year',
        value: 'before-2000',
        label: 'Before 2000',
        type: 'radio',
      },
    ],
  },
  {
    id: 'price-range',
    title: 'Price range',
    options: [],
  },
]

export const filterActions = [
  {
    id: 'apply-filter',
    label: 'Apply filters',
    type: 'button',
  },
  {
    id: 'reset-filter',
    label: 'Reset filters',
    type: 'button',
  },
]
