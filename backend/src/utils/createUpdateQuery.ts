import { UserInput } from '@Types/__generated__/resolvers-types'

const createUpdateQuery = (
  user: UserInput,
): {
  query: string
  updatedUser: UserInput
} => {
  let mappedUser = Object.entries(user)
  mappedUser = mappedUser.filter(([key, val]) => key == 'id' || val)

  let query = 'UPDATE users SET '
  let index = 2
  const end = mappedUser.length

  mappedUser.forEach(([key, val]) => {
    if (key !== 'id' && val) {
      query += `${key}=$${index}`
      if (index < end) {
        query += ', '
      }
      index++
    }
  })
  query += ' WHERE id = $1 RETURNING *'

  console.log('Query:', query)

  const updatedUser = Object.fromEntries(mappedUser) as UserInput

  return { query, updatedUser }
}

export default createUpdateQuery
