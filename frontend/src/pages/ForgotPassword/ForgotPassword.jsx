import { useState } from 'react'

function ForgotPassword() {

    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userFound, setUserFound] = useState(false)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // =========================
    // CHECK USER
    // =========================

    const handleCheckUser = async (e) => {

        e.preventDefault()

        setMessage('')
        setError('')
        setLoading(true)

        try {

            const response = await fetch(
                'http://localhost:8080/api/auth/forgot-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {

                setUserFound(true)

                setMessage(
                    'User account found. Please enter your new password.'
                )

            } else {

                setError(
                    typeof data === 'string'
                        ? data
                        : 'User account not found'
                )
            }

        } catch (error) {

            console.error(
                'Forgot password error:',
                error
            )

            setError(
                'Unable to connect to the server'
            )

        } finally {

            setLoading(false)
        }
    }


    // =========================
    // RESET PASSWORD
    // =========================

    const handleResetPassword = async (e) => {

        e.preventDefault()

        setMessage('')
        setError('')

        if (newPassword !== confirmPassword) {

            setError(
                'Passwords do not match'
            )

            return
        }

        if (newPassword.length < 6) {

            setError(
                'Password must be at least 6 characters'
            )

            return
        }

        setLoading(true)

        try {

            const response = await fetch(
                'http://localhost:8080/api/auth/reset-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {

                setMessage(
                    data.message ||
                    'Password reset successfully'
                )

                setNewPassword('')
                setConfirmPassword('')

            } else {

                setError(
                    typeof data === 'string'
                        ? data
                        : 'Unable to reset password'
                )
            }

        } catch (error) {

            console.error(
                'Reset password error:',
                error
            )

            setError(
                'Unable to connect to the server'
            )

        } finally {

            setLoading(false)
        }
    }


    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f7fb'
            }}
        >

            <div
                style={{
                    width: '400px',
                    background: '#ffffff',
                    padding: '35px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
            >

                <h2>Forgot Password?</h2>

                <p>
                    Enter your username or email to reset your password.
                </p>


                {/* =========================
                    USERNAME FORM
                ========================= */}

                {!userFound && (

                    <form onSubmit={handleCheckUser}>

                        <label htmlFor="username">
                            Username or Email
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username or email"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                marginBottom: '20px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: loading
                                    ? '#9ca3af'
                                    : '#123b6d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading
                                    ? 'not-allowed'
                                    : 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            {loading
                                ? 'Checking...'
                                : 'Continue'}
                        </button>

                    </form>

                )}


                {/* =========================
                    RESET PASSWORD FORM
                ========================= */}

                {userFound && (

                    <form onSubmit={handleResetPassword}>

                        <div
                            style={{
                                marginBottom: '18px',
                                padding: '10px',
                                background: '#f1f5f9',
                                borderRadius: '6px'
                            }}
                        >
                            <strong>Account:</strong>{' '}
                            {username}
                        </div>


                        <label htmlFor="newPassword">
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                marginBottom: '15px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                        />


                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                marginBottom: '20px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                        />


                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: loading
                                    ? '#9ca3af'
                                    : '#123b6d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading
                                    ? 'not-allowed'
                                    : 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            {loading
                                ? 'Resetting...'
                                : 'Reset Password'}
                        </button>

                    </form>

                )}


                {/* =========================
                    SUCCESS MESSAGE
                ========================= */}

                {message && (

                    <p
                        style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: '#ecfdf5',
                            color: '#166534',
                            borderRadius: '6px'
                        }}
                    >
                        {message}
                    </p>

                )}


                {/* =========================
                    ERROR MESSAGE
                ========================= */}

                {error && (

                    <p
                        style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            borderRadius: '6px'
                        }}
                    >
                        {error}
                    </p>

                )}

            </div>

        </div>
    )
}

export default ForgotPassword