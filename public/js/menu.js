let navVisible = true;
window.addEventListener("load", main)

function main(){

}

function esconder() {
    const nav = document.querySelector('nav');  
    if (navVisible) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex'; 
    }
    // Inverte o estado do header (visível ou oculto)
    navVisible = !navVisible;
}
