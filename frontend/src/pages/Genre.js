import React, { useState } from 'react';
import genresData from '../jsonFlies/genres.json';
import axios from 'axios';

export default function Genre() {
  
  const [formData, setFormData] = useState({
    genres: [],
    duration: '10'
  });
  const [isLoading,setisLoading]=useState(false)
  const [audioSrc, setAudioSrc] = useState('');

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        genres: [...prevData.genres, name]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        genres: prevData.genres.filter(genre => genre !== name)
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    setisLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/genre', 
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
          <h1>Genre to music</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="genre-div">
              {genresData.genres.map(genre => (
                <div key={genre}>
                  <label>
                    <input type="checkbox" name={genre} onChange={handleCheckboxChange} />
                    <span>{genre}</span>
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
        {isLoading?<div>Loading...</div>:''}
        {audioSrc && (
          <audio controls src={audioSrc} />
      )}
        </div>
      </div>
    </section>
  )
}