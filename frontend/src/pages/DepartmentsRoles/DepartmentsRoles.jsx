import { useEffect, useState } from 'react'
import './DepartmentsRoles.css'

const API_URL = 'http://localhost:8080/api/departments'
const ROLE_API_URL = 'http://localhost:8080/api/roles'

function DepartmentsRoles() {

  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [roles, setRoles] = useState([])
  const [roleLoading, setRoleLoading] = useState(true)
  const [roleError, setRoleError] = useState('')

  const [roleSearchTerm, setRoleSearchTerm] = useState('')
  const [roleStatusFilter, setRoleStatusFilter] = useState('All')

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingRoleId, setEditingRoleId] = useState(null)

  const [roleFormData, setRoleFormData] = useState({
    name: '',
    departmentId: '',
    description: '',
    status: 'Active'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  })

  const loadDepartments = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to load departments')
      }

      const data = await response.json()
      setDepartments(data)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadRoles = async () => {
    try {
      setRoleLoading(true)
      setRoleError('')

      const response = await fetch(ROLE_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load roles')
      }

      const data = await response.json()
      setRoles(data)
    } catch (err) {
      setRoleError(err.message)
    } finally {
      setRoleLoading(false)
    }
  }

  useEffect(() => {
    loadDepartments()
    loadRoles()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAdd = () => {
    setEditingId(null)

    setFormData({
      name: '',
      description: '',
      status: 'Active'
    })

    setShowModal(true)
  }

  const handleEdit = (department) => {
    setEditingId(department.id)

    setFormData({
      name: department.name || '',
      description: department.description || '',
      status: department.status || 'Active'
    })

    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Department name is required')
      return
    }

    try {

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          status: formData.status
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to save department')
      }

      setShowModal(false)
      setEditingId(null)

      setFormData({
        name: '',
        description: '',
        status: 'Active'
      })

      await loadDepartments()

    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this department?'
    )

    if (!confirmed) {
      return
    }

    try {

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete department')
      }

      await loadDepartments()

    } catch (err) {
      alert(err.message)
    }
  }

  const handleRoleChange = (e) => {
    const { name, value } = e.target

    setRoleFormData({
      ...roleFormData,
      [name]: value
    })
  }

  const handleAddRole = () => {
    setEditingRoleId(null)

    setRoleFormData({
      name: '',
      departmentId: departments.length > 0 ? String(departments[0].id) : '',
      description: '',
      status: 'Active'
    })

    setShowRoleModal(true)
  }

  const handleEditRole = (role) => {
    setEditingRoleId(role.id)

    setRoleFormData({
      name: role.name || '',
      departmentId: role.department?.id ? String(role.department.id) : '',
      description: role.description || '',
      status: role.status || 'Active'
    })

    setShowRoleModal(true)
  }

  const handleRoleSubmit = async (e) => {
    e.preventDefault()

    if (!roleFormData.name.trim()) {
      alert('Role name is required')
      return
    }

    if (!roleFormData.departmentId) {
      alert('Please select a department')
      return
    }

    try {
      const url = editingRoleId
        ? `${ROLE_API_URL}/${editingRoleId}`
        : ROLE_API_URL

      const method = editingRoleId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: roleFormData.name.trim(),
          department: {
            id: Number(roleFormData.departmentId)
          },
          description: roleFormData.description.trim(),
          status: roleFormData.status
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to save role')
      }

      setShowRoleModal(false)
      setEditingRoleId(null)

      setRoleFormData({
        name: '',
        departmentId: '',
        description: '',
        status: 'Active'
      })

      await loadRoles()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteRole = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this role?'
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`${ROLE_API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete role')
      }

      await loadRoles()
    } catch (err) {
      alert(err.message)
    }
  }

  const filteredRoles = roles.filter((role) => {
    const departmentName = role.department?.name || ''

    const matchesSearch =
      role.name
        ?.toLowerCase()
        .includes(roleSearchTerm.toLowerCase()) ||
      departmentName
        .toLowerCase()
        .includes(roleSearchTerm.toLowerCase()) ||
      role.description
        ?.toLowerCase()
        .includes(roleSearchTerm.toLowerCase())

    const matchesStatus =
      roleStatusFilter === 'All' ||
      role.status === roleStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalRoles = roles.length

  const activeRoles = roles.filter(
    role => role.status === 'Active'
  ).length

  const inactiveRoles = roles.filter(
    role => role.status === 'Inactive'
  ).length

  const filteredDepartments = departments.filter((department) => {

    const matchesSearch =
      department.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      department.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      department.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalDepartments = departments.length

  const activeDepartments = departments.filter(
    department => department.status === 'Active'
  ).length

  const inactiveDepartments = departments.filter(
    department => department.status === 'Inactive'
  ).length

  return (
    <div className="departments-page">

      {/* Page Header */}

      <div className="departments-header">

        <div>
          <h1>Departments & Roles</h1>

          <p>
            Manage employee departments and organizational roles
          </p>
        </div>

        <button
          className="add-department-btn"
          onClick={handleAdd}
        >
          + Add Department
        </button>

      </div>

      {/* Summary Cards */}

      <div className="department-summary">

        <div className="department-summary-card">
          <div className="summary-icon">🏢</div>

          <div>
            <span>Total Departments</span>
            <strong>{totalDepartments}</strong>
          </div>
        </div>

        <div className="department-summary-card">
          <div className="summary-icon">✓</div>

          <div>
            <span>Active Departments</span>
            <strong>{activeDepartments}</strong>
          </div>
        </div>

        <div className="department-summary-card">
          <div className="summary-icon">○</div>

          <div>
            <span>Inactive Departments</span>
            <strong>{inactiveDepartments}</strong>
          </div>
        </div>

      </div>

      {/* Department Section */}

      <div className="department-section">

        <div className="department-section-header">

          <div>
            <h2>Department Management</h2>

            <p>
              View and manage all employee departments
            </p>
          </div>

        </div>

        {/* Filters */}

        <div className="department-filters">

          <div className="department-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="department-status-filter"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        {/* Loading */}

        {loading && (
          <div className="department-message">
            Loading departments...
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="department-error">
            {error}
          </div>
        )}

        {/* Table */}

        {!loading && !error && (

          filteredDepartments.length === 0 ? (

            <div className="department-empty">
              <div className="empty-icon">🏢</div>

              <h3>No departments found</h3>

              <p>
                Try changing your search or add a new department.
              </p>
            </div>

          ) : (

            <div className="department-table-wrapper">

              <table className="department-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredDepartments.map((department) => (

                    <tr key={department.id}>

                      <td>
                        <span className="department-id">
                          #{department.id}
                        </span>
                      </td>

                      <td>
                        <div className="department-name-cell">

                          <div className="department-avatar">
                            {department.name?.charAt(0).toUpperCase()}
                          </div>

                          <strong>
                            {department.name}
                          </strong>

                        </div>
                      </td>

                      <td>
                        <span className="department-description">
                          {department.description || 'No description'}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`department-status ${department.status === 'Active'
                            ? 'active'
                            : 'inactive'
                            }`}
                        >
                          {department.status}
                        </span>

                      </td>

                      <td>

                        <div className="department-actions">

                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(department)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(department.id)}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )

        )}

      </div>

      {/* Role Management Section */}

      <div className="department-section role-section">

        <div className="department-section-header">

          <div>
            <h2>Role Management</h2>
            <p>
              Manage roles and assign them to employee departments
            </p>
          </div>

          <button
            className="add-department-btn"
            onClick={handleAddRole}
            disabled={departments.length === 0}
          >
            + Add Role
          </button>

        </div>

        <div className="department-summary role-summary">

          <div className="department-summary-card">
            <div className="summary-icon">👤</div>
            <div>
              <span>Total Roles</span>
              <strong>{totalRoles}</strong>
            </div>
          </div>

          <div className="department-summary-card">
            <div className="summary-icon">✓</div>
            <div>
              <span>Active Roles</span>
              <strong>{activeRoles}</strong>
            </div>
          </div>

          <div className="department-summary-card">
            <div className="summary-icon">○</div>
            <div>
              <span>Inactive Roles</span>
              <strong>{inactiveRoles}</strong>
            </div>
          </div>

        </div>

        <div className="department-filters">

          <div className="department-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search roles..."
              value={roleSearchTerm}
              onChange={(e) => setRoleSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={roleStatusFilter}
            onChange={(e) => setRoleStatusFilter(e.target.value)}
            className="department-status-filter"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        {roleLoading && (
          <div className="department-message">
            Loading roles...
          </div>
        )}

        {roleError && (
          <div className="department-error">
            {roleError}
          </div>
        )}

        {!roleLoading && !roleError && (
          filteredRoles.length === 0 ? (
            <div className="department-empty">
              <div className="empty-icon">👤</div>
              <h3>No roles found</h3>
              <p>
                {departments.length === 0
                  ? 'Add a department first before creating a role.'
                  : 'Try changing your search or add a new role.'}
              </p>
            </div>
          ) : (
            <div className="department-table-wrapper">

              <table className="department-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Role Name</th>
                    <th>Department</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredRoles.map((role) => (

                    <tr key={role.id}>

                      <td>
                        <span className="department-id">
                          #{role.id}
                        </span>
                      </td>

                      <td>
                        <div className="department-name-cell">

                          <div className="department-avatar">
                            {role.name?.charAt(0).toUpperCase()}
                          </div>

                          <strong>
                            {role.name}
                          </strong>

                        </div>
                      </td>

                      <td>
                        <span className="department-description">
                          {role.department?.name || 'No department'}
                        </span>
                      </td>

                      <td>
                        <span className="department-description">
                          {role.description || 'No description'}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`department-status ${role.status === 'Active'
                            ? 'active'
                            : 'inactive'
                            }`}
                        >
                          {role.status}
                        </span>
                      </td>

                      <td>
                        <div className="department-actions">

                          <button
                            className="edit-btn"
                            onClick={() => handleEditRole(role)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )
        )}

      </div>

      {/* Add / Edit Role Modal */}

      {showRoleModal && (

        <div className="department-modal-overlay">

          <div className="department-modal">

            <div className="department-modal-header">

              <div>
                <h2>
                  {editingRoleId ? 'Edit Role' : 'Add Role'}
                </h2>

                <p>
                  {editingRoleId
                    ? 'Update role information'
                    : 'Create a new department role'}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowRoleModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleRoleSubmit}>

              <div className="department-form-group">

                <label>Role Name</label>

                <input
                  type="text"
                  name="name"
                  value={roleFormData.name}
                  onChange={handleRoleChange}
                  placeholder="e.g. Software Engineer"
                  required
                />

              </div>

              <div className="department-form-group">

                <label>Department</label>

                <select
                  name="departmentId"
                  value={roleFormData.departmentId}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select Department</option>

                  {departments.map((department) => (
                    <option
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="department-form-group">

                <label>Description</label>

                <textarea
                  name="description"
                  value={roleFormData.description}
                  onChange={handleRoleChange}
                  placeholder="Enter role description..."
                  rows="4"
                />

              </div>

              <div className="department-form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={roleFormData.status}
                  onChange={handleRoleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

              <div className="department-modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowRoleModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-department-btn"
                >
                  {editingRoleId ? 'Update Role' : 'Save Role'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Add / Edit Modal */}

      {showModal && (

        <div className="department-modal-overlay">

          <div className="department-modal">

            <div className="department-modal-header">

              <div>
                <h2>
                  {editingId
                    ? 'Edit Department'
                    : 'Add Department'}
                </h2>

                <p>
                  {editingId
                    ? 'Update department information'
                    : 'Create a new employee department'}
                </p>
              </div>

              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="department-form-group">

                <label>
                  Department Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Human Resources"
                  required
                />

              </div>

              <div className="department-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter department description..."
                  rows="4"
                />

              </div>

              <div className="department-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

              <div className="department-modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-department-btn"
                >
                  {editingId
                    ? 'Update Department'
                    : 'Save Department'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default DepartmentsRoles