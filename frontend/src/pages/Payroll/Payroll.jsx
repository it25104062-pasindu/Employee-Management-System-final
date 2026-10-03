import { useEffect, useState } from 'react'

import './Payroll.css'

const PAYROLL_API_URL = 'http://localhost:8080/api/payroll'
const EMPLOYEE_API_URL = 'http://localhost:8080/api/employees'

function Payroll() {

  const [showPayrollModal, setShowPayrollModal] = useState(false)

  const [payrolls, setPayrolls] = useState([])
  const [employees, setEmployees] = useState([])

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [basicSalary, setBasicSalary] = useState('')
  const [allowances, setAllowances] = useState('')
  const [deductions, setDeductions] = useState('')
  const [payrollMonth, setPayrollMonth] = useState('')
  const [editingPayrollId, setEditingPayrollId] = useState(null)

  // =========================
  // LOAD EMPLOYEES
  // =========================

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const response = await fetch(EMPLOYEE_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load employees')
      }

      const data = await response.json()
      setEmployees(data)

    } catch (error) {
      console.error('Employee loading error:', error)
      alert('Failed to load employees.')
    }
  }

  // =========================
  // LOAD PAYROLLS
  // =========================

  useEffect(() => {
    loadPayrolls()
  }, [])

  const loadPayrolls = async () => {
    try {
      const response = await fetch(PAYROLL_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load payroll records')
      }

      const data = await response.json()
      setPayrolls(data)

    } catch (error) {
      console.error('Payroll loading error:', error)
    }
  }

  // =========================
  // CALCULATE NET SALARY
  // =========================

  const calculateNetSalary = () => {
    const basic = Number(basicSalary) || 0
    const allowance = Number(allowances) || 0
    const deduction = Number(deductions) || 0

    return basic + allowance - deduction
  }

  // =========================
  // GENERATE PAYROLL
  // =========================

  const handleGeneratePayroll = async (e) => {
    e.preventDefault()

    if (!selectedEmployeeId || !basicSalary || !payrollMonth) {
      alert('Please fill in all required fields.')
      return
    }

    if (
      Number(basicSalary) < 0 ||
      Number(allowances || 0) < 0 ||
      Number(deductions || 0) < 0
    ) {
      alert('Salary values cannot be negative.')
      return
    }

    const selectedEmployee = employees.find(
      (employee) => employee.id === Number(selectedEmployeeId)
    )

    if (!selectedEmployee) {
      alert('Selected employee was not found.')
      return
    }

    try {

      const isEditing = editingPayrollId !== null

      const url = isEditing
        ? `${PAYROLL_API_URL}/${editingPayrollId}`
        : PAYROLL_API_URL

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          employee: {
            id: Number(selectedEmployeeId)
          },

          payrollMonth,

          basicSalary: Number(basicSalary),

          allowances: Number(allowances) || 0,

          deductions: Number(deductions) || 0,

          status: 'Generated',
        }),
      })

      if (!response.ok) {

        const errorText = await response.text()

        console.error(
          'Payroll API error:',
          errorText
        )

        throw new Error('Payroll save failed')
      }

      const savedPayroll = await response.json()

      if (isEditing) {

        setPayrolls((previous) =>
          previous.map((payroll) =>
            payroll.id === editingPayrollId
              ? {
                  ...savedPayroll,
                  employee: selectedEmployee
                }
              : payroll
          )
        )

      } else {

        setPayrolls((previous) => [
          ...previous,

          {
            ...savedPayroll,
            employee: selectedEmployee
          }
        ])
      }

      closePayrollModal()

      alert(
        isEditing
          ? 'Payroll updated successfully!'
          : 'Payroll generated successfully!'
      )

    } catch (error) {

      console.error(
        'Payroll save/update error:',
        error
      )

      alert(
        editingPayrollId !== null
          ? 'Failed to update payroll.'
          : 'Failed to generate payroll.'
      )
    }
  }

  // =========================
  // EDIT PAYROLL
  // =========================

  const handleEditPayroll = (payroll) => {

    setEditingPayrollId(payroll.id)

    setSelectedEmployeeId(
      payroll.employee?.id
        ? String(payroll.employee.id)
        : ''
    )

    setBasicSalary(
      payroll.basicSalary ?? ''
    )

    setAllowances(
      payroll.allowances ?? ''
    )

    setDeductions(
      payroll.deductions ?? ''
    )

    setPayrollMonth(
      payroll.payrollMonth ?? ''
    )

    setShowPayrollModal(true)
  }

  // =========================
  // DELETE PAYROLL
  // =========================

  const handleDeletePayroll = async (id) => {

    if (
      !window.confirm(
        'Are you sure you want to delete this payroll record?'
      )
    ) {
      return
    }

    try {

      const response = await fetch(
        `${PAYROLL_API_URL}/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setPayrolls((previous) =>
        previous.filter(
          (payroll) => payroll.id !== id
        )
      )

      alert('Payroll deleted successfully!')

    } catch (error) {

      console.error(
        'Payroll delete error:',
        error
      )

      alert('Failed to delete payroll.')
    }
  }

  // =========================
  // DOWNLOAD PAYSLIP
  // =========================

  const handleDownloadPayslip = async (id) => {

    try {

      const response = await fetch(
        `${PAYROLL_API_URL}/${id}/payslip`
      )

      if (!response.ok) {
        throw new Error(
          'Payslip generation failed'
        )
      }

      const blob = await response.blob()

      const url =
        window.URL.createObjectURL(blob)

      const link =
        document.createElement('a')

      link.href = url

      link.download =
        `payslip-${id}.pdf`

      document.body.appendChild(link)

      link.click()

      link.remove()

      window.URL.revokeObjectURL(url)

    } catch (error) {

      console.error(
        'Payslip download error:',
        error
      )

      alert(
        'Failed to download payslip.'
      )
    }
  }

  // =========================
  // SEND PAYSLIP BY EMAIL
  // =========================

  const handleSendPayslipEmail = async (id) => {

    try {

      const response = await fetch(
        `${PAYROLL_API_URL}/${id}/send-payslip-email`,
        {
          method: 'POST'
        }
      )

      const data = await response.text()

      if (!response.ok) {

        throw new Error(
          data ||
          'Failed to send payslip email'
        )
      }

      alert(
        'Payslip emailed successfully!'
      )

    } catch (error) {

      console.error(
        'Payslip email error:',
        error
      )

      alert(
        'Failed to send payslip email.'
      )
    }
  }

  // =========================
  // RESET FORM
  // =========================

  const resetPayrollForm = () => {

    setSelectedEmployeeId('')
    setBasicSalary('')
    setAllowances('')
    setDeductions('')
    setPayrollMonth('')
    setEditingPayrollId(null)
  }

  // =========================
  // CLOSE MODAL
  // =========================

  const closePayrollModal = () => {

    setShowPayrollModal(false)

    resetPayrollForm()
  }

  // =========================
  // TOTAL PAYROLL
  // =========================

  const totalPayroll = payrolls.reduce(
    (total, payroll) =>
      total +
      Number(payroll.netSalary || 0),

    0
  )

  return (

    <div className="payroll-page">

      {/* =========================
                PAYROLL HEADER
          ========================= */}

      <div className="payroll-header">

        <div>

          <h1>
            Payroll Management
          </h1>

          <p>
            Compute employee salaries and generate payslips
          </p>

        </div>

        <button
          className="generate-payroll-btn"
          onClick={() =>
            setShowPayrollModal(true)
          }
        >
          + Generate Payroll
        </button>

      </div>


      {/* =========================
                SUMMARY CARDS
          ========================= */}

      <div className="payroll-summary">

        <div className="payroll-summary-card">

          <div className="payroll-summary-icon">
            $
          </div>

          <div>

            <span>
              Total Payroll
            </span>

            <strong>
              LKR {totalPayroll.toLocaleString()}
            </strong>

          </div>

        </div>


        <div className="payroll-summary-card">

          <div className="payroll-summary-icon">
            #
          </div>

          <div>

            <span>
              Payroll Records
            </span>

            <strong>
              {payrolls.length}
            </strong>

          </div>

        </div>


        <div className="payroll-summary-card">

          <div className="payroll-summary-icon">
            ✓
          </div>

          <div>

            <span>
              Generated
            </span>

            <strong>

              {
                payrolls.filter(
                  (payroll) =>
                    payroll.status === 'Generated'
                ).length
              }

            </strong>

          </div>

        </div>


        <div className="payroll-summary-card">

          <div className="payroll-summary-icon">
            ₨
          </div>

          <div>

            <span>
              Average Net Salary
            </span>

            <strong>

              LKR {

                payrolls.length > 0
                  ? Math.round(
                      totalPayroll /
                      payrolls.length
                    ).toLocaleString()
                  : '0'

              }

            </strong>

          </div>

        </div>

      </div>


      {/* =========================
                PAYROLL TABLE
          ========================= */}

      <div className="payroll-card">

        <div className="payroll-card-header">

          <div>

            <h2>
              Payroll Records
            </h2>

            <p>
              View employee salary and payroll information
            </p>

          </div>

        </div>


        <div className="table-container">

          <table className="payroll-table">

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Employee ID
                </th>

                <th>
                  Month
                </th>

                <th>
                  Basic Salary
                </th>

                <th>
                  Allowances
                </th>

                <th>
                  Deductions
                </th>

                <th>
                  Net Salary
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {payrolls.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: 'center',
                      padding: '40px'
                    }}
                  >
                    No payroll records found.
                  </td>

                </tr>

              ) : (

                payrolls.map((payroll) => (

                  <tr key={payroll.id}>

                    <td>

                      <strong>
                        {
                          payroll.employee?.name ||
                          'Unknown Employee'
                        }
                      </strong>

                    </td>

                    <td>

                      <span className="payroll-employee-id">
                        {
                          payroll.employee?.employeeCode ||
                          'N/A'
                        }
                      </span>

                    </td>

                    <td>
                      {payroll.payrollMonth || '-'}
                    </td>

                    <td>
                      LKR {
                        Number(
                          payroll.basicSalary || 0
                        ).toLocaleString()
                      }
                    </td>

                    <td>
                      LKR {
                        Number(
                          payroll.allowances || 0
                        ).toLocaleString()
                      }
                    </td>

                    <td>
                      LKR {
                        Number(
                          payroll.deductions || 0
                        ).toLocaleString()
                      }
                    </td>

                    <td>

                      <strong>
                        LKR {
                          Number(
                            payroll.netSalary || 0
                          ).toLocaleString()
                        }
                      </strong>

                    </td>

                    <td>

                      <span className="payroll-status">
                        {payroll.status}
                      </span>

                    </td>

                    <td>

                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}
                      >

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEditPayroll(payroll)
                          }
                          style={{
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            background: '#1565c0',
                            color: '#ffffff'
                          }}
                        >
                          Edit
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeletePayroll(
                              payroll.id
                            )
                          }
                          style={{
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            background: '#c62828',
                            color: '#ffffff'
                          }}
                        >
                          Delete
                        </button>


                        {/* DOWNLOAD PAYSLIP */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadPayslip(
                              payroll.id
                            )
                          }
                          style={{
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            background: '#2e7d32',
                            color: '#ffffff'
                          }}
                        >
                          Download Payslip
                        </button>


                        {/* SEND PAYSLIP EMAIL */}

                        <button
                          type="button"
                          onClick={() =>
                            handleSendPayslipEmail(
                              payroll.id
                            )
                          }
                          style={{
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            background: '#7b1fa2',
                            color: '#ffffff'
                          }}
                        >
                          Send Payslip Email
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
                GENERATE PAYROLL MODAL
          ========================= */}

      {showPayrollModal && (

        <div className="modal-overlay">

          <div className="modal-content payroll-modal">

            <h2>

              {editingPayrollId !== null
                ? 'Edit Payroll'
                : 'Generate Payroll'}

            </h2>

            <p className="modal-description">
              Enter employee salary details
            </p>


            <form
              onSubmit={handleGeneratePayroll}
            >

              <label>

                Employee

                <select
                  value={selectedEmployeeId}
                  onChange={(e) =>
                    setSelectedEmployeeId(
                      e.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Select Employee
                  </option>

                  {employees.map(
                    (employee) => (

                      <option
                        key={employee.id}
                        value={employee.id}
                      >
                        {employee.name} (
                        {employee.employeeCode}
                        )
                      </option>

                    )
                  )}

                </select>

              </label>


              <label>

                Payroll Month

                <input
                  type="month"
                  value={payrollMonth}
                  onChange={(e) =>
                    setPayrollMonth(
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Basic Salary

                <input
                  type="number"
                  min="0"
                  value={basicSalary}
                  onChange={(e) =>
                    setBasicSalary(
                      e.target.value
                    )
                  }
                  placeholder="Enter basic salary"
                />

              </label>


              <label>

                Allowances

                <input
                  type="number"
                  min="0"
                  value={allowances}
                  onChange={(e) =>
                    setAllowances(
                      e.target.value
                    )
                  }
                  placeholder="Enter allowances"
                />

              </label>


              <label>

                Deductions

                <input
                  type="number"
                  min="0"
                  value={deductions}
                  onChange={(e) =>
                    setDeductions(
                      e.target.value
                    )
                  }
                  placeholder="Enter deductions"
                />

              </label>


              {/* NET SALARY PREVIEW */}

              <div className="net-salary-preview">

                <span>
                  Net Salary
                </span>

                <strong>
                  LKR {
                    calculateNetSalary()
                      .toLocaleString()
                  }
                </strong>

              </div>


              <button
                type="submit"
                className="generate-payroll-btn"
              >

                {editingPayrollId !== null
                  ? 'Update Payroll'
                  : 'Generate Payroll'}

              </button>


              <button
                type="button"
                className="secondary-btn"
                onClick={closePayrollModal}
              >
                Close
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Payroll