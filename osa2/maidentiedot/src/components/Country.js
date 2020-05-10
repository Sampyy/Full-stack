import React, { useState } from 'react'


const Country = ({name, filterSize, capital, pop, lang, flag}) => {
    const [show, setShow] = useState(false)
    
    if (filterSize === 1 || show === true){
        return(
            <li>
              <h1>{name}</h1> <button onClick={() => setShow(!show)}>hide</button>
              <p>capital {capital}</p>
              <p>population {pop}</p>
              <h2>languages</h2>
              <ul>
                {lang.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
              <img src={flag}/>
              
            </li>
        )
    }
    else {
    return(
        <li>{name}<button onClick={() => setShow(!show)}>show</button></li>
    )
    }
}
    


export default Country