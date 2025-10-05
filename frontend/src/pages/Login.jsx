import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'  // <-- import axios for API calls

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((s) => ({ ...s, [name]: '' }))
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = { email: '', password: '' }
    if (!form.email.trim()) newErrors.email = 'Please enter your email.'
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email.'
    if (!form.password.trim()) newErrors.password = 'Please enter your password.'
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
     
      const response = await axios.post('https://logiksutrabackend.onrender.com/api/auth/login', form)

      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setLoading(false)
      console.log('Logged in:', user)

      navigate('/')  

    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Login failed')
      } else {
        alert('Login failed. Please try again.')
      }
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="you@domain.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={18} />}
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock size={18} />}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="h-10 w-full bg-neutral-800 hover:bg-neutral-700"
              loading={loading}
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" color="#fff" /> : 'Log in'}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-sm font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
