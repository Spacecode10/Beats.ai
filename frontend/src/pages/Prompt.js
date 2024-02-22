import React from 'react'

export default function Prompt() {
  return (
    <section className='prompt'>
      <div className='shape1'></div>
      <div className='shape2'></div>
      <div className='shape3'></div>
      <div className='container'>
        <div className="prompt-div">
          <h1>Generate music from text</h1>
          <form className='prompt-form'>
            <input type="text" className='prompt-input' placeholder='A retro melody with piano and sitar' />
            <div className='duration-div'>
              <h3>Duration</h3>
              <span id="slider-value">8 S</span>
            </div>
            <div className='slider-div'>
              <input type="range" min="1" max="30" value="8" />
            </div>
            <button className='btn' type='submit'>Generate</button>
          </form>
        </div>
        <div className="prompt-div"></div>
      </div>
    </section>
  )
}
