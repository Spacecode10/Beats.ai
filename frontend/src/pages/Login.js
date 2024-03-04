import React, { useState } from 'react'

export default function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        // toast.success("Submiting...",{
        //   duration: 500,
        //   position: 'top-center',})
        console.log(values)
        // try {
        //   const res = await axios.post('/users/login', values)
        //   console.log(res)
        //   localStorage.setItem('authToken', res.data.token)
        //   setislogin(true)
        //   toast.success("Login Successful")
        //   navigate('/mynotes')
        // } catch (err) {
        //   err.response.data.msg && toast.error(err.response.data.msg)
        // }
    }

    return (
        <section className='login-section'>
            <div className="container">
                <h2 className='title'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" required placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} />
                    <input type="password" required placeholder="Enter your password" onChange={e => setValues({ ...values, password: e.target.value })} />
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </section>
    )
}
