import React, { useState } from 'react'
import instrumentsData from '../jsonFlies/instruments.json';

export default function Instrument() {
  const [formData, setFormData] = useState({
    instruments: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <button className='btn' type='submit'>Generate</button>
          </form>
        </div>
        <div className="prompt-div"></div>
      </div>
    </section>
  )
}
