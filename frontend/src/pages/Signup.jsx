import { LoaderCircle, Lock, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import axios from 'axios'  
function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate()  
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let newErrors = { name: '', email: '', password: '' }

    if (!user.name.trim()) newErrors.name = 'Please enter your name.'
    if (!user.email.trim()) newErrors.email = 'Please enter a valid email.'
    if (!user.password.trim()) newErrors.password = 'Password cannot be empty.'

    if (newErrors.name || newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setShowLoader(true)

    try {
      const response = await axios.post('https://logiksutrabackend.onrender.com/api/auth/signup', user)

      const { token, user: newUser } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(newUser))

      setShowLoader(false)
      console.log('Signup successful:', newUser)

      navigate('/')

    } catch (error) {
      setShowLoader(false)
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Signup failed')
      } else {
        alert('Signup failed. Please try again.')
      }
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Sign up to Book Review Platform
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Full Name"
            name="name"
            placeholder="Please enter your full name"
            value={user.name}
            onChange={handleChange}
            error={errors.name}
            icon={<UserRound size={20} />}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Please enter your email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={20} />}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Please enter your password"
            value={user.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock size={20} />}
          />
          <div className="mt-10">
            <Button
              className="h-10 w-full bg-neutral-800 hover:bg-neutral-700"
              disabled={showLoader}
              loading={showLoader}
              type="submit"
            >
              {showLoader ? (
                <LoaderCircle className="animate-spin" color="#fff" />
              ) : (
                'Create an account'
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
