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
        checked: true,
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
    options: [],
  },
  {
    id: 'publisher',
    title: 'Publisher',
    options: [],
  },
  {
    id: 'years',
    title: 'Years',
    options: [],
  },
  {
    id: 'price-range',
    title: 'Price range',
    options: [],
  },
]

export const filterActions = [
  {
    id: 'submit-filter',
    label: 'Submit',
    type: 'button',
  },
  {
    id: 'search-filter',
    label: 'Search',
    type: 'button',
  },
]
