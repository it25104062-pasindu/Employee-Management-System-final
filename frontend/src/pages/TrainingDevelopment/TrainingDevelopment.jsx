import { useEffect, useState } from 'react'
import './TrainingDevelopment.css'

const TRAINING_API_URL = 'http://localhost:8080/api/trainings'
const EMPLOYEE_API_URL = 'http://localhost:8080/api/employees'

function TrainingDevelopment() {

  const [trainings, setTrainings] = useState([])
  const [employees, setEmployees] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [editingTraining, setEditingTraining] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [formData, setFormData] = useState({
    trainingTitle: '',
    employeeId: '',
    trainingProvider: '',
    startDate: '',
    endDate: '',
    status: 'Planned',
    description: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [trainingResponse, employeeResponse] = await Promise.all([
        fetch(TRAINING_API_URL),
        fetch(EMPLOYEE_API_URL)
      ])

      if (!trainingResponse.ok || !employeeResponse.ok) {
        throw new Error('Failed to load data')
      }

      const trainingData = await trainingResponse.json()
      const employeeData = await employeeResponse.json()

      setTrainings(trainingData)
      setEmployees(employeeData)

    } catch (err) {
      console.error(err)
      setError('Unable to load training data. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // FORM HANDLING
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const openAddModal = () => {
    setEditingTraining(null)

    setFormData({
      trainingTitle: '',
      employeeId: '',
      trainingProvider: '',
      startDate: '',
      endDate: '',
      status: 'Planned',
      description: ''
    })

    setShowModal(true)
  }

  const openEditModal = (training) => {
    setEditingTraining(training)

    setFormData({
      trainingTitle: training.trainingTitle || '',
      employeeId: training.employee?.id || '',
      trainingProvider: training.trainingProvider || '',
      startDate: training.startDate || '',
      endDate: training.endDate || '',
      status: training.status || 'Planned',
      description: training.description || ''
    })

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTraining(null)
  }

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.trainingTitle.trim()) {
      alert('Training title is required.')
      return
    }

    if (!formData.employeeId) {
      alert('Please select an employee.')
      return
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      alert('End date cannot be before start date.')
      return
    }

    const trainingData = {
      trainingTitle: formData.trainingTitle,
      employee: {
        id: Number(formData.employeeId)
      },
      trainingProvider: formData.trainingProvider,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      status: formData.status,
      description: formData.description
    }

    try {

      const url = editingTraining
        ? `${TRAINING_API_URL}/${editingTraining.id}`
        : TRAINING_API_URL

      const method = editingTraining ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainingData)
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Request failed')
      }

      await loadData()
      closeModal()

      alert(
        editingTraining
          ? 'Training updated successfully!'
          : 'Training added successfully!'
      )

    } catch (err) {
      console.error(err)
      alert(`Error: ${err.message}`)
    }
  }

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this training record?'
    )

    if (!confirmed) {
      return
    }

    try {

      const response = await fetch(
        `${TRAINING_API_URL}/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete training')
      }

      await loadData()

      alert('Training deleted successfully!')

    } catch (err) {
      console.error(err)
      alert('Unable to delete training.')
    }
  }

  // =========================
  // FILTERING
  // =========================

  const filteredTrainings = trainings.filter(training => {

    const employeeName =
      training.employee?.name?.toLowerCase() || ''

    const title =
      training.trainingTitle?.toLowerCase() || ''

    const provider =
      training.trainingProvider?.toLowerCase() || ''

    const search =
      searchTerm.toLowerCase()

    const matchesSearch =
      title.includes(search) ||
      employeeName.includes(search) ||
      provider.includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      training.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // =========================
  // SUMMARY COUNTS
  // =========================

  const totalTrainings = trainings.length

  const plannedTrainings =
    trainings.filter(t => t.status === 'Planned').length

  const ongoingTrainings =
    trainings.filter(t => t.status === 'Ongoing').length

  const completedTrainings =
    trainings.filter(t => t.status === 'Completed').length

  // =========================
  // UI
  // =========================

  return (
    <div className="training-page">

      <div className="training-header">
        <div>
          <h1>Training & Development</h1>
          <p>
            Manage employee training and development programs
          </p>
        </div>

        <button
          className="training-add-btn"
          onClick={openAddModal}
        >
          + Add Training
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div className="training-summary">

        <div className="training-card">
          <h3>Total Trainings</h3>
          <div className="training-number">
            {totalTrainings}
          </div>
        </div>

        <div className="training-card">
          <h3>Planned</h3>
          <div className="training-number">
            {plannedTrainings}
          </div>
        </div>

        <div className="training-card">
          <h3>Ongoing</h3>
          <div className="training-number">
            {ongoingTrainings}
          </div>
        </div>

        <div className="training-card">
          <h3>Completed</h3>
          <div className="training-number">
            {completedTrainings}
          </div>
        </div>

      </div>

      {/* FILTERS */}

      <div className="training-filters">

        <input
          type="text"
          placeholder="Search training, employee or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Planned">Planned</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* ERROR */}

      {error && (
        <div className="training-error">
          {error}
        </div>
      )}

      {/* TABLE */}

      <div className="training-table-container">

        {loading ? (
          <div className="training-empty">
            Loading training records...
          </div>
        ) : filteredTrainings.length === 0 ? (
          <div className="training-empty">
            No training records found.
          </div>
        ) : (

          <table className="training-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Training Title</th>
                <th>Employee</th>
                <th>Provider</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTrainings.map(training => (

                <tr key={training.id}>

                  <td>
                    {training.id}
                  </td>

                  <td>
                    <strong>
                      {training.trainingTitle}
                    </strong>
                  </td>

                  <td>
                    {training.employee?.name || 'N/A'}
                  </td>

                  <td>
                    {training.trainingProvider || '-'}
                  </td>

                  <td>
                    {training.startDate || '-'}
                  </td>

                  <td>
                    {training.endDate || '-'}
                  </td>

                  <td>
                    <span
                      className={`training-status ${training.status?.toLowerCase()}`}
                    >
                      {training.status}
                    </span>
                  </td>

                  <td>

                    <div className="training-actions">

                      <button
                        className="training-edit-btn"
                        onClick={() =>
                          openEditModal(training)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="training-delete-btn"
                        onClick={() =>
                          handleDelete(training.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="training-modal-overlay">

          <div className="training-modal">

            <div className="training-modal-header">

              <h2>
                {editingTraining
                  ? 'Edit Training'
                  : 'Add Training'}
              </h2>

              <button
                className="training-close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="training-form-group">

                <label>
                  Training Title *
                </label>

                <input
                  type="text"
                  name="trainingTitle"
                  value={formData.trainingTitle}
                  onChange={handleChange}
                  placeholder="Enter training title"
                  required
                />

              </div>

              <div className="training-form-group">

                <label>
                  Employee *
                </label>

                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Employee
                  </option>

                  {employees.map(employee => (

                    <option
                      key={employee.id}
                      value={employee.id}
                    >
                      {employee.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="training-form-group">

                <label>
                  Training Provider
                </label>

                <input
                  type="text"
                  name="trainingProvider"
                  value={formData.trainingProvider}
                  onChange={handleChange}
                  placeholder="Enter training provider"
                />

              </div>

              <div className="training-form-row">

                <div className="training-form-group">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="training-form-group">

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="training-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Planned">
                    Planned
                  </option>

                  <option value="Ongoing">
                    Ongoing
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              <div className="training-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter training description"
                  rows="4"
                />

              </div>

              <div className="training-modal-actions">

                <button
                  type="button"
                  className="training-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="training-save-btn"
                >
                  {editingTraining
                    ? 'Update Training'
                    : 'Save Training'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default TrainingDevelopment