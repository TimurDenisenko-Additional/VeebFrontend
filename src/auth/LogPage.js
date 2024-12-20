import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import { AuthContext } from './AuthContext';

function LogPage(){
    const usernameLogin = useRef();
    const passwordLogin = useRef();
    const username = useRef();
    const password = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const navigate = useNavigate();
    const {setAuth, setAdmin } = useContext(AuthContext);

    function login(){
        fetch(`http://localhost:5139/Kasutaja/login/${usernameLogin.current.value}/${passwordLogin.current.value}`, {"method": "GET"})
          .then(res => {
                if (res.ok){
                    setAuth(res.json());
                    fetch(`http://localhost:5139/Kasutaja/is-admin`, {"method": "GET"}).then(res => {
                        setAdmin(res.json());
                    }
                )
                navigate('/');
            }
            else if(res.status === 400){
              res.text().then(value => alert(value));
            }
            else{
                alert("Kirjuta andmed");
            }
          });
    }
    function register(){
        fetch(`http://localhost:5139/Kasutaja/register/${username.current.value}/${password.current.value}/${firstname.current.value}/${lastname.current.value}`, {"method": "POST"})
        .then(res => {
          if (res.ok){
              setAuth(res.json());
              navigate('/');
          }
          else if(res.status === 400){
            res.text().then(value => alert(value));
          }
          else{
              alert("Kirjuta andmed");
          }
        });
    }
    return (
        <div className='mainBody'>
            <div class="main">  	
            <input type="checkbox" id="chk" aria-hidden="true" />
                <div class="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input name="username" placeholder="Username" required="" ref={username}/>
                    <input name="firstname" placeholder="First name" required="" ref={firstname}/>
                    <input name="lastname" placeholder="Last name" required="" ref={lastname}/>
                    <input type="password" name="pswd" placeholder="Password" required="" ref={password}/>
                    <button onClick={() => register()}>Sign up</button>
                </div>
                <div class="login">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input name="username" placeholder="Username" ref={usernameLogin}/>
                    <input type="password" name="pswd" placeholder="Password" ref={passwordLogin} />
                    <button onClick={() => login()}>Login</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default LogPage;