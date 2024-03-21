import React, { useRef, useState } from 'react'
import axios from 'axios';
import { FaMicrophone } from "react-icons/fa6";
import { FiMic } from "react-icons/fi";

export default function Prompt() {

  const [formData, setFormData] = useState({
    prompt: 'A retro melody with piano and sitar',
    duration: '10',
    variations: '3'
  })
  const [isLoading, setisLoading] = useState(false)
  const [audioSrc, setAudioSrc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setisLoading(true)
    setAudioSrc('')
    try {
      const response = await axios.post('http://localhost:5000/api/prompt',
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
      setisLoading(false);
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      duration: newTime
    }));
  };
  const handleVariationChange = (e) => {
    const newVar = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      variations: newVar
    }));
  };
  // -----------------------------------Speech to text--------------------------------------------------------------------
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = (e) => {
    e.preventDefault();
    if (isListening) {
      handleStopSpeech();
      setIsListening(false);
    } else {
      handleSpeechToText()
      setIsListening(true);
    }
  };

  const handleSpeechToText = () => {
    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.interimResults = true;

    recognitionRef.current.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setFormData({ ...formData, prompt: transcript })
      console.log("Speech to text:", transcript);
    });
    recognitionRef.current.start();
  };

  const handleStopSpeech = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      console.log("Speech recognition stopped");
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setFormData({ ...formData, prompt: inputText })
    console.log("Manually entered text:", inputText);
  };
  // --------------------------------------------------------------------------------------------------------
  return (
    <section className='prompt'>
      <div className='shape1'></div>
      <div className='shape2'></div>
      <div className='shape3'></div>
      <div className='container'>
        <div className="prompt-div">
          <h1>Text to music</h1>
          <form className='prompt-form' onSubmit={handleSubmit}>
            {/* <input type="text" className='prompt-input' placeholder='"A retro melody with piano and sitar"'
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })} /> */}
            <div className='input-division'>
              <input
                type="text"
                className='prompt-input'
                placeholder='"A retro melody with piano and sitar"'
                value={formData.prompt}
                onChange={handleInputChange}
              />
              <button onClick={toggleListening} disabled={isLoading ? true : false}>{isListening ? <FaMicrophone /> : <FiMic />}</button>
            </div>
            <div className='option-section'>
              <div className="dur-section">
                <div className='duration-div'>
                  <h3>Duration</h3>
                  <span id="slider-value">{formData.duration} Sec</span>
                </div>
                <div className='slider-div'>
                  <input type="range" min="5" max="30" value={formData.duration} onChange={handleTimeChange} />
                </div>
              </div>
              <div className="var-section">
                <div className='duration-div'>
                  <h3>Variations</h3>
                  <span id="slider-value">{formData.variations}</span>
                </div>
                <div className='slider-div'>
                  <input type="range" min="1" max="4" value={formData.variations} onChange={handleVariationChange} />
                </div>
              </div>
            </div>
            <button className='btn' type='submit' disabled={isLoading ? true : false}>Generate</button>
          </form>
        </div>
        <div className="prompt-div">
          {isLoading ? <div>Loading...</div> : ''}
          {audioSrc && (
            <audio controls src={audioSrc} id='audiotag' />
          )}
        </div>
      </div>
    </section>
  )
}