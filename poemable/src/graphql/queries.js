/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoem = /* GraphQL */ `
  query GetPoem($id: ID!) {
    getPoem(id: $id) {
      id
      name
      author
      detail
      createdAt
      updatedAt
    }
  }
`;
export const listPoems = /* GraphQL */ `
  query ListPoems(
    $filter: ModelPoemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPoems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        author
        detail
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
