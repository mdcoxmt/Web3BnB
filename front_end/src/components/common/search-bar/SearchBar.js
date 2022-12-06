import React, { useCallback, } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"
import './SearchBar.scss'

const SearchBar = ({}) => {

    function debounce(fn, delay) {
        let timeoutID;
        return function(...args) {
        if(timeoutID){
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout( () => {
                fn(...args)
            }, delay) 
        }
    }

    const debouncedOnChange = useCallback(
        debounce((value) => searchBlockchainLocation(value), 500),
        []
    );

    const searchBlockchainLocation = (value) => {
        // verify search and query via blockchain view function
      };

  return (
    <div className="search-wrapper">
        <input
        type="text"
        className="search-box"
        placeholder='Instanbul, Chicago, Tokyo, Alberta...'
        onChange={event => debouncedOnChange(event.target.value)}
        />

<FontAwesomeIcon icon={faSuitcaseRolling}
    className="suitcase-icon"
    onClick={async () => {
            console.log('searching')
        }}
        />

        
        
    </div>
  )
}

export default SearchBar