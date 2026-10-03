import { useState } from 'react'

function Notifications() {
    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSendEmail = async (e) => {
        e.preventDefault()

        setSuccess('')
        setError('')

        if (!to.trim()) {
            setError('Recipient email is required')
            return
        }

        if (!subject.trim()) {
            setError('Subject is required')
            return
        }

        if (!message.trim()) {
            setError('Message is required')
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                'http://localhost:8080/api/email/test',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: to,
                        subject: subject,
                        message: message
                    })
                }
            )

            const data = await response.text()

            if (response.ok) {
                setSuccess('Email sent successfully!')

                setTo('')
                setSubject('')
                setMessage('')
            } else {
                setError(data || 'Failed to send email')
            }

        } catch (error) {
            console.error('Email error:', error)
            setError('Unable to connect to the server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            padding: '40px',
            maxWidth: '800px'
        }}>

            <h1>Notifications</h1>

            <p style={{ color: '#64748b' }}>
                Send email notifications to employees.
            </p>

            <div style={{
                marginTop: '30px',
                background: '#ffffff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>

                <h2>Send Email Notification</h2>

                <form onSubmit={handleSendEmail}>

                    {/* Recipient */}
                    <div style={{ marginTop: '20px' }}>
                        <label>
                            Recipient Email
                        </label>

                        <input
                            type="email"
                            placeholder="employee@example.com"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                        />
                    </div>

                    {/* Subject */}
                    <div style={{ marginTop: '20px' }}>
                        <label>
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="Notification subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                        />
                    </div>

                    {/* Message */}
                    <div style={{ marginTop: '20px' }}>
                        <label>
                            Message
                        </label>

                        <textarea
                            placeholder="Enter your notification message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="6"
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                boxSizing: 'border-box',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    {/* Success */}
                    {success && (
                        <div style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: '#ecfdf5',
                            color: '#166534',
                            borderRadius: '6px'
                        }}>
                            {success}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={{
                            marginTop: '20px',
                            padding: '12px',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            borderRadius: '6px'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '25px',
                            padding: '12px 25px',
                            background: loading
                                ? '#9ca3af'
                                : '#123b6d',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading
                                ? 'not-allowed'
                                : 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        {loading
                            ? 'Sending...'
                            : 'Send Email'}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Notifications