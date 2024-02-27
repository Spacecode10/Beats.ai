import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Prompt() {
  const [time, setTime] = useState('10');
  const [formData, setFormData] = useState({
    prompt: '',
    duration: time
  })
  const [audioSrc, setAudioSrc] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/prompt', 
        formData
      , {
        responseType: 'blob', // Specify response type as blob
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setAudioSrc(url); // Set the audio source
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };
  useEffect(() => {
    // Update formData.duration whenever time changes
    setFormData(prevFormData => ({
      ...prevFormData,
      duration: time
    }));
  }, [time]);
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
        <div className="prompt-div">
        {audioSrc && (
          <audio controls src={audioSrc} />
      )}
        </div>
      </div>
    </section>
  )
}
