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
    item.style.top = "95px";
    item.style.left = "150px";
    item.style.width = "5em";
    document.getElementById("hp1").style.top = "95px";
    document.getElementById("hp1").style.left = "160px";
    document.getElementById("hp2").style.top = "95px";
    document.getElementById("hp2").style.left = "160px";
    document.getElementById("hp3").style.top = "95px";
    document.getElementById("hp3").style.left = "160px";
    document.getElementById("hp4").style.top = "95px";
    document.getElementById("hp4").style.left = "160px";
    document.getElementById("hover_pic_odd").style.top = "110px";
    document.getElementById("hover_pic_odd").style.left = "160px";
    document.getElementById("pin").style.display = "none";
    console.log(guest.childElementCount);
}

function pin(item) {
    var ori_host = document.getElementById("host");
    var host_img = document.getElementById("host-img").src;
    console.log(host_img);
    var new_host = item.parentNode;
    var new_guest = document.createElement("div");
    new_guest.innerHTML = new_host.innerHTML;
    console.log(new_guest);
    new_guest.classList.add("each_guest");
    new_host.parentNode.insertBefore(new_guest,document.getElementById("odd_guest"));
    new_guest.lastElementChild.previousElementSibling.previousElementSibling.src = host_img;
    new_guest.lastElementChild.innerHTML = "你";
    new_guest.firstElementChild.remove();
    ori_host.parentNode.replaceChild(new_host, ori_host);
    new_host.style.padding = "20% 40% 27.3%";
    new_host.style.color = "#fff";
    new_host.style.background = "rgba(128, 108, 108, 0.405)";
    new_host.style.borderRadius = "0";
    new_host.lastElementChild.style.justifyContent = "left";
    new_host.lastElementChild.style.bottom = "15px";
    new_host.lastElementChild.style.left = "25px";
    new_host.lastElementChild.style.position = "absolute";
    new_host.lastElementChild.style.alignItems = "center";
    new_host.lastElementChild.previousElementSibling.style.left = "470px";
    new_host.lastElementChild.previousElementSibling.style.top = "280px";
    new_host.lastElementChild.previousElementSibling.previousElementSibling.style.height = "57.5%";
    new_host.lastElementChild.previousElementSibling.previousElementSibling.style.width = "57.5%";
    new_host.lastElementChild.previousElementSibling.previousElementSibling.style.marginTop = "0.2%";
    console.log(new_host.lastElementChild)
}