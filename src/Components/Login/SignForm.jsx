import logo from './assets/Northland Bank Logo.png';


const SignForm = () => {
  return ( 
    <div id="signform">
      <img src={logo} id="sign-logo"/>

      <label>Employee ID:</label>
      <input type="number"/>
      <label>Password:</label>
      <input type="password"/>

      <button>Login</button>
    </div>
   );
}
 
export default SignForm;