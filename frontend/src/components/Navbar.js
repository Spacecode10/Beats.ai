import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header>
            <nav className={isSticky ? 'navbar sticky' : 'navbar'}>
                <div className='container'>
                    <a href="#home" onClick={e => { navigate('/') }}>Beats.AI</a>
                    <div>
                        <ul>
                            <li><a href="#home" onClick={e => { navigate('/') }}>Home</a></li>
                            <li><a href="#create-section" onClick={e => { navigate('/') }}>Create Music</a></li>
                            <li><a href="/login" onClick={e => { navigate('/login') }}>Login</a></li>
                        </ul>
                    </div>
                    {/* <button>
                    bars
                    </button>
                    <button>
                    cross
                </button> */}
                </div>
            </nav>
        </header>
    )
}
