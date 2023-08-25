import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
  
function App() {
  
  // Initializing all the state variables 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState();
  const [from, setFrom] = useState("eur");
  const [to, setTo] = useState("xof");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
   .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  
  // Appel de la fonction convert à chaque fois
  // un utilisateur change de devise
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
    
  //Fonction pour convertir la devise
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  
  // Fonction pour basculer entre deux devises
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  
  return (
    <div className="App">
      <div className="heading">
        <h1>Convertisseur de devises</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Montant</h3>
          <input type="text" 
             placeholder="Entrer le montant a convertir the amount" 
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>De</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div>
        <div className="right">
          <h3>En</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}}>Convertir</button>
        <h2>Le montant convertit est de :</h2>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
  
      </div>
    </div>
  );
}
  
export default App;