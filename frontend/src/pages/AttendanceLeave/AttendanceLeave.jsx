import { useEffect, useState } from 'react'
import './AttendanceLeave.css'

const ATTENDANCE_API_URL = 'http://localhost:8080/api/attendance'
const EMPLOYEE_API_URL = 'http://localhost:8080/api/employees'
const LEAVE_API_URL = 'http://localhost:8080/api/leave-requests'

function AttendanceLeave() {
    const [activeTab, setActiveTab] = useState('attendance')

    // =========================
    // ATTENDANCE
    // =========================

    const [attendanceRecords, setAttendanceRecords] = useState([])

    // =========================
    // EMPLOYEES
    // =========================

    const [employees, setEmployees] = useState([])

    // =========================
    // ATTENDANCE MODAL
    // =========================

    const [showAttendanceModal, setShowAttendanceModal] = useState(false)

    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [attendanceDate, setAttendanceDate] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [attendanceStatus, setAttendanceStatus] = useState('Present')

    const [editingAttendanceId, setEditingAttendanceId] = useState(null)

    // =========================
    // LEAVE
    // =========================

    const [leaveRequests, setLeaveRequests] = useState([])

    const [showLeaveModal, setShowLeaveModal] = useState(false)

    const [leaveEmployeeId, setLeaveEmployeeId] = useState('')
    const [leaveType, setLeaveType] = useState('Annual Leave')
    const [leaveStartDate, setLeaveStartDate] = useState('')
    const [leaveEndDate, setLeaveEndDate] = useState('')
    const [leaveDays, setLeaveDays] = useState(0)
    const [leaveReason, setLeaveReason] = useState('')

    // =========================
    // LOAD ATTENDANCE
    // =========================

    useEffect(() => {
        loadAttendance()
    }, [])

    const loadAttendance = async () => {
        try {
            const response = await fetch(ATTENDANCE_API_URL)

            if (!response.ok) {
                throw new Error('Failed to load attendance data')
            }

            const data = await response.json()

            console.log('Attendance data:', data)

            setAttendanceRecords(data)
        } catch (error) {
            console.error('Attendance loading error:', error)
        }
    }

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

            console.log('Employees:', data)

            setEmployees(data)
        } catch (error) {
            console.error('Employee loading error:', error)
        }
    }

    // =========================
    // LOAD LEAVE REQUESTS
    // AFTER EMPLOYEES LOAD
    // =========================

    useEffect(() => {
        if (employees.length > 0) {
            loadLeaveRequests()
        }
    }, [employees])

    const loadLeaveRequests = async () => {
        try {
            const response = await fetch(LEAVE_API_URL)

            if (!response.ok) {
                throw new Error('Failed to load leave requests')
            }

            const data = await response.json()

            console.log('Leave requests from API:', data)

            // Match employee ID with full employee object
            const updatedRequests = data.map((request) => {
                const employee = employees.find(
                    (emp) => emp.id === request.employee?.id
                )

                return {
                    ...request,
                    employee: employee || request.employee,
                }
            })

            console.log(
                'Leave requests with employee details:',
                updatedRequests
            )

            setLeaveRequests(updatedRequests)
        } catch (error) {
            console.error('Leave loading error:', error)
        }
    }

    // =========================
    // SAVE ATTENDANCE
    // =========================

    const handleSaveAttendance = async () => {
        if (!selectedEmployeeId || !attendanceDate) {
            alert('Please select an employee and date.')
            return
        }

        if (checkIn && checkOut && checkOut <= checkIn) {
            alert('Check Out time must be later than Check In time.')
            return
        }

        try {
            const isEditing = editingAttendanceId !== null

            let attendanceUrl = ATTENDANCE_API_URL

            if (isEditing) {
                attendanceUrl =
                    ATTENDANCE_API_URL + '/' + editingAttendanceId
            }

            const response = await fetch(
                attendanceUrl,
                {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employee: {
                            id: Number(selectedEmployeeId),
                        },
                        date: attendanceDate,
                        checkIn: checkIn || null,
                        checkOut: checkOut || null,
                        status: attendanceStatus,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(
                    isEditing
                        ? 'Failed to update attendance'
                        : 'Failed to save attendance'
                )
            }

            const savedAttendance = await response.json()

            if (isEditing) {
                setAttendanceRecords((previousRecords) =>
                    previousRecords.map((record) =>
                        record.id === editingAttendanceId
                            ? savedAttendance
                            : record
                    )
                )
            } else {
                setAttendanceRecords((previousRecords) => [
                    ...previousRecords,
                    savedAttendance,
                ])
            }

            closeAttendanceModal()

            alert(
                isEditing
                    ? 'Attendance updated successfully!'
                    : 'Attendance saved successfully!'
            )
        } catch (error) {
            console.error(
                isEditing
                    ? 'Attendance update error:'
                    : 'Attendance save error:',
                error
            )

            alert(
                isEditing
                    ? 'Failed to update attendance.'
                    : 'Failed to save attendance.'
            )
        }
    }

    // =========================
    // EDIT ATTENDANCE
    // =========================

    const handleEditAttendance = (record) => {
        setEditingAttendanceId(record.id)
        setSelectedEmployeeId(
            record.employee?.id ? String(record.employee.id) : ''
        )
        setAttendanceDate(record.date || '')
        setCheckIn(record.checkIn || '')
        setCheckOut(record.checkOut || '')
        setAttendanceStatus(record.status || 'Present')
        setShowAttendanceModal(true)
    }

    // =========================
    // DELETE ATTENDANCE
    // =========================

    const handleDeleteAttendance = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this attendance record?'
        )

        if (!confirmed) {
            return
        }

        try {
            const response = await fetch(
                ATTENDANCE_API_URL + '/' + id,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to delete attendance')
            }

            setAttendanceRecords((previousRecords) =>
                previousRecords.filter((record) => record.id !== id)
            )

            alert('Attendance deleted successfully!')
        } catch (error) {
            console.error('Attendance delete error:', error)
            alert('Failed to delete attendance.')
        }
    }

    // =========================
    // CLOSE ATTENDANCE MODAL
    // =========================

    const closeAttendanceModal = () => {
        setShowAttendanceModal(false)
        setEditingAttendanceId(null)
        setSelectedEmployeeId('')
        setAttendanceDate('')
        setCheckIn('')
        setCheckOut('')
        setAttendanceStatus('Present')
    }

    // =========================
    // CALCULATE LEAVE DAYS
    // =========================

    useEffect(() => {
        if (!leaveStartDate || !leaveEndDate) {
            setLeaveDays(0)
            return
        }

        const start = new Date(leaveStartDate)
        const end = new Date(leaveEndDate)

        if (end < start) {
            setLeaveDays(0)
            return
        }

        const difference =
            Math.floor(
                (end.getTime() - start.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1

        setLeaveDays(difference)
    }, [leaveStartDate, leaveEndDate])

    // =========================
    // SAVE LEAVE REQUEST
    // =========================

    const handleSaveLeaveRequest = async () => {
        if (!leaveEmployeeId) {
            alert('Please select an employee.')
            return
        }

        if (!leaveStartDate || !leaveEndDate) {
            alert('Please select start and end dates.')
            return
        }

        if (leaveDays <= 0) {
            alert('Please select valid leave dates.')
            return
        }

        try {
            const response = await fetch(LEAVE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee: {
                        id: Number(leaveEmployeeId),
                    },
                    leaveType: leaveType,
                    startDate: leaveStartDate,
                    endDate: leaveEndDate,
                    days: leaveDays,
                    reason: leaveReason,
                    status: 'Pending',
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to save leave request')
            }

            await response.json()

            // Reload from backend so full employee details are shown
            await loadLeaveRequests()

            // Close modal
            setShowLeaveModal(false)

            // Reset form
            setLeaveEmployeeId('')
            setLeaveType('Annual Leave')
            setLeaveStartDate('')
            setLeaveEndDate('')
            setLeaveDays(0)
            setLeaveReason('')

            alert('Leave request submitted successfully!')
        } catch (error) {
            console.error('Leave save error:', error)
            alert('Failed to save leave request.')
        }
    }

    // =========================
    // APPROVE / REJECT LEAVE
    // =========================

    const handleApproveLeave = async (id) => {
        try {
            const response = await fetch(LEAVE_API_URL + '/' + id + '/approve', {
                method: 'PUT',
            })

            if (!response.ok) {
                throw new Error('Failed to approve leave request')
            }

            await loadLeaveRequests()
            alert('Leave request approved successfully!')
        } catch (error) {
            console.error('Approve leave error:', error)
            alert('Failed to approve leave request.')
        }
    }

    const handleRejectLeave = async (id) => {
        try {
            const response = await fetch(LEAVE_API_URL + '/' + id + '/reject', {
                method: 'PUT',
            })

            if (!response.ok) {
                throw new Error('Failed to reject leave request')
            }

            await loadLeaveRequests()
            alert('Leave request rejected successfully!')
        } catch (error) {
            console.error('Reject leave error:', error)
            alert('Failed to reject leave request.')
        }
    }

    // =========================
    // CLOSE LEAVE MODAL
    // =========================

    const closeLeaveModal = () => {
        setShowLeaveModal(false)

        setLeaveEmployeeId('')
        setLeaveType('Annual Leave')
        setLeaveStartDate('')
        setLeaveEndDate('')
        setLeaveDays(0)
        setLeaveReason('')
    }

    // =========================
    // SUMMARY COUNTS
    // =========================

    const presentCount = attendanceRecords.filter(
        (record) => record.status === 'Present'
    ).length

    const lateCount = attendanceRecords.filter(
        (record) => record.status === 'Late'
    ).length

    const absentCount = attendanceRecords.filter(
        (record) => record.status === 'Absent'
    ).length

    const pendingLeaveCount = leaveRequests.filter(
        (request) => request.status === 'Pending'
    ).length

    // =========================
    // UI
    // =========================

    return (
        <div className="attendance-leave-page">

            {/* =========================
                MARK ATTENDANCE MODAL
            ========================= */}

            {showAttendanceModal && (
                <div className="modal-overlay">

                    <div className="modal-content">

                        <h2>
                            {editingAttendanceId
                                ? 'Edit Attendance'
                                : 'Mark Attendance'}
                        </h2>

                        <label>
                            Employee

                            <select
                                value={selectedEmployeeId}
                                onChange={(e) =>
                                    setSelectedEmployeeId(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Employee
                                </option>

                                {employees.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.name} (
                                        {employee.employeeCode}
                                        )
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Date

                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) =>
                                    setAttendanceDate(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Check In

                            <input
                                type="time"
                                value={checkIn}
                                onChange={(e) =>
                                    setCheckIn(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Check Out

                            <input
                                type="time"
                                value={checkOut}
                                onChange={(e) =>
                                    setCheckOut(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Status

                            <select
                                value={attendanceStatus}
                                onChange={(e) =>
                                    setAttendanceStatus(e.target.value)
                                }
                            >
                                <option value="Present">
                                    Present
                                </option>

                                <option value="Late">
                                    Late
                                </option>

                                <option value="Absent">
                                    Absent
                                </option>

                                <option value="On Leave">
                                    On Leave
                                </option>
                            </select>
                        </label>

                        <button
                            type="button"
                            className="mark-attendance-btn"
                            onClick={handleSaveAttendance}
                        >
                            {editingAttendanceId
                                ? 'Update Attendance'
                                : 'Save Attendance'}
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={closeAttendanceModal}
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

            {/* =========================
                REQUEST LEAVE MODAL
            ========================= */}

            {showLeaveModal && (
                <div className="modal-overlay">

                    <div className="modal-content">

                        <h2>Request Leave</h2>

                        <label>
                            Employee

                            <select
                                value={leaveEmployeeId}
                                onChange={(e) =>
                                    setLeaveEmployeeId(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Employee
                                </option>

                                {employees.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.name} (
                                        {employee.employeeCode}
                                        )
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Leave Type

                            <select
                                value={leaveType}
                                onChange={(e) =>
                                    setLeaveType(e.target.value)
                                }
                            >
                                <option value="Annual Leave">
                                    Annual Leave
                                </option>

                                <option value="Casual Leave">
                                    Casual Leave
                                </option>

                                <option value="Medical Leave">
                                    Medical Leave
                                </option>

                                <option value="Maternity Leave">
                                    Maternity Leave
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </label>

                        <label>
                            Start Date

                            <input
                                type="date"
                                value={leaveStartDate}
                                onChange={(e) =>
                                    setLeaveStartDate(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            End Date

                            <input
                                type="date"
                                value={leaveEndDate}
                                min={leaveStartDate || undefined}
                                onChange={(e) =>
                                    setLeaveEndDate(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Number of Days

                            <input
                                type="number"
                                value={leaveDays}
                                readOnly
                            />
                        </label>

                        <label>
                            Reason

                            <textarea
                                value={leaveReason}
                                onChange={(e) =>
                                    setLeaveReason(e.target.value)
                                }
                                placeholder="Enter reason for leave"
                                rows="4"
                            />
                        </label>

                        <label>
                            Status

                            <input
                                type="text"
                                value="Pending"
                                readOnly
                            />
                        </label>

                        <button
                            type="button"
                            className="mark-attendance-btn"
                            onClick={handleSaveLeaveRequest}
                        >
                            Submit Leave Request
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={closeLeaveModal}
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="attendance-header">

                <div>

                    <h1>Attendance & Leave</h1>

                    <p>
                        Manage employee attendance and leave requests
                    </p>

                </div>

                <button
                    className="mark-attendance-btn"
                    onClick={() => setShowAttendanceModal(true)}
                >
                    + Mark Attendance
                </button>

            </div>

            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="attendance-summary">

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ✓
                    </div>

                    <div>
                        <span>Present Today</span>

                        <strong>
                            {presentCount}
                        </strong>
                    </div>

                </div>

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ◷
                    </div>

                    <div>
                        <span>Late Today</span>

                        <strong>
                            {lateCount}
                        </strong>
                    </div>

                </div>

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ○
                    </div>

                    <div>
                        <span>Absent Today</span>

                        <strong>
                            {absentCount}
                        </strong>
                    </div>

                </div>

                <div className="attendance-summary-card">

                    <div className="attendance-summary-icon">
                        ▣
                    </div>

                    <div>
                        <span>Pending Leaves</span>

                        <strong>
                            {pendingLeaveCount}
                        </strong>
                    </div>

                </div>

            </div>

            {/* =========================
                TABS
            ========================= */}

            <div className="attendance-tabs">

                <button
                    className={
                        activeTab === 'attendance'
                            ? 'attendance-tab active'
                            : 'attendance-tab'
                    }
                    onClick={() => setActiveTab('attendance')}
                >
                    Attendance
                </button>

                <button
                    className={
                        activeTab === 'leave'
                            ? 'attendance-tab active'
                            : 'attendance-tab'
                    }
                    onClick={() => setActiveTab('leave')}
                >
                    Leave Requests
                </button>

            </div>

            {/* =========================
                ATTENDANCE TAB
            ========================= */}

            {activeTab === 'attendance' && (

                <div className="attendance-card">

                    <div className="attendance-card-header">

                        <div>

                            <h2>Today's Attendance</h2>

                            <p>
                                Employee attendance records for today
                            </p>

                        </div>

                        <input
                            type="date"
                            defaultValue="2026-09-14"
                            className="attendance-date"
                        />

                    </div>

                    <div className="table-container">

                        <table className="attendance-table">

                            <thead>

                                <tr>
                                    <th>Employee</th>
                                    <th>Employee ID</th>
                                    <th>Department</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {attendanceRecords.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            style={{
                                                textAlign: 'center',
                                                padding: '30px',
                                            }}
                                        >
                                            No attendance records found.
                                        </td>

                                    </tr>

                                ) : (

                                    attendanceRecords.map((record) => (

                                        <tr key={record.id}>

                                            <td>

                                                <div className="attendance-employee">

                                                    <div className="attendance-avatar">

                                                        {(
                                                            record.employee?.name ||
                                                            'Employee'
                                                        )
                                                            .split(' ')
                                                            .map(
                                                                (name) =>
                                                                    name[0]
                                                            )
                                                            .join('')
                                                            .toUpperCase()}

                                                    </div>

                                                    <strong>
                                                        {record.employee?.name ||
                                                            'Unknown Employee'}
                                                    </strong>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="attendance-id">

                                                    {record.employee?.employeeCode ||
                                                        'N/A'}

                                                </span>

                                            </td>

                                            <td>

                                                {record.employee?.department ||
                                                    'N/A'}

                                            </td>

                                            <td>
                                                {record.checkIn || '-'}
                                            </td>

                                            <td>
                                                {record.checkOut || '-'}
                                            </td>

                                            <td>

                                                <span
                                                    className={`attendance-status ${record.status ===
                                                        'Present'
                                                        ? 'attendance-present'
                                                        : record.status ===
                                                            'Late'
                                                            ? 'attendance-late'
                                                            : 'attendance-leave'
                                                        }`}
                                                >
                                                    {record.status}
                                                </span>

                                            </td>

                                            <td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: '8px',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEditAttendance(record)
                                                        }
                                                        style={{
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontWeight: '600',
                                                            background: '#1565c0',
                                                            color: '#ffffff',
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteAttendance(record.id)
                                                        }
                                                        style={{
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            padding: '8px 12px',
                                                            cursor: 'pointer',
                                                            fontWeight: '600',
                                                            background: '#c62828',
                                                            color: '#ffffff',
                                                        }}
                                                    >
                                                        Delete
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

            )}

            {/* =========================
                LEAVE TAB
            ========================= */}

            {activeTab === 'leave' && (

                <div className="attendance-card">

                    <div className="attendance-card-header">

                        <div>

                            <h2>Leave Requests</h2>

                            <p>
                                Review and manage employee leave requests
                            </p>

                        </div>

                        <button
                            className="request-leave-btn"
                            onClick={() => setShowLeaveModal(true)}
                        >
                            + Request Leave
                        </button>

                    </div>

                    <div className="table-container">

                        <table className="attendance-table">

                            <thead>

                                <tr>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Days</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {leaveRequests.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            style={{
                                                textAlign: 'center',
                                                padding: '30px',
                                            }}
                                        >
                                            No leave requests found.
                                        </td>

                                    </tr>

                                ) : (

                                    leaveRequests.map((request) => (

                                        <tr key={request.id}>

                                            <td>

                                                <div className="leave-employee">

                                                    <strong>
                                                        {request.employee?.name ||
                                                            'Unknown Employee'}
                                                    </strong>

                                                    <span>
                                                        {request.employee
                                                            ?.employeeCode ||
                                                            'N/A'}
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {request.leaveType}
                                            </td>

                                            <td>
                                                {request.startDate}
                                            </td>

                                            <td>
                                                {request.endDate}
                                            </td>

                                            <td>
                                                {request.days}
                                            </td>

                                            <td>
                                                {request.reason || '-'}
                                            </td>

                                            <td>

                                                <span
                                                    className={`leave-status ${request.status ===
                                                        'Approved'
                                                        ? 'leave-approved'
                                                        : request.status ===
                                                            'Rejected'
                                                            ? 'leave-rejected'
                                                            : 'leave-pending'
                                                        }`}
                                                >
                                                    {request.status}
                                                </span>

                                            </td>

                                            <td>
                                                {request.status === 'Pending' ? (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            gap: '8px',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleApproveLeave(request.id)
                                                            }
                                                            style={{
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                padding: '8px 12px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                background: '#2e7d32',
                                                                color: '#ffffff',
                                                            }}
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRejectLeave(request.id)
                                                            }
                                                            style={{
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                padding: '8px 12px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                background: '#c62828',
                                                                color: '#ffffff',
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: '#777' }}>
                                                        No action
                                                    </span>
                                                )}
                                            </td>


                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    )
}

export default AttendanceLeave