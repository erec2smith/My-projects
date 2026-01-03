const container=document.getElementById('container')
const btn=document.getElementById('switchBtn')
const title=document.getElementById('panel-title')
const text=document.getElementById('panel-text')

btn.onclick=()=>{
    container.classList.toggle('active')
    if(container.classList.contains('active')){
        title.textContent='Already have an account?'
        text.textContent='Login and continue your experience'
        btn.textContent='Login'
    }else{
        title.textContent='New here?'
        text.textContent='Create an account and discover more features'
        btn.textContent='Create an account'
    }
}