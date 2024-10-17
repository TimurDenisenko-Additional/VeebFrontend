import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [tooted, setTooted] = useState([]);
  const nameRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();


  useEffect(() => {
    fetch("http://localhost:5139/toode")
      .then(res => res.json())
      .then(json => setTooted(json));
  }, []);

  function kustuta(index) {
    fetch("http://localhost:5139/toode/delete/" + index, {"method": "DELETE"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }

  ////////////////////////
  function lisa() {
    const uusToode = {
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "isActive": isActiveRef.current.checked
    }
    fetch(`http://localhost:5139/toode/create/
        ${nameRef.current.value}/${Number(priceRef.current.value)}/${isActiveRef.current.checked}`, {"method": "POST"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  ////////////////////////

  function rate() {
    let kurss = prompt("A new rate", "1");
    if (kurss == null || kurss < 0){
      return;
    }
    fetch("http://localhost:5139/toode/rate/" + kurss, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }

  return (
    <div className="App">
      <div className="container">
        <div className="form-section">
          <label>Nimi</label>
          <input ref={nameRef} type="text" /> <br />
          <label>Hind</label>
          <input ref={priceRef} type="number" /> <br />
          <label>Aktiivne</label>
          <input ref={isActiveRef} type="checkbox" /> <br />
          <button onClick={() => lisa()}>Lisa</button>
        </div>
        <div className="list-section">
          <table>
            <tr>
              <th>Indeks</th>
              <th>Nimi</th>
              <th>Hind</th>
              <th>Tegevus</th>
            </tr>
            {tooted.map((toode, index) => (
              <tr key={index}>
              <td>{index}</td>
                <td>{toode.name}</td>
                <td>{toode.price}</td>
                <td>
                  <button onClick={() => kustuta(index)}>Kustuta</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className='tools'>
          <button onClick={() => rate()}>Muuda kurss</button>
      </div>
  </div>
  );
}

export default App;