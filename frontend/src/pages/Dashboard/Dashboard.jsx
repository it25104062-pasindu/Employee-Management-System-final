import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard-page">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-box">EMS</div>
                    <span>EMS</span>
                </div>

                <nav className="sidebar-nav">

                    <Link to="/dashboard" className="nav-item active">
                        <span>▦</span>
                        Dashboard
                    </Link>

                    <Link to="/employees" className="nav-item">
                        <span>♙</span>
                        Employees
                    </Link>

                    <Link to="/attendance-leave" className="nav-item">
                        <span>✓</span>
                        Attendance & Leave
                    </Link>

                    <Link to="/payroll" className="nav-item">
                        <span>₨</span>
                        Payroll
                    </Link>

                    <Link to="/recruitment" className="nav-item">
                        <span>♧</span>
                        Recruitment
                    </Link>

                    <Link to="/departments-roles" className="nav-item">
                        <span>▣</span>
                        Departments & Roles
                    </Link>

                    <Link to="/training-development" className="nav-item">
                        <span>◇</span>
                        Training & Development
                    </Link>

                    <Link to="/reports" className="nav-item">
                        <span>▤</span>
                        Reports
                    </Link>

                    <Link to="/notifications" className="nav-item">
                        <span>●</span>
                        Notifications
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <a href="#settings" className="nav-item">
                        <span>⚙</span>
                        Settings
                    </a>

                    <a href="#logout" className="nav-item logout">
                        <span>↪</span>
                        Logout
                    </a>

                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">

                {/* Top Navbar */}
                <header className="top-navbar">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, Administrator</p>
                    </div>

                    <div className="navbar-right">

                        <div className="search-box">
                            <span>⌕</span>
                            <input
                                type="text"
                                placeholder="Search..."
                            />
                        </div>

                        <button className="notification-button">
                            🔔
                        </button>

                        <div className="profile">
                            <div className="profile-avatar">AD</div>

                            <div>
                                <strong>Administrator</strong>
                                <small>System Admin</small>
                            </div>
                        </div>

                    </div>
                </header>

                {/* Dashboard Content */}
                <section className="dashboard-content">

                    <div className="page-heading">

                        <div>
                            <h2>Overview</h2>
                            <p>
                                Here's what's happening in your organization today.
                            </p>
                        </div>

                        <button className="primary-action">
                            + Add Employee
                        </button>

                    </div>

                    {/* Statistics */}
                    <div className="stats-grid">

                        <div className="stat-card">
                            <div className="stat-icon">♙</div>

                            <div>
                                <span>Total Employees</span>
                                <h3>248</h3>
                                <small>+12 this month</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">✓</div>

                            <div>
                                <span>Present Today</span>
                                <h3>221</h3>
                                <small>89.1% attendance</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">◷</div>

                            <div>
                                <span>Leave Requests</span>
                                <h3>18</h3>
                                <small>Pending approval</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">₨</div>

                            <div>
                                <span>Payroll Summary</span>
                                <h3>Rs. 8.4M</h3>
                                <small>This month</small>
                            </div>
                        </div>

                    </div>

                    {/* Lower Sections */}
                    <div className="dashboard-grid">

                        {/* Recent Employees */}
                        <div className="dashboard-card">

                            <div className="card-header">
                                <div>
                                    <h3>Recent Employees</h3>
                                    <p>Recently added employees</p>
                                </div>

                                <button>View All</button>
                            </div>

                            <div className="employee-list">

                                <div className="employee-row">
                                    <div className="employee-avatar">JD</div>

                                    <div className="employee-info">
                                        <strong>John Doe</strong>
                                        <span>Software Engineer</span>
                                    </div>

                                    <span className="status active-status">
                                        Active
                                    </span>
                                </div>

                                <div className="employee-row">
                                    <div className="employee-avatar">AS</div>

                                    <div className="employee-info">
                                        <strong>Anna Silva</strong>
                                        <span>HR Executive</span>
                                    </div>

                                    <span className="status active-status">
                                        Active
                                    </span>
                                </div>

                                <div className="employee-row">
                                    <div className="employee-avatar">KM</div>

                                    <div className="employee-info">
                                        <strong>Kamal Perera</strong>
                                        <span>Accountant</span>
                                    </div>

                                    <span className="status active-status">
                                        Active
                                    </span>
                                </div>

                                <div className="employee-row">
                                    <div className="employee-avatar">NS</div>

                                    <div className="employee-info">
                                        <strong>Nimali Silva</strong>
                                        <span>Marketing Officer</span>
                                    </div>

                                    <span className="status pending-status">
                                        On Leave
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Attendance Overview */}
                        <div className="dashboard-card">

                            <div className="card-header">
                                <div>
                                    <h3>Attendance Overview</h3>
                                    <p>Today's attendance status</p>
                                </div>
                            </div>

                            <div className="attendance-overview">

                                <div className="attendance-circle">
                                    <strong>89%</strong>
                                    <span>Present</span>
                                </div>

                                <div className="attendance-details">

                                    <div>
                                        <span className="legend present"></span>
                                        <span>Present</span>
                                        <strong>221</strong>
                                    </div>

                                    <div>
                                        <span className="legend absent"></span>
                                        <span>Absent</span>
                                        <strong>12</strong>
                                    </div>

                                    <div>
                                        <span className="legend leave"></span>
                                        <span>On Leave</span>
                                        <strong>15</strong>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-card quick-actions-card">

                        <div className="card-header">
                            <div>
                                <h3>Quick Actions</h3>
                                <p>Frequently used actions</p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <button>
                                <span>+</span>
                                Add Employee
                            </button>

                            <button>
                                <span>✓</span>
                                Mark Attendance
                            </button>

                            <button>
                                <span>◷</span>
                                Review Leave
                            </button>

                            <button>
                                <span>₨</span>
                                View Payroll
                            </button>

                        </div>

                    </div>

                </section>
            </main>
        </div>
    )
}

export default Dashboard