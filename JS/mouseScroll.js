import cityJson from "../assets/city.json"

// 滾輪防抖以及滾輪當前位置
let lastTime = 0
let currentIdx = 0
const debounceTime = 700;

export const scrollEvent = (ev)=>{
  const currentTime = new Date().getTime();
  if (currentTime - lastTime < debounceTime) {
    return;
  }
  if(ev.deltaY > 0){
    if(currentIdx >= cityJson.cityArr.length-1) return
    currentIdx++ 
  }else{
    if(currentIdx <= 0) return
    currentIdx--
  }
  let sideBar = document.getElementById("cityList")
  sideBar.childNodes.forEach((ele,idx)=>{
    ele.classList.remove("text-white")
    ele.classList.add("text-sky-900")
  })
  sideBar.childNodes[currentIdx].classList.remove("text-sky-900")
  sideBar.childNodes[currentIdx].classList.add("text-white")

  lastTime = currentTime;
}