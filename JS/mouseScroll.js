import cityJson from "../assets/city.json"

// 滾輪防抖以及滾輪當前位置
let lastTime = 0
let currentIdx = 0
const debounceTime = 700;
// 延遲
const delay = (sec) => new Promise(resolve => setTimeout(resolve, sec));

export const scrollEvent = async (ev)=>{
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
  let cityName = document.getElementById("cityName")
  let photo = document.getElementById("photo")
  photo.classList.remove("scroll-in-down")
  photo.classList.add("scroll-out-up")
  cityName.classList.remove("scroll-in-down")
  cityName.classList.add("scroll-out-up")
  await delay(400);
  photo.src = cityJson.cityArr[currentIdx].src
  cityName.textContent = cityJson.cityArr[currentIdx].name
  await delay(400);
  photo.classList.remove("scroll-out-up")
  photo.classList.add("scroll-in-down")
  cityName.classList.remove("scroll-out-up")
  cityName.classList.add("scroll-in-down")

  let sideBar = document.getElementById("cityList")
  sideBar.childNodes.forEach((ele,idx)=>{
    ele.classList.remove("text-white")
    ele.classList.add("text-sky-900")
  })
  sideBar.childNodes[currentIdx].classList.remove("text-sky-900")
  sideBar.childNodes[currentIdx].classList.add("text-white")

  lastTime = currentTime;
}