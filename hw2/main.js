function remove_guest(item){
    document.getElementById("sec_guest").style.background = "#41454c";
    item.parentNode.remove();
    var guests = document.getElementById("all_guests")
    console.log(guests.childElementCount);
    if (guests.childElementCount === 0) {
        full_screen();
        document.getElementById("pin").style.display = "none";
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
    document.getElementById('guest_1').insertAdjacentElement('beforebegin', host);
    host.style.background = "rgb(34, 40, 46)";
    host.style.justifyContent = "center";
    host.style.position = "relative";
    host.style.borderRadius = "5%";
    document.getElementById("guest_1").style.padding = "55px 150px 45px";
    document.getElementById("guest_2").style.padding = "55px 150px 45px";
    document.getElementById("guest_3").style.padding = "55px 150px 45px";
    document.getElementById("guest_4").style.padding = "55px 150px 45px";
    document.getElementById("odd_guest").style.padding = "55px 150px 45px";
    host.style.padding = "55px 150px 45px";
    host.style.alignItems = "center";
    document.getElementById("host-img").style.marginTop = "auto";
    document.getElementById("host-img").style.height = "6em";
    document.getElementById("host-img").style.width = "6em";
    item.style.top = "55px";
    item.style.left = "20px";
    item.style.width = "5em";
    document.getElementById("pin").style.display = "none";
    document.getElementById("hover_pic_odd").style.left = "30px"
    console.log(guest.childElementCount);
}
