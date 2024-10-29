import logo from './assets/Northland Bank Logo-2.png';


const SignForm = () => {
  return ( 
    <div id="signform">
      <img src={logo} id="sign-logo"/>

      <div id="inputs">
        
        <input type="number" placeholder="Employee ID"/>
        
        <input type="password" placeholder="Password"/>
        
        <button id="login-btn">Login</button>
      </div>

      
    </div>
   );
}
 
export default SignForm;