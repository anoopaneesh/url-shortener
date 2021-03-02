const input = document.getElementById("base-url")
const a = document.getElementById("short-url")
const form = document.getElementById("myform")
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const jsonString = JSON.stringify({
        baseUrl:input.value,
    })
    const xht = new XMLHttpRequest()
    xht.onreadystatechange = function() {
        if (xht.readyState == XMLHttpRequest.DONE) {
            a.innerHTML = xht.responseText
            a.href = xht.responseText
        }
    }
    xht.open('POST','http://localhost:3000/short',true)
    xht.setRequestHeader("Content-type", "application/json");
    xht.send(jsonString)
    
})
