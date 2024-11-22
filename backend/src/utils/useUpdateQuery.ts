
const useUpdateQuery = (data: object): string => {
    Object.entries(data).forEach(([key, val]) => {
        if (!val) {
            delete (data as Record<string, any>)[key]
        }
    })
    let query = "UPDATE users SET "
    let index = 2
    let end = Object.keys(data).length
    Object.entries(data).forEach(([key, val]) => {
        if (key !== 'id' && val) {
            query += `${key}=$${index}`
            console.log('Index: ', index, ' end: ', end)
            if (index < end) {
              query += ', '
            }
            index++
          }
    })
    query += ' WHERE id = $1 RETURNING *'

    return query
}

export default useUpdateQuery