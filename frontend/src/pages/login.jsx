import React from 'react'
import axios from 'axios'
import "./login.css"

export default function Login() {
    const [isRightPanelActive , setIsRightPanelActive] = React.useState(false)

    const [signUpFormData , setSignUpFormData] = React.useState({name:'',email:'',password:''})

    const [signInFormData , setSignInFormData] = React.useState({email:'',password:''})

    const handleSignUpOverlay = () => {
        setIsRightPanelActive(true)
    }

    const handleSignInOverlay = () => {
        setIsRightPanelActive(false)
    }

    const handleSignUpChange = (e) => {
        const {name , value} = e.target;
        setSignUpFormData((prevData)=>({
            ...prevData,
            [name] : value
        }))
    }

    const handleSignInChange = (e) => {
        const {name,value} = e.target;
        setSignInFormData((prevData)=> ({
            ...prevData,
            [name] : value
        }))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        console.log('Sign-up-data:',signUpFormData)

        try{
            const response = await axios.post('http://localhost:5000/api/v1/auth/sign-up',signUpFormData)

            if(response.data.success){
                console.log('user createed successfully')
            }
            
            else{
                console.log(response.data.message)
            }

        }catch(error){
            console.error('error during sign-up',error.response?.data?.message || "therla")
        }

    }
    
    const handleSignIn = async (e) => {
        e.preventDefault()
        console.log('Sign-in-data:',signInFormData)

        try{
            const response = await axios.post('http://localhost:5000/api/v1/auth/sign-in',signInFormData)

            if(response.data.success){
                console.log('user logged in successfully')
            }

            else{
                console.log(response.data.message)
            }
        }catch(error){
            console.error('error during sign in',error.response?.data?.message || "therla")
        }
    }


    return (
        <>
            <div className = {`container ${isRightPanelActive ? "right-panel-active" : ''}`} id = "container">
                <div className ="form-container sign-up-container">
                    <form onSubmit = {handleSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" name="name" value={signUpFormData.name} onChange={handleSignUpChange}/>
                        <input type="email" placeholder="Email" name="email" value={signUpFormData.email} onChange={handleSignUpChange}/>
                        <input type="password" placeholder="Password" name="password"value={signUpFormData.password} onChange={handleSignUpChange}/>
                        <button >Sign Up</button>
                    </form>
                </div>
                <div className ="form-container sign-in-container">
                    <form onSubmit = {handleSignIn}>
                        <h1>Sign In</h1>
                        <input type="email" placeholder="Email" name="email" value={signInFormData.email} onChange={handleSignInChange}/>
                        <input type="password" placeholder="Password" name="password" value={signInFormData.password} onChange={handleSignInChange}/>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left" >
                            <h1>Welcome Back!</h1>
                            <p>If you already have an account click below to sign in</p>
                            <button className="ghost" id="signIn" onClick={handleSignInOverlay}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello!</h1>
                            <p>If you do not have an account click below to create one</p>
                            <button className="ghost" id="singUp" onClick={handleSignUpOverlay}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}