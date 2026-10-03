import { useEffect, useState } from 'react'
import './Employees.css'

const API_URL = 'http://localhost:8080/api/employees'
const DEPARTMENT_API_URL = 'http://localhost:8080/api/departments'
const ROLE_API_URL = 'http://localhost:8080/api/roles'

function Employees() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [editingEmployeeId, setEditingEmployeeId] = useState(null)

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    const [departmentLoading, setDepartmentLoading] = useState(true)

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        departmentId: '',
        roleId: '',
        dateOfBirth: '',
        joinDate: '',
        address: '',
        status: 'Active',
    })

    // =========================
    // LOAD EMPLOYEES FROM BACKEND
    // =========================

    const loadEmployees = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await fetch(API_URL)

            if (!response.ok) {
                throw new Error('Failed to load employees')
            }

            const data = await response.json()

            // Convert backend employeeCode to frontend id
            const formattedEmployees = data.map((employee) => ({
                id: employee.employeeCode,
                name: employee.name,
                department: employee.department,
                position: employee.position,
                departmentId: employee.departmentEntity?.id || '',
                roleId: employee.role?.id || '',
                roleName: employee.role?.name || employee.position || '',
                email: employee.email,
                phone: employee.phone,
                dateOfBirth: employee.dateOfBirth || '',
                joinDate: employee.joinDate || '',
                address: employee.address || '',
                status: employee.status,
                databaseId: employee.id,
            }))

            setEmployees(formattedEmployees)
        } catch (error) {
            console.error('Error loading employees:', error)
            setError('Unable to load employees from the server.')
        } finally {
            setLoading(false)
        }
    }

    const loadDepartmentsAndRoles = async () => {
        try {
            setDepartmentLoading(true)

            const [departmentResponse, roleResponse] = await Promise.all([
                fetch(DEPARTMENT_API_URL),
                fetch(ROLE_API_URL)
            ])

            if (!departmentResponse.ok) {
                throw new Error('Failed to load departments')
            }

            if (!roleResponse.ok) {
                throw new Error('Failed to load roles')
            }

            const departmentData = await departmentResponse.json()
            const roleData = await roleResponse.json()

            setDepartments(departmentData)
            setRoles(roleData)
        } catch (error) {
            console.error('Department/Role loading error:', error)
        } finally {
            setDepartmentLoading(false)
        }
    }

    useEffect(() => {
        loadEmployees()
        loadDepartmentsAndRoles()
    }, [])

    // =========================
    // SEARCH
    // =========================

    const filteredEmployees = employees.filter((employee) =>
        `${employee.name} ${employee.id} ${employee.department} ${employee.position}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    // =========================
    // FORM INPUT
    // =========================

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            departmentId: '',
            roleId: '',
            dateOfBirth: '',
            joinDate: '',
            address: '',
            status: 'Active',
        })

        setEditingEmployeeId(null)
    }

    // =========================
    // DEPARTMENT / ROLE INPUT
    // =========================

    const handleDepartmentChange = (e) => {
        const departmentId = e.target.value
        const selectedDepartment = departments.find(
            (department) => String(department.id) === String(departmentId)
        )

        setFormData({
            ...formData,
            departmentId,
            department: selectedDepartment?.name || '',
            roleId: '',
            position: ''
        })
    }

    const handleRoleChange = (e) => {
        const roleId = e.target.value
        const selectedRole = roles.find(
            (role) => String(role.id) === String(roleId)
        )

        setFormData({
            ...formData,
            roleId,
            position: selectedRole?.name || ''
        })
    }

    const availableRoles = formData.departmentId
        ? roles.filter(
            (role) =>
                String(role.department?.id) === String(formData.departmentId)
        )
        : []

    // =========================
    // ADD / EDIT EMPLOYEE
    // =========================

    const handleAddEmployee = async (e) => {
        e.preventDefault()

        if (
            !formData.id ||
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.departmentId ||
            !formData.roleId
        ) {
            alert('Please fill in all required fields.')
            return
        }

        const employeeData = {
            employeeCode: formData.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            position: formData.position,
            departmentEntity: {
                id: Number(formData.departmentId)
            },
            role: {
                id: Number(formData.roleId)
            },
            dateOfBirth: formData.dateOfBirth || null,
            joinDate: formData.joinDate || null,
            address: formData.address,
            status: formData.status,
        }

        try {
            // =========================
            // UPDATE EXISTING EMPLOYEE
            // =========================

            if (editingEmployeeId) {
                const employee = employees.find(
                    (item) => item.id === editingEmployeeId
                )

                if (!employee || !employee.databaseId) {
                    alert('Employee database record not found.')
                    return
                }

                const response = await fetch(
                    `${API_URL}/${employee.databaseId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(employeeData),
                    }
                )

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(errorText || 'Failed to update employee')
                }

                alert('Employee updated successfully!')

                await loadEmployees()

                resetForm()
                setShowAddModal(false)

                return
            }

            // =========================
            // ADD NEW EMPLOYEE
            // =========================

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            })

            if (!response.ok) {
                const errorText = await response.text()

                if (response.status === 500) {
                    throw new Error(
                        'Employee ID or Email may already exist.'
                    )
                }

                throw new Error(
                    errorText || 'Failed to add employee'
                )
            }

            alert('Employee added successfully!')

            await loadEmployees()

            resetForm()
            setShowAddModal(false)
        } catch (error) {
            console.error('Employee save error:', error)

            alert(
                error.message ||
                'Something went wrong while saving the employee.'
            )
        }
    }

    // =========================
    // DELETE EMPLOYEE
    // =========================

    const handleDeleteEmployee = async (employeeId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this employee?'
        )

        if (!confirmDelete) {
            return
        }

        try {
            const employee = employees.find(
                (item) => item.id === employeeId
            )

            if (!employee || !employee.databaseId) {
                alert('Employee database record not found.')
                return
            }

            const response = await fetch(
                `${API_URL}/${employee.databaseId}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete employee')
            }

            alert('Employee deleted successfully!')

            await loadEmployees()
        } catch (error) {
            console.error('Employee delete error:', error)

            alert(
                error.message ||
                'Something went wrong while deleting the employee.'
            )
        }
    }

    // =========================
    // VIEW EMPLOYEE
    // =========================

    const handleViewEmployee = (employee) => {
        setSelectedEmployee(employee)
    }

    // =========================
    // EDIT EMPLOYEE
    // =========================

    const handleEditEmployee = (employee) => {
        setFormData({
            id: employee.id || '',
            name: employee.name || '',
            email: employee.email || '',
            phone: employee.phone || '',
            department: employee.department || '',
            position: employee.position || '',
            departmentId: employee.departmentId
                ? String(employee.departmentId)
                : String(
                    departments.find(
                        (department) => department.name === employee.department
                    )?.id || ''
                ),
            roleId: employee.roleId
                ? String(employee.roleId)
                : String(
                    roles.find(
                        (role) =>
                            role.name === employee.position &&
                            role.department?.name === employee.department
                    )?.id || ''
                ),
            dateOfBirth: employee.dateOfBirth || '',
            joinDate: employee.joinDate || '',
            address: employee.address || '',
            status: employee.status || 'Active',
        })

        setEditingEmployeeId(employee.id)
        setSelectedEmployee(null)
        setShowAddModal(true)
    }

    // =========================
    // OPEN ADD MODAL
    // =========================

    const openAddModal = () => {
        resetForm()
        setShowAddModal(true)
    }

    // =========================
    // SUMMARY COUNTS
    // =========================

    const totalEmployees = employees.length

    const activeEmployees = employees.filter(
        (employee) => employee.status === 'Active'
    ).length

    const onLeaveEmployees = employees.filter(
        (employee) => employee.status === 'On Leave'
    ).length

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === 'Inactive'
    ).length

    return (
        <div className="employees-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="employees-header">

                <div>
                    <h1>Employees</h1>

                    <p>
                        Manage employee records and profile information
                    </p>
                </div>

                <button
                    className="add-employee-btn"
                    onClick={openAddModal}
                >
                    + Add Employee
                </button>

            </div>


            {/* =========================
                ERROR MESSAGE
            ========================= */}

            {error && (
                <div
                    style={{
                        padding: '12px 16px',
                        marginBottom: '15px',
                        background: '#fff1f0',
                        color: '#c62828',
                        border: '1px solid #ffcdd2',
                        borderRadius: '8px',
                    }}
                >
                    {error}
                </div>
            )}


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="employee-summary">

                <div className="employee-summary-card">

                    <div className="summary-icon">
                        👥
                    </div>

                    <div>
                        <span>Total Employees</span>

                        <strong>
                            {totalEmployees}
                        </strong>
                    </div>

                </div>


                <div className="employee-summary-card">

                    <div className="summary-icon">
                        ✓
                    </div>

                    <div>
                        <span>Active Employees</span>

                        <strong>
                            {activeEmployees}
                        </strong>
                    </div>

                </div>


                <div className="employee-summary-card">

                    <div className="summary-icon">
                        ◷
                    </div>

                    <div>
                        <span>On Leave</span>

                        <strong>
                            {onLeaveEmployees}
                        </strong>
                    </div>

                </div>


                <div className="employee-summary-card">

                    <div className="summary-icon">
                        ○
                    </div>

                    <div>
                        <span>Inactive</span>

                        <strong>
                            {inactiveEmployees}
                        </strong>
                    </div>

                </div>

            </div>


            {/* =========================
                EMPLOYEE TABLE
            ========================= */}

            <div className="employees-card">

                <div className="employees-card-header">

                    <div>
                        <h2>Employee List</h2>

                        <p>
                            View and manage all employees
                        </p>
                    </div>


                    <div className="employee-tools">

                        <div className="employee-search">

                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                        </div>


                        <button className="filter-btn">
                            ⚙ Filter
                        </button>

                    </div>

                </div>


                <div className="table-container">

                    <table className="employees-table">

                        <thead>

                            <tr>
                                <th>Employee</th>
                                <th>Employee ID</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="7"
                                        className="no-results"
                                    >
                                        Loading employees...
                                    </td>
                                </tr>

                            ) : filteredEmployees.length > 0 ? (

                                filteredEmployees.map((employee) => (

                                    <tr key={employee.databaseId}>

                                        <td>

                                            <div className="employee-name-cell">

                                                <div className="employee-avatar">

                                                    {employee.name
                                                        .split(' ')
                                                        .map(
                                                            (name) =>
                                                                name[0]
                                                        )
                                                        .join('')
                                                        .toUpperCase()}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {employee.name}
                                                    </strong>

                                                    <span>
                                                        {employee.phone}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        <td>

                                            <span className="employee-id">
                                                {employee.id}
                                            </span>

                                        </td>


                                        <td>
                                            {employee.department}
                                        </td>


                                        <td>
                                            {employee.position}
                                        </td>


                                        <td>

                                            <span className="employee-email">
                                                {employee.email}
                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={`employee-status ${employee.status === 'Active'
                                                    ? 'status-active'
                                                    : employee.status === 'On Leave'
                                                        ? 'status-leave'
                                                        : 'status-inactive'
                                                    }`}
                                            >
                                                {employee.status}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                {/* View */}

                                                <button
                                                    title="View"
                                                    onClick={() =>
                                                        handleViewEmployee(
                                                            employee
                                                        )
                                                    }
                                                >
                                                    👁
                                                </button>


                                                {/* Edit */}

                                                <button
                                                    title="Edit"
                                                    onClick={() =>
                                                        handleEditEmployee(
                                                            employee
                                                        )
                                                    }
                                                >
                                                    ✎
                                                </button>


                                                {/* Delete */}

                                                <button
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDeleteEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    🗑
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-results"
                                    >
                                        {searchTerm
                                            ? 'No employees found.'
                                            : 'No employees available.'}
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Footer */}

                <div className="employees-card-footer">

                    <span>
                        Showing {filteredEmployees.length} of{' '}
                        {employees.length} employees
                    </span>

                    <div className="pagination">

                        <button disabled>
                            ‹
                        </button>

                        <button className="current-page">
                            1
                        </button>

                        <button>
                            2
                        </button>

                        <button>
                            3
                        </button>

                        <button>
                            ›
                        </button>

                    </div>

                </div>

            </div>


            {/* ==================================================
                ADD / EDIT EMPLOYEE MODAL
            ================================================== */}

            {showAddModal && (

                <div className="modal-overlay">

                    <div className="employee-modal">

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editingEmployeeId
                                        ? 'Edit Employee'
                                        : 'Add New Employee'}
                                </h2>

                                <p>
                                    {editingEmployeeId
                                        ? 'Update the employee information below'
                                        : 'Enter the employee information below'}
                                </p>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowAddModal(false)
                                    resetForm()
                                }}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleAddEmployee}
                            className="modal-body"
                        >

                            <div className="form-row">

                                <div className="modal-form-group">

                                    <label>
                                        Employee ID *
                                    </label>

                                    <input
                                        type="text"
                                        name="id"
                                        placeholder="e.g. EMP007"
                                        value={formData.id}
                                        onChange={handleInputChange}
                                    />

                                </div>


                                <div className="modal-form-group">

                                    <label>
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="modal-form-group">

                                    <label>
                                        Email *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="employee@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />

                                </div>


                                <div className="modal-form-group">

                                    <label>
                                        Phone *
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="077 123 4567"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="modal-form-group">

                                    <label>
                                        Department *
                                    </label>

                                    <select
                                        name="departmentId"
                                        value={formData.departmentId}
                                        onChange={handleDepartmentChange}
                                        disabled={departmentLoading}
                                        required
                                    >

                                        <option value="">
                                            {departmentLoading
                                                ? 'Loading departments...'
                                                : 'Select Department'}
                                        </option>

                                        {departments
                                            .filter(
                                                (department) =>
                                                    department.status === 'Active'
                                            )
                                            .map((department) => (
                                                <option
                                                    key={department.id}
                                                    value={department.id}
                                                >
                                                    {department.name}
                                                </option>
                                            ))}

                                    </select>

                                </div>


                                <div className="modal-form-group">

                                    <label>
                                        Role *
                                    </label>

                                    <select
                                        name="roleId"
                                        value={formData.roleId}
                                        onChange={handleRoleChange}
                                        disabled={
                                            !formData.departmentId ||
                                            departmentLoading
                                        }
                                        required
                                    >

                                        <option value="">
                                            {!formData.departmentId
                                                ? 'Select Department First'
                                                : availableRoles.length === 0
                                                    ? 'No roles available'
                                                    : 'Select Role'}
                                        </option>

                                        {availableRoles
                                            .filter(
                                                (role) =>
                                                    role.status === 'Active'
                                            )
                                            .map((role) => (
                                                <option
                                                    key={role.id}
                                                    value={role.id}
                                                >
                                                    {role.name}
                                                </option>
                                            ))}

                                    </select>

                                </div>

                            </div>


                            <div className="form-row">

                                <div className="modal-form-group">

                                    <label>
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                    />

                                </div>


                                <div className="modal-form-group">

                                    <label>
                                        Join Date
                                    </label>

                                    <input
                                        type="date"
                                        name="joinDate"
                                        value={formData.joinDate}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>


                            <div className="modal-form-group full-width">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    rows="3"
                                    placeholder="Enter employee address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                ></textarea>

                            </div>


                            <div className="modal-form-group full-width">

                                <label>
                                    Employment Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="On Leave">
                                        On Leave
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowAddModal(false)
                                        resetForm()
                                    }}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="save-employee-btn"
                                >
                                    {editingEmployeeId
                                        ? 'Update Employee'
                                        : 'Save Employee'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ==================================================
                VIEW EMPLOYEE PROFILE MODAL
            ================================================== */}

            {selectedEmployee && (

                <div className="modal-overlay">

                    <div className="employee-profile-modal">

                        {/* Profile Header */}

                        <div className="profile-modal-header">

                            <div className="profile-large-avatar">

                                {selectedEmployee.name
                                    .split(' ')
                                    .map(
                                        (name) =>
                                            name[0]
                                    )
                                    .join('')
                                    .toUpperCase()}

                            </div>


                            <div className="profile-modal-title">

                                <h2>
                                    {selectedEmployee.name}
                                </h2>

                                <p>
                                    {selectedEmployee.position}
                                </p>

                                <span
                                    className={`employee-status ${selectedEmployee.status ===
                                        'Active'
                                        ? 'status-active'
                                        : selectedEmployee.status ===
                                            'On Leave'
                                            ? 'status-leave'
                                            : 'status-inactive'
                                        }`}
                                >
                                    {selectedEmployee.status}
                                </span>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() =>
                                    setSelectedEmployee(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* Profile Details */}

                        <div className="profile-details">

                            <div className="profile-detail">

                                <span>
                                    Employee ID
                                </span>

                                <strong>
                                    {selectedEmployee.id}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Department
                                </span>

                                <strong>
                                    {selectedEmployee.department}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Position
                                </span>

                                <strong>
                                    {selectedEmployee.position}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {selectedEmployee.email}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {selectedEmployee.phone}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Date of Birth
                                </span>

                                <strong>
                                    {selectedEmployee.dateOfBirth ||
                                        'Not provided'}
                                </strong>

                            </div>


                            <div className="profile-detail">

                                <span>
                                    Join Date
                                </span>

                                <strong>
                                    {selectedEmployee.joinDate ||
                                        'Not provided'}
                                </strong>

                            </div>


                            <div className="profile-detail profile-address">

                                <span>
                                    Address
                                </span>

                                <strong>
                                    {selectedEmployee.address ||
                                        'Not provided'}
                                </strong>

                            </div>

                        </div>


                        {/* Profile Footer */}

                        <div className="profile-modal-footer">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedEmployee(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}

export default Employees