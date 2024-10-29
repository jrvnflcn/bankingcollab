import logo from './assets/Northland Bank Logo.png';
import './Login.css';
import background from './assets/Background.mp4';



const Login = () => {
    return ( <div className="login-container">
        
        <video autoplay="autoplay" muted loop id="myVideo"
         source src={background} type="video/mp4">
        </video>
    
    
    </div> );
}
 
export default Login;