import React, { useRef, useState } from 'react'
import axios from 'axios';
import { FaMicrophone } from "react-icons/fa6";
import { FiMic } from "react-icons/fi";

export default function FilePrompt() {

    //   const [formData, setFormData] = useState({
    //     prompt: 'A retro melody with piano and sitar',
    //     duration: '10',
    //     variations: '3'
    //   })
    const [isLoading, setisLoading] = useState(false)
    const [audioSrc, setAudioSrc] = useState('');
    const [file, setFile] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [duration, setDuration] = useState('10')
    const [variations, setVariations] = useState('1')


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setisLoading(true)
        setAudioSrc('')
        if (!file) return;
        try {
            const formData = new FormData()
            formData.append('audioFile', file)
            formData.append('prompt', prompt)
            formData.append('duration', duration)
            formData.append('variations', variations)
            console.log('File uploaded with data');
            const response = await axios.post('http://localhost:5000/api/fprompt',
                formData
                , {
                    responseType: 'blob',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setAudioSrc(url);
            console.log(audioSrc);
            setisLoading(false)
        } catch (error) {
            console.error('Error fetching audio:', error);
            setisLoading(false);
        }
    };

    //   const handleTimeChange = (e) => {
    //     const newTime = e.target.value;
    //     setDuration(prevFormData => ({
    //       ...prevFormData,
    //       duration: newTime
    //     }));
    //   };

    //   const handleVariationChange = (e) => {
    //     const newVar = e.target.value;
    //     setFormData(prevFormData => ({
    //       ...prevFormData,
    //       variations: newVar
    //     }));
    //   };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setDuration(newTime);
    };
    const handleVariationChange = (e) => {
        const newVar = e.target.value;
        setVariations(newVar);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
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
            setPrompt(transcript)
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

    //   const handleInputChange = (e) => {
    //     const inputText = e.target.value;
    //     setFormData({ ...formData, prompt: inputText })
    //     console.log("Manually entered text:", inputText);
    //   };
    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setPrompt(inputText)
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
                                // autoComplete='on'
                                autoCorrect='on'
                                // spellCheck='true'
                                spellCheck='on'
                                className='prompt-input'
                                placeholder='"A retro melody with piano and sitar"'
                                value={prompt}
                                onChange={handleInputChange}
                            />
                            <button onClick={toggleListening} disabled={isLoading ? true : false}>{isListening ? <FaMicrophone /> : <FiMic />}</button>
                        </div>
                        <div className='option-section'>
                            <div className="dur-section">
                                <div>
                                    <div className='duration-div'>
                                        <h3>Duration</h3>
                                        <span id="slider-value">{duration} Sec</span>
                                    </div>
                                    <div className='slider-div'>
                                        <input type="range" min="5" max="30" value={duration} onChange={handleTimeChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className='duration-div'>
                                        <h3>Variations</h3>
                                        <span id="slider-value">{variations}</span>
                                    </div>
                                    <div className='slider-div'>
                                        <input type="range" min="1" max="4" value={variations} onChange={handleVariationChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="file-upload-form">
                                <label htmlFor="file" className="file-upload-label">
                                    <div className="file-upload-design">
                                        <svg viewBox="0 0 640 512" height="1em">
                                            <path
                                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                            ></path>
                                        </svg>
                                        <p>File Input</p>
                                        {/* <span class="browse-button">Browse file</span> */}
                                    </div>
                                    <input id="file" type="file" accept='audio/*' onChange={handleFileChange} />
                                </label>
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