import React from 'react'

export default function Navbar() {
    return (
        <header>
            <nav className='navbar'>
                <div className='container'>
                    <a href="#">Toonly</a>
                    <div>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#create-section">Create Music</a></li>
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
