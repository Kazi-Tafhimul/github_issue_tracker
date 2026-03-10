document.getElementById('sign-in-btn').addEventListener("click",function(){
    const nameInput = document.getElementById('input-name').value;
    const passwordInput = document.getElementById('input-password').value;

    if(nameInput === 'admin' && passwordInput === 'admin123'){
        alert("sign in successfull");
        window.location.assign("/home.html")

    }
    else{
        alert('sign in failed')
    }
})