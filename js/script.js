// GET DOM ELEMENTS
let empTable = document.querySelector('#employees')
let empCount = document.querySelector('#empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex)
        }
    }
})

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    // REBUILDING THE ROW STRUCTURE
    // LOOP THROUGH THE EMPLOYEES
    fetch('data/employees.json')
        .then(response => response.json())
        .then(employees => {
            for (let employee of employees) {
                tbody.innerHTML +=
                    `
                <tr>
                    <td>${employee.empId}</td>
                    <td>${employee.name}</td>
                    <td>${employee.extension}</td>
                    <td><a href="mailto:${employee.email}">${employee.email}</a></td>
                    <td>${employee.department}</td>
                    <td><button class="btn btn-sm btn-danger delete">X</button></td>
                </tr>
                `
            }
            // UPDATE EMPLOYEE COUNT
            empCount.value = `(${employees.length})`
        })
        .catch(e => console.log(e.message))
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
}