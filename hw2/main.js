function remove_guest(item){
    item.parentNode.remove();
    var guests = document.getElementById("all_guests")
    console.log(guests.childElementCount);
    if (guests.childElementCount === 0) {
        full_screen();
    }
}

function full_screen(){
    document.getElementById("sec_guest").style.display = "none";
    document.getElementById("sec_host").style.flexBasis = "100%";
    document.getElementById("host_hover").style.top = "380px";
    document.getElementById("host_hover").style.left = "700px";
}

let host = document.getElementById("host");
let guest = document.getElementById("all_guests");

function unpin(item){
    document.getElementById("sec_host").style.display = "none";
    document.getElementById("sec_guest").style.flexBasis = "100%";
    document.getElementById("sec_guest").style.height = "38em";
    document.getElementById("odd_guest").style.width = "auto";
    document.getElementById("footer").style.top = "38em"
    host.parentNode.removeChild(host);
    guest.appendChild(host);
    host.style.background = "rgb(34, 40, 46)";
    host.style.padding = "0.5px 6px 5px";
    host.style.justifyContent = "center";
    host.style.position = "relative";
    host.style.borderRadius = "5%";
}
