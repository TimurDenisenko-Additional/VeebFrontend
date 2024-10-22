import { useState, useEffect } from 'react';
import './Store.css';

function Store(){
    const [tooted, setTooted] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5139/toode/getActiveTooded")
          .then(res => res.json())
          .then(json => setTooted(json));
      }, []);

    return (
    <div className="list-section">
          <table>
            <tr>
              <th>Nimi</th>
              <th>Hind</th>
            </tr> 
            {tooted.map((toode, index) => (
            <tr key={index}>
            <td>{toode.name}</td>
            <td>{toode.price}</td>
            </tr>
            ))}
          </table>
        </div>
    );
}
  
export default Store;