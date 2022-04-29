import './Search.css'

import { useState } from "react";

const Search = (props) => {

    const [isActive, setIsActive] = useState(false)

    const toggle = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="search-container">
            <div className={`search ${isActive ? 'active' : ''}`}>
                <input type="text" name="search" className="search-input" onChange={props.onChange} placeholder="Search..." />
                <button className="search-btn" onClick={toggle}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    )
}

export default Search
