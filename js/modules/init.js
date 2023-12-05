async function fetchUsers() {
    try {
        const response = await fetch('/data/employees.json')
        const employees = await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

fetchUsers()

