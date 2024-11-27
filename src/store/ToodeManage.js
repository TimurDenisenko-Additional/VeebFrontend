import { useEffect, useRef, useState } from 'react';
import './styles/ToodeManage.css';

const isNotNum = (num) => Number.isNaN(parseInt(num)) || num < 0;

function ToodeManage() {
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
      .then(res => {
        if (res.ok){
          setTooted(res.json());
        }
        else{
          alert(res.json());
        }
      });

  }
  function lisa() {
    if (nameRef.current.value == null){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/toode/create/
        ${nameRef.current.value}/${Number(priceRef.current.value)}/${isActiveRef.current.checked}`, {"method": "POST"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function rate() {
    let kurss = prompt("Uus kurss", "1");
    if (isNotNum(kurss)){
      alert("Midagi on vale");
      return;
    }
    fetch("http://localhost:5139/toode/rate/" + kurss, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function changePrice() {
    let id = prompt("Vajalik indeks", "1");
    let hind = prompt("Hinda tõsta", "1");
    if (isNotNum(id) || isNotNum(hind)){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/toode/suurenda-hinda/${id}/${hind}`, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function multiplyPrice() {
    let id = prompt("Vajalik indeks", "1");
    let hind = prompt("Hinda tõsta", "1");
    if (isNotNum(id) || isNotNum(hind)){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/toode/multiply-price/${id}/${hind}`, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function changeActive() {
    let id = prompt("Vajalik indeks", "1");
    if (isNotNum(id)){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/toode/change-active/${id}`, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function manageActive(){
    let active = prompt("Kas määrata kõigi toodete aktiivsus true või false?")
    if (active !== "true" && active !== "false"){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/Toode/state-manage/${active}`, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function changeName(){
    let id = prompt("Vajalik indeks", "1");
    let name = prompt("Kirjuta uue nimi", "nimi");
    if(isNotNum(id) || name === null ||  name.trim() === ""){
      alert("Midagi on vale");
      return;
    }
    fetch(`http://localhost:5139/Toode/change-name/${id}/${name}`, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  function clear(){
    fetch(`http://localhost:5139/Toode/clear`, {"method": "DELETE"})
    .then(res => res.json())
    .then(json => setTooted(json));        
  }
  function maxPrice(){
    fetch(`http://localhost:5139/Toode/max-price`, {"method": "GET"})
    .then(res => res.text())
    .then(text => alert(text));      
  }
  function backup(){
    fetch(`http://localhost:5139/Toode/backup`, {"method": "POST"})
    .then(res => res.json())
    .then(json => setTooted(json));   
  }

  return (
    <div className="App">
      <div className="container">
        <div className="form-section">
          <h2>Lisa Uus Toode</h2>
          <label>Nimi</label>
          <input ref={nameRef} type="text" /> <br />
          <label>Hind</label>
          <input ref={priceRef} type="number" /> <br />
          <label>Aktiivne</label>
          <input ref={isActiveRef} type="checkbox" /> <br />
          <button onClick={() => lisa()}>Lisa</button>
        </div>
        <div className="list-section">
          <h2>Toodete Nimekiri</h2>
          <table>
            <tr>
              <th>Indeks</th>
              <th>Nimi</th>
              <th>Aktiivne</th>
              <th>Hind</th>
              <th>Tegevus</th>
            </tr>
            {tooted.map((toode, index) => (
              <tr key={index}>
                <td>{toode.id}</td>
                <td>{toode.name}</td>
                {toode.isActive ? <td className='Active'>🟢 Aktiivne</td> : <td className='nActive'>🔴 Mitte aktiivne</td>}
                <td>{toode.price}</td>
                <td>
                  <button onClick={() => kustuta(toode.id)}>Kustuta</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className='tools'>
        <button onClick={() => maxPrice()}>Maksimaalne hind</button>
        <button onClick={() => rate()}>Muuda kurss</button>
        <button onClick={() => changePrice()}>Suurenda hinda</button>
        <button onClick={() => multiplyPrice()}>Korruta hind</button>
        <button onClick={() => changeActive()}>Muuta aktiivse</button>
        <button onClick={() => manageActive()}>Hallata aktiivset</button>
        <button onClick={() => changeName()}>Muuta nimi</button>
        <button onClick={() => backup()}>Varukoopia</button>
        <button onClick={() => clear()}>Selge</button>
      </div>
    </div>
  );
}

export default ToodeManage;