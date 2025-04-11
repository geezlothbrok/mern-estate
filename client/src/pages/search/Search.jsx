import React from 'react';
import "./Search.css";

function Search() {
  return (
    <main className='search-main'>
        <section className="left-side">
            <form>
                <div className="search-term">
                    <label>Search Term:</label>
                    <input type="text" id='search' placeholder='search...' className='look-for'/>
                </div>
               
                <div className="sea">
                    <label>Type:</label>
                    <input type="checkbox" id="all"/>
                    <span>Rent & Sale</span>
                </div>
            </form>
        </section>
        <section className="right-side">
            <h1>Listing results:</h1>
        </section>
    </main>
  )
}

export default Search