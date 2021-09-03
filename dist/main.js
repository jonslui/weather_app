(()=>{"use strict";function t(t,e){const n={timezone_offset:t.timezone_offset};for(let i=0;i<t.daily.length;i+=1)n[i]={high:e(t.daily[i].temp.max),low:e(t.daily[i].temp.min),icon:t.daily[i].weather[0].icon,time:t.daily[i].dt,chance_of_rain:t.daily[i].pop};return n}function e(t,e){const n={timezone_offset:t.timezone_offset};for(let i=0;i<t.hourly.length;i+=1)n[i]={time:t.hourly[i].dt,temp:e(t.hourly[i].temp),icon:t.hourly[i].weather[0].icon,precipitation_prob:t.hourly[i].pop};return n}async function n(n){try{const o=document.getElementById("location_input"),c=await async function(n,i){try{const o=await fetch("https://nominatim.openstreetmap.org/?addressdetails=1&q="+n+"&format=json&limit=1",{mode:"cors"}),c=await o.json(),[a,d,r]=[c[0].lat,c[0].lon,c[0].display_name],l=await fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+a+"&lon="+d+"&exclude=minutely&appid=f28c637b536fd0079c1b9e884e3468f3",{mode:"cors"}),s=await l.json();return{location:r,current:{temp:i(s.current.temp),feels_like:i(s.current.feels_like),humidity:s.current.humidity,todays_high:i(s.daily[0].temp.max),todays_low:i(s.daily[0].temp.min),description:s.current.weather[0].description,icon:s.current.weather[0].icon},daily:t(s,i),hourly:e(s,i)}}catch(t){}}(o.value,n);o.value=c.location,i=c.location,localStorage.setItem("location",i),function(t){const e=document.createElement("div");e.setAttribute("id","current_forecast_container"),document.getElementById("content").appendChild(e);const n=document.createElement("div");n.setAttribute("id","current_temperature_container"),e.appendChild(n);const i=document.createElement("img");i.src="http://openweathermap.org/img/wn/"+t.icon+"@2x.png",i.setAttribute("id","weather_icon"),e.appendChild(i);const o=document.createElement("div");o.innerHTML=t.temp+"°",o.setAttribute("id","current_temp"),n.appendChild(o);const c=document.createElement("div");c.innerHTML="Feels like:\n"+t.feels_like+"°",c.setAttribute("id","feels_like"),n.appendChild(c);const a=document.createElement("div");a.innerHTML="Humidity:\n"+t.humidity+"%",a.setAttribute("id","humidity"),n.appendChild(a);const d=document.createElement("div");d.setAttribute("id","high_low_container"),e.appendChild(d);const r=document.createElement("div");r.setAttribute("id","todays_high"),r.innerHTML="H: "+t.todays_high+"°",n.appendChild(r);const l=document.createElement("div");l.setAttribute("id","todays_low"),l.innerHTML="L: "+t.todays_low+"°",n.appendChild(l)}(c.current),function(t){const e=document.createElement("div");e.setAttribute("id","hourly_forecast_container"),document.getElementById("content").appendChild(e),function(t,e){for(let n=0;n<25;n+=1){const i=document.createElement("div");i.setAttribute("class","hourly_forecast"),e.appendChild(i);const o=document.createElement("div");o.innerHTML=(t[n].time+t.timezone_offset)/3600%24,o.setAttribute("class","hour"),i.appendChild(o);const c=document.createElement("img");c.src="http://openweathermap.org/img/wn/"+t[n].icon+"@2x.png",c.setAttribute("class","hourly_icon"),i.appendChild(c);const a=document.createElement("div");if(a.innerHTML=t[n].temp+"°",a.setAttribute("class","hourly_temp"),i.appendChild(a),t[n].precipitation_prob>0){const e=document.createElement("div");e.innerHTML=Math.round(100*t[n].precipitation_prob)+"%",e.setAttribute("class","prob_of_rain"),i.appendChild(e)}}}(t,e)}(c.hourly),function(t){const e=document.createElement("div");e.setAttribute("id","daily_forecast_container"),document.getElementById("content").appendChild(e),function(t,e){for(let o=1;o<8;o+=1){const c=document.createElement("div");c.setAttribute("class","day_container"),e.appendChild(c);const a=document.createElement("div");a.setAttribute("class","day_name"),a.innerHTML=(n=t[o].time,i=t.timezone_offset,new Date(1e3*n+1e3*i).toLocaleString("en-US",{weekday:"long"})),c.appendChild(a);const d=document.createElement("img");d.src="http://openweathermap.org/img/wn/"+t[o].icon+"@2x.png",d.setAttribute("class","daily_weather_icon"),c.appendChild(d);const r=document.createElement("div");r.setAttribute("class","max_temp"),r.innerHTML="H: "+t[o].high+"°",c.appendChild(r);const l=document.createElement("div");if(l.setAttribute("class","min_temp"),l.innerHTML="L: "+t[o].low+"°",c.appendChild(l),t[o].chance_of_rain>0){const e=document.createElement("div");e.setAttribute("class","daily_precip_prob"),e.innerHTML=Math.round(100*t[o].chance_of_rain)+"%",c.appendChild(e)}}var n,i}(t,e)}(c.daily)}catch(t){console.log(t)}var i}function i(){const t=document.getElementById("content");for(;t.childNodes.length>1;)t.removeChild(t.lastChild)}function o(t){localStorage.setItem("scale",t)}function c(t,e,n){"F"===t?(e.style.opacity=1,n.style.opacity=.4):(n.style.opacity=1,e.style.opacity=.4)}function a(t){return Math.round(1.8*(t-273.15)+32)}function d(t){return Math.round(t-273.15)}!function(){const t=document.getElementById("content"),e=document.createElement("div");e.setAttribute("id","top_bar"),t.appendChild(e);const r=document.createElement("input");r.setAttribute("id","location_input");const l=document.createElement("button");l.setAttribute("id","submit_button"),l.innerHTML="Submit",l.addEventListener("click",(()=>{i(),"F"===localStorage.getItem("scale")?n(a):n(d)}));const s=document.createElement("button");s.setAttribute("id","fahrenheit"),s.innerHTML="F";const m=document.createElement("button");m.setAttribute("id","celsius"),m.innerHTML="C",s.addEventListener("click",(()=>{o("F"),c("F",s,m),i(),n(a)})),m.addEventListener("click",(()=>{o("C"),c("C",s,m),i(),n(d)})),e.appendChild(m),e.appendChild(s),e.appendChild(l),e.appendChild(r)}(),function(){const t=document.getElementById("location_input"),e=localStorage.getItem("location"),i=localStorage.getItem("scale");null==i&&o("F"),c(i,document.getElementById("fahrenheit"),document.getElementById("celsius")),null!=e?(t.value=e,n("F"===i?a:d)):t.placeholder="Enter location here"}()})();