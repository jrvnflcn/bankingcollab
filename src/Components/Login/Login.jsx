import './Login.css';
import background from './assets/Background.mp4';
import SignForm from './SignForm';



const Login = () => {
    return ( <div className="login-container">
        
        <video autoplay="autoplay" muted loop id="myVideo"
         source src={background} type="video/mp4">
        </video>
        <div id="sign-container">
            
            
            <SignForm />
            
        </div>
        
    
    </div> );
}
 
export default Login;