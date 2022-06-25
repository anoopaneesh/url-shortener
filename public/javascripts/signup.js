function register(event){
    event.preventDefault()
    setError("")
    let termsCheckbox = document.getElementById('signup-terms-checkbox')
    let signupForm = document.getElementById('signup-form')
    if(termsCheckbox.checked){
        let password = document.getElementById('signup-password').value
        let cpassword = document.getElementById('signup-cpassword').value
        if(password !== cpassword){
            setError("Passwords does not match")
            return
        }else if(password.length < 4 ){
            setError("Password should be atleast 4 charcters")
            return
        }
        let fullname = document.getElementById('signup-fullname').value
        let email = document.getElementById('signup-email').value
        fetch('/auth/signup',{method:"POST",body:JSON.stringify({fullname,email,password}),headers:{'Content-Type': 'application/json'}}).then(res => res.json()).then(data => {
            if(data.status === 'error'){
                setError(data.message)
            }else{
                window.location.href="/"
            }
        }).catch(err =>{
            console.log("Error occured")
            setError(err.message)
        })
    }else{
        setError("Agree to terms and conditions")
    }
}
function setError(value){
    document.getElementById('signup-error').innerText=value
}