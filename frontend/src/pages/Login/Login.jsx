import { useState } from 'react'
import './Login.css'

function Login({ onLogin, loginError }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        onLogin(username, password)
    }

    return (
        <div className="login-page">
            <div className="login-container">

                {/* Left Side - Branding */}
                <div className="login-brand">
                    <div className="brand-content">

                        <div className="logo-circle">
                            EMS
                        </div>

                        <h1>Employee Management System</h1>

                        <p>
                            Manage employees, attendance, payroll,
                            recruitment and more in one place.
                        </p>

                        <div className="brand-features">
                            <div>✓ Employee Management</div>
                            <div>✓ Attendance & Leave</div>
                            <div>✓ Payroll Management</div>
                            <div>✓ Training & Development</div>
                        </div>

                    </div>
                </div>

                {/* Right Side - Login */}
                <div className="login-form-section">
                    <div className="login-card">

                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your EMS account</p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="username">
                                    Email or Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your email or username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {loginError && (
                                <div className="login-error">
                                    {loginError}
                                </div>
                            )}

                            <div className="login-options">

                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>

                                <a href="/forgot-password">Forgot password?</a>

                            </div>

                            <button
                                type="submit"
                                className="login-button"
                            >
                                Sign In
                            </button>

                        </form>

                        <div className="login-footer">
                            <p>Employee Management System</p>
                            <span>Secure • Simple • Efficient</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login