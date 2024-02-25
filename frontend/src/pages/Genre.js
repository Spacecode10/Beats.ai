import React, { useState } from 'react';
import genresData from '../jsonFlies/genres.json';

export default function Genre() {
  const [formData, setFormData] = useState({
    genres: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className='genre'>
      <div className='container'>
        <div>
          <h1>Select genres</h1>
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
            <button className='btn' type='submit'>Generate</button>
          </form>
        </div>
        <div className="prompt-div"></div>
      </div>
    </section>
  )
}
