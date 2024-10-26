import { useRef, useContext } from 'react';
import { json, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from './AuthContext';

function LogPage(){
    const username = useRef();
    const password = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const navigate = useNavigate();
    const { isAuth, setAuth } = useContext(AuthContext);

    function login(){
        fetch(`http://localhost:5139/Kasutaja/login/${username.current.value}/${password.current.value}`, {"method": "GET"})
          .then(res => res.json())
          .then(json => setAuth(json));
          navigate('/');
    }
    function register(){
        fetch(`http://localhost:5139/Kasutaja/register/${username.current.value}/${password.current.value}/${firstname.current.value}/${lastname.current.value}`, {"method": "POST"})
        .then(res => res.json())
        .then(json => setAuth(json));
        navigate('/');
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
                    <input name="username" placeholder="Username" ref={username}/>
                    <input type="password" name="pswd" placeholder="Password" ref={password} />
                    <button onClick={() => login()}>Login</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default LogPage;