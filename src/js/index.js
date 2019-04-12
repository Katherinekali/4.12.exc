let lis = [...document.querySelector(".menu").children];

let swiper = new Swiper(".container", {


})
lis.forEach((item, index) => {
    item.onclick = function() {
        let act = document.querySelector(".active");
        act.className = "";
        item.className = "active"
        swiper.slideTo(index)
    }
})