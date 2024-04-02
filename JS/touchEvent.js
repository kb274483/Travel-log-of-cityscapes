import cityJson from "../assets/city.json"

// 滾輪防抖以及滾輪當前位置
let lastTime = 0
let currentIdx = 0
const debounceTime = 500;
// 觸碰滑動事件
let startX = 0;
let startY = 0; 
let endX = 0; 
let endY = 0; 

export const touchEventStart = (ev)=>{
  startX = ev.touches[0].pageX;
  startY = ev.touches[0].pageY; 
}

export const touchEventEnd = (ev)=>{
  endX = ev.changedTouches[0].pageX;
  endY = ev.changedTouches[0].pageY;
  let deltaX = endX - startX;
  let deltaY = endY - startY;

  const currentTime = new Date().getTime();
  if (currentTime - lastTime < debounceTime) {
    return;
  }

  if(Math.abs(deltaX) < Math.abs(deltaY)) {
    if(deltaY < 0) {
      if(currentIdx >= cityJson.cityArr.length-1) return
      currentIdx++ 
    } else {
      if(currentIdx <= 0) return
      currentIdx--
    }
    let sideBar = document.getElementById("cityList")
    sideBar.childNodes.forEach((ele,idx)=>{
      if(idx === currentIdx){
        ele.classList.remove("text-sky-900")
        ele.classList.add("text-white")
      }else{
        ele.classList.remove("text-white")
        ele.classList.add("text-sky-900")
      }
    })
    lastTime = currentTime;
  } 
}