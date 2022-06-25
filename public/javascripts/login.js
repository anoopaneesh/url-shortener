function login(event){
    event.preventDefault()
    setError('')
    let email = document.getElementById('login-email').value
    let password = document.getElementById('login-password').value
    fetch('/auth/login',{method:"POST",body:JSON.stringify({email,password}),headers:{'Content-Type':'application/json'}}).then(res => res.json()).then(data => {
        if(data.status === 'error'){
            setError(data.message)
        }else{
            window.location.href = '/'
        }
    }).catch(err => {
        setError('Something went wrong.Try Again.')
    })
}
function setError(value){
    document.getElementById('login-error').innerText=value
}