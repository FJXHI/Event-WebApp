import{r,q as p}from"./index-CqKoZLBC.js";const s="/Event-WebApp/",w=`${s}data/mapData.json`,m=`${s}data/acts.json`,g=`${s}data/stages.json`,y=`${s}data/eventInfo.json`,d=`${s}data/performances.json`;fetch(d),fetch(g),fetch(m),fetch(y);function D(t,o="Date Time",a=!1,c="de-DE"){const i=new Date(t);let e;switch(o){case"Date Long":e={day:"2-digit",month:"2-digit",year:"numeric",hour12:a};break;case"Date Short":e={day:"2-digit",month:"2-digit",hour12:a};break;case"Time":e={hour:"2-digit",minute:"2-digit",hour12:a};break;case"Date Short Time":e={day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:a};break;case"Date Long Time":e={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:a};break;default:e={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:a};break}return new Intl.DateTimeFormat(c,e).format(i)}function b(t,o="full"){switch(o){case"noCountry":return`${t.street}, ${t.postal_code} ${t.city}`;case"streetPostal":return`${t.street}, ${t.postal_code}`;case"streetCity":return`${t.street}, ${t.city}`;case"postalCity":return`${t.postal_code} ${t.city}`;case"onlyStreet":return`${t.street}`;case"onlyPostal":return`${t.postal_code}`;case"onlyCity":return`${t.city}`;case"onlyCountry":return`${t.country}`;case"full":default:return`${t.street}, ${t.postal_code} ${t.city}, ${t.country}`}}function j(){const t=r([]),o=r([]),a=r([]),c=r({}),i=r(!0),e=r(null),$=async()=>{try{const[n,l,u,f]=await Promise.allSettled([fetch(d),fetch(g),fetch(m),fetch(y)]);if(n.status==="fulfilled"&&l.status==="fulfilled"&&u.status==="fulfilled"&&f.status==="fulfilled"){try{t.value=await n.value.json(),o.value=await l.value.json(),a.value=await u.value.json(),c.value=await f.value.json()}catch{throw new Error("Error while parsing JSON data.")}i.value=!1}else throw new Error("Some data could not be loaded.")}catch(n){i.value=!1,e.value={message:` Error loading data: ${n instanceof Error?n.message:"Unknown error"}`},console.error("Data could not be loaded:",n)}};return p(()=>{$()}),{performances:t,stages:o,acts:a,eventInfo:c,isLoading:i,error:e}}export{b as a,s as b,D as f,w as m,j as u};
