const BASE_URL = 'https://notes-api.dicoding.dev/v2'

const getNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`)
    const responseJson = await response.json()

    if (responseJson.error) {
      console.log(responseJson.message)
      return []
    } else {
      return responseJson.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

const createNote = async ({ title, body }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await response.json()

    if (responseJson.error) {
      console.log(responseJson.message)
      return []
    } else {
      return responseJson.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    })
    const responseJson = await response.json()

    if (responseJson.status === 'success') {
      return true
    } else {
      console.log(responseJson.message)
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const archiveNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    })
    const responseJson = await response.json()

    if (responseJson.status === 'success') {
      return true
    } else {
      console.log(responseJson.message)
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`)
    const responseJson = await response.json()

    if (responseJson.error) {
      console.log(responseJson.message)
      return []
    } else {
      return responseJson.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    })
    const responseJson = await response.json()

    if (responseJson.status === 'success') {
      return true
    } else {
      console.log(responseJson.message)
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export {
  getNotes,
  createNote,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  unarchiveNote,
}
