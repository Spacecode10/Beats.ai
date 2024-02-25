import React, { useState } from 'react'

export default function Prompt() {
  const [time, setTime] = useState(10);
  const [formData, setFormData] = useState({
    prompt: '',
    duration: time
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <section className='prompt'>
      <div className='shape1'></div>
      <div className='shape2'></div>
      <div className='shape3'></div>
      <div className='container'>
        <div className="prompt-div">
          <h1>Text to music</h1>
          <form className='prompt-form' onSubmit={handleSubmit}>
            <input type="text" className='prompt-input' placeholder='"A retro melody with piano and sitar"'
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })} />
            <div className='duration-div'>
              <h3>Duration</h3>
              <span id="slider-value">{time} Sec</span>
            </div>
            <div className='slider-div'>
              <input type="range" min="1" max="30" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <button className='btn' type='submit'>Generate</button>
          </form>
        </div>
        <div className="prompt-div"></div>
      </div>
    </section>
  )
}
