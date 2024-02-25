import React from 'react'
import Prompt from '../images/text.jpg'
import Genre from '../images/genre2.jpg'
import Instrument from '../images/instrument.jpg'

export default function CreateMusic() {
  return (
    <section className='createmusic-section' id='create-section'>
      <div className="container">
        <h2 className='title'>Choose how you want to generate</h2>
        <div className='music-option-wrapper'>
          <a href="/text_to_music">
            <div className='card'>
              <div className="poster">
                <img src={Prompt} alt="" />
              </div>
              <div className="details">
                <h3>Text-to-Music</h3>
              </div>
            </div>
          </a>
          <a href="/genre_to_music">
            <div className='card'>
              <div className="poster">
                <img src={Genre} alt="" />
              </div>
              <div className="details">
                <h3>Genre-to-music</h3>
              </div>
            </div>
          </a>
          <a href="/instrument_to_music">
            <div className='card'>
              <div className="poster">
                <img src={Instrument} alt="" />
              </div>
              <div className="details">
                <h3>Instrument-to-music</h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
