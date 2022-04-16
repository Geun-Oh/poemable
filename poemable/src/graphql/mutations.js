/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPoem = /* GraphQL */ `
  mutation CreatePoem(
    $input: CreatePoemInput!
    $condition: ModelPoemConditionInput
  ) {
    createPoem(input: $input, condition: $condition) {
      id
      name
      author
      detail
      createdAt
      updatedAt
    }
  }
`;
export const updatePoem = /* GraphQL */ `
  mutation UpdatePoem(
    $input: UpdatePoemInput!
    $condition: ModelPoemConditionInput
  ) {
    updatePoem(input: $input, condition: $condition) {
      id
      name
      author
      detail
      createdAt
      updatedAt
    }
  }
`;
export const deletePoem = /* GraphQL */ `
  mutation DeletePoem(
    $input: DeletePoemInput!
    $condition: ModelPoemConditionInput
  ) {
    deletePoem(input: $input, condition: $condition) {
      id
      name
      author
      detail
      createdAt
      updatedAt
    }
  }
`;
