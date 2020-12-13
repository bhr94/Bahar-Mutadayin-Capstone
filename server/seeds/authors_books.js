// seed data, lorem ipsum of sorts
const seedData = {
  authors: [
    { id: 1, name: 'Neo', bio: 'Etiam euismod eget erat quis pretium.' },
    {
      id: 2,
      name: 'Mina',
      bio:
        'Cras nec eros eget odio tincidunt hendrerit sit amet dapibus lacus.',
    },
    {
      id: 3,
      name: 'Luna',
      bio:
        'Vivamus elit justo, egestas ut facilisis at, blandit faucibus dolor. ',
    },
  ],
  books: [
    {
      id: 1,
      name: 'A great book',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas augue id sapien vehicula, eget pharetra tellus ultrices. ',
    },
    {
      id: 2,
      name: 'Most Interesting',
      description: 'Morbi condimentum risus eu velit viverra molestie.',
    },
    {
      id: 3,
      name: 'A foxes tale',
      description:
        'Vivamus elit justo, egestas ut facilisis at, blandit faucibus dolor. ',
    },
  ],
  reviews: [
    {
      id: 1,
      reviewer: 'Captain Kirk',
      review: "Genius Doesn't Work On An Assembly Line Basis",
      book_id: 1,
    },
    {
      id: 2,
      reviewer: 'Spock',
      review: 'Insufficient facts always invite danger',
      book_id: 3,
    },
  ],
  // many to many relation between authors and books
  authors_books: [
    {
      author_id: 1,
      book_id: 1,
    },
    {
      author_id: 2,
      book_id: 1,
    },
    {
      author_id: 3,
      book_id: 2,
    },
    {
      author_id: 2,
      book_id: 1,
    },
    {
      author_id: 1,
      book_id: 2,
    },
  ],
};

// delete and add data
exports.seed = (knex) =>
  knex('authors_books')
    .del()
    .then(() => knex('authors').del())
    .then(() => knex('authors').insert(seedData.authors))
    .then(() => knex('reviews').del())
    .then(() => knex('books').del())
    .then(() => knex('books').insert(seedData.books))
    .then(() => knex('authors_books').insert(seedData.authors_books))
    .then(() => knex('reviews').insert(seedData.reviews));
