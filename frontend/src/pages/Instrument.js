import React, { useState } from 'react'
import instrumentsData from '../jsonFlies/instruments.json';
import axios from 'axios';

export default function Instrument() {

  const [formData, setFormData] = useState({
    instruments: [],
    duration: '10'
  });
  const [isLoading, setisLoading] = useState(false)
  const [audioSrc, setAudioSrc] = useState('');

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        instruments: [...prevData.instruments, name]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        instruments: prevData.instruments.filter(instrument => instrument !== name)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setisLoading(true)
    setAudioSrc('')
    try {
      const response = await axios.post('http://localhost:5000/api/instrument',
        formData
        , {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setAudioSrc(url);
      setisLoading(false)
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      duration: newTime
    }));
  };

  return (
    <section className='genre'>
      <div className='shape1'></div>
      <div className='shape2'></div>
      <div className='shape3'></div>
      <div className='container'>
        <div>
          <h1>Instrument to music</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="genre-div">
              {instrumentsData.instruments.map(instrument => (
                <div key={instrument}>
                  <label>
                    <input type="checkbox" name={instrument} onChange={handleCheckboxChange} />
                    <span>{instrument}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className='duration-div'>
              <h3>Duration</h3>
              <span id="slider-value">{formData.duration} Sec</span>
            </div>
            <div className='slider-div'>
              <input type="range" min="5" max="30" value={formData.duration} onChange={handleTimeChange} />
            </div>
            <button className='btn' type='submit'>Generate</button>
          </form>
        </div>
        <div className="prompt-div">
          {isLoading ? <div>Loading...</div> : ''}
          {audioSrc && (
            <audio controls src={audioSrc} />
          )}
        </div>
      </div>
    </section>
  )
}