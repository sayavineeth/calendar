let dates=document.getElementById("dates");
let current=document.getElementById("current");
let left=document.getElementById("left")
let right=document.getElementById("right")
let select=document.getElementById("select")
let num=document.getElementById("num")

let d=new Date()
let cDay =d.getDate()
let preMonth=d.getMonth()
let preYear=d.getFullYear();
let currentMonth=preMonth;
let curYear=preYear




let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

for (let i=0;i<=11;i++){
    let option=` <option id="option" value=${i}>${month[i]}</option>`
    select.innerHTML+=option
}

select.value=preMonth
num.value=preYear



// current.textContent=`${month[curMonth]},${curYear}`
function calender(curYear,curMonth){
    const dayNames = document.querySelectorAll('.day-name');
    for(let i of dayNames){
        i.classList.remove('selected-day-name')
    }
    dates.innerHTML=''
    let startMonthDay=new Date(curYear,curMonth,1).getDay()
    let lastMonthDay=new Date(curYear,curMonth,0).getDate()
    
    let lastDateOfMonth=new Date(curYear,curMonth+1,0).getDate()
    let lastDayofMonth = new Date(curYear,curMonth,lastDateOfMonth).getDay();
    let count=6

    for (let i =-startMonthDay+1;i<=lastDateOfMonth+7-lastDayofMonth-1;i++){
        count++;
        let item=document.createElement("li");
        item.accessKey=crypto.randomUUID();
        item.classList.add('day-item');
        if(lastMonthDay+i<=lastMonthDay){

            item.textContent=lastMonthDay+i
            item.classList.add("inactive")
            item.onclick=()=>{
                currentMonth-=1
                calender(curYear,currentMonth)
                select.value=currentMonth

            }
           

           
        }
        else if(i>lastDateOfMonth){
            item.textContent=i-lastDateOfMonth
            item.classList.add("inactive")
            item.onclick=()=>{
                currentMonth+=1
                calender(curYear,currentMonth)
                select.value=currentMonth
            }
           
        
    }
        else{
            item.textContent=i
            if (count%7===0){
                item.classList.add("sunday")
            }
            

            item.onclick=(e)=>{
                const key = e.target.accessKey;
                const dayItems = document.querySelectorAll('.day-item');
                const dayNames = document.querySelectorAll('.day-name');
                const day = new Date(curYear,curMonth,e.target.textContent).getDay();
                for(let i of dayItems){
                    if(i.accessKey===key){
                        i.classList.add("seleced-day")
                    }
                    else{
                        i.classList.remove("seleced-day")
                    }
                }
                for(let i of dayNames){
                    if(i.accessKey==day){
                        i.classList.add("selected-day-name")
                    }
                    else{
                        i.classList.remove("selected-day-name")
                    }
                }
            }
           
        }
        if(i==cDay){
            if(`${month[curMonth]},${curYear}`===`${month[preMonth]},${preYear}`){
                item.classList.add("perday")}
            }
            item.classList.add('day')
            dates.appendChild(item)
            
        }
    }
    
    
    const MonthInput=(e)=>{
        curYear=e.target.value
        calender(curYear,currentMonth)
    }
    num.addEventListener('input',MonthInput)
    select.onchange=(e)=>{
        curMonth=e.target.value
    calender(curYear,curMonth)
}
left.onclick=()=>{
    currentMonth-=1
    if (currentMonth<0){
        curYear-=1
        currentMonth=11
        num.value=curYear
    }
    
    
    
    calender(curYear,currentMonth)
    select.value=currentMonth
    // current.textContent=`${month[curMonth]},${curYear}`
}
right.onclick=()=>{
    currentMonth+=1
    if (currentMonth>11){
        curYear+=1
        currentMonth=0
        num.value=curYear
    }
    
    calender(curYear,currentMonth)
    // current.textContent=`${month[curMonth]},${curYear}`
    select.value=currentMonth
}    
calender(curYear,currentMonth)
