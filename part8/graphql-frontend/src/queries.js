import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre)  {
      title
      published
      genres
      author {
        name
        born
        bookCount
        id
      }
      id
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres {
      genres
    }
  }
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title, 
    author: $author,
    published: $published, 
    genres: $genres
  ) {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    genres
  }
}
`
export const UPDATE_AUTHOR = gql`
  mutation($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      token
      user {
        username
        id
        favoriteGenre
      }
    }
  }
`