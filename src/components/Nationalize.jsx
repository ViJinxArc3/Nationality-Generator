import React, { useState, useEffect, useRef } from 'react';



function Nationalize() {
  //useState to keep track of name inputted 
    const [name, setName] = useState('');
    const [country, setCountry] = useState(null);
    const nameInputRef = useRef();
  
    //useEffect to focus on the name input field 
    useEffect(() => {
      nameInputRef.current.focus();
    }, []);
  
//setName from useState to target the name 
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    //button handler to fetch api and return data when button is clicked + error handling
    const handleButtonClick = () => {
      if (name) {
        fetch(`https://api.nationalize.io?name=${name}`)
          .then(response => response.json())
          .then(data => {
            if (data.country.length > 0) {
              setCountry(data.country[0]);
            } else {
              alert('Could not determine nationality');
            }
          })
          .catch(error => alert(error.message));
      } else {
        alert('Please enter a name');
      }
    };
  
    //returned jsx
  return (
    <div className="appContent container mt-5">
    <h1 className="text-center mb-5">Predict the nationality of your name</h1>
    <div className="form-group">
    <label htmlFor="name" className="label-name">Enter Name:</label>
    <input type="text" id="name" name="name" value={name} onChange={handleNameChange} ref={nameInputRef} className="form-control mt-3" autoFocus />
    </div>
    {/* add handleButtonClick to onClick to access function */}
    <button onClick={handleButtonClick} className="btn btn-success mt-3">Predict Nationality</button>
    {country && (
    <div className="mt-3">
    <p className="font-weight-bold">Country Code: {country.country_id}</p>
    <p className="font-weight-bold">Probability: {country.probability.toFixed(2)}</p>
    </div>
    )}
    </div>
  );
}

export default Nationalize