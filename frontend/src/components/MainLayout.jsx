import { Link, useLocation, useNavigate } from 'react-router-dom'
import './MainLayout.css'

function MainLayout({ children, onLogout, currentUser }) {

    const location = useLocation()
    const navigate = useNavigate()

    // Logged-in user's role
    const userRole = currentUser?.role || 'EMPLOYEE'

    // =========================
    // ALL MENU ITEMS
    // =========================

    const menuItems = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: '▣',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'DEPARTMENT_MANAGER',
                'PAYROLL_OFFICER',
                'EMPLOYEE'
            ]
        },
        {
            path: '/employees',
            label: 'Employees',
            icon: '👥',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'DEPARTMENT_MANAGER'
            ]
        },
        {
            path: '/attendance-leave',
            label: 'Attendance & Leave',
            icon: '🕒',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'DEPARTMENT_MANAGER',
                'EMPLOYEE'
            ]
        },
        {
            path: '/payroll',
            label: 'Payroll',
            icon: '💰',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'PAYROLL_OFFICER',
                'EMPLOYEE'
            ]
        },
        {
            path: '/recruitment',
            label: 'Recruitment',
            icon: '📋',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER'
            ]
        },
        {
            path: '/departments-roles',
            label: 'Departments & Roles',
            icon: '🏢',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER'
            ]
        },
        {
            path: '/training-development',
            label: 'Training & Development',
            icon: '🎓',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'EMPLOYEE'
            ]
        },
        {
            path: '/reports',
            label: 'Reports',
            icon: '📊',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'DEPARTMENT_MANAGER',
                'PAYROLL_OFFICER'
            ]
        },
        {
            path: '/notifications',
            label: 'Notifications',
            icon: '🔔',
            roles: [
                'ADMIN',
                'SYSTEM_ADMIN',
                'HR_MANAGER',
                'DEPARTMENT_MANAGER',
                'PAYROLL_OFFICER',
                'EMPLOYEE'
            ]
        }
    ]

    // =========================
    // FILTER MENU BY ROLE
    // =========================

    const visibleMenuItems = menuItems.filter((item) =>
        item.roles.includes(userRole)
    )

    // =========================
    // ROLE DISPLAY NAME
    // =========================

    const getRoleDisplayName = () => {

        switch (userRole) {

            case 'ADMIN':
            case 'SYSTEM_ADMIN':
                return 'System Admin'

            case 'HR_MANAGER':
                return 'HR Manager'

            case 'DEPARTMENT_MANAGER':
                return 'Department Manager'

            case 'PAYROLL_OFFICER':
                return 'Payroll Officer'

            case 'EMPLOYEE':
                return 'Employee'

            default:
                return userRole
        }
    }

    // =========================
    // USER DISPLAY NAME
    // =========================

    const getUserDisplayName = () => {

        if (userRole === 'ADMIN' ||
            userRole === 'SYSTEM_ADMIN') {

            return 'Administrator'
        }

        return currentUser?.username || 'User'
    }

    // =========================
    // USER INITIAL
    // =========================

    const getUserInitial = () => {

        const name = getUserDisplayName()

        return name
            ? name.charAt(0).toUpperCase()
            : 'U'
    }

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        console.log('Logout button clicked')

        if (onLogout) {
            onLogout()
        }

        navigate('/login', { replace: true })
    }

    return (
        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="sidebar-brand">

                    <div className="brand-logo">
                        EMS
                    </div>

                    <div>
                        <h2>EMS</h2>
                        <span>Employee Management</span>
                    </div>

                </div>

                <nav className="sidebar-nav">

                    <p className="nav-title">
                        MAIN MENU
                    </p>

                    {visibleMenuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${
                                location.pathname === item.path
                                    ? 'active'
                                    : ''
                            }`}
                        >

                            <span className="nav-icon">
                                {item.icon}
                            </span>

                            <span>
                                {item.label}
                            </span>

                        </Link>

                    ))}

                </nav>

                {/* =========================
                    SIDEBAR BOTTOM
                ========================= */}

                <div className="sidebar-bottom">

                    <Link
                        to="/settings"
                        className="nav-item"
                    >

                        <span className="nav-icon">
                            ⚙
                        </span>

                        <span>
                            Settings
                        </span>

                    </Link>

                    <button
                        type="button"
                        className="nav-item logout"
                        onClick={handleLogout}
                    >

                        <span className="nav-icon">
                            ↪
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>

            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">

                {/* Top Navbar */}
                <header className="top-navbar">

                    <div className="search-box">

                        <span>
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search..."
                        />

                    </div>

                    <div className="navbar-right">

                        <button
                            type="button"
                            className="notification-button"
                        >
                            🔔

                            <span className="notification-dot"></span>
                        </button>

                        <div className="profile-section">

                            <div className="profile-avatar">
                                {getUserInitial()}
                            </div>

                            <div className="profile-info">

                                <strong>
                                    {getUserDisplayName()}
                                </strong>

                                <span>
                                    {getRoleDisplayName()}
                                </span>

                            </div>

                            <span className="profile-arrow">
                                ⌄
                            </span>

                        </div>

                    </div>

                </header>

                {/* Page Content */}
                <section className="page-content">
                    {children}
                </section>

            </main>

        </div>
    )
}

export default MainLayout