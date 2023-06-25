const btn = document.querySelector('.btn')
// console.log(btn)
const card = document.querySelector('.card')
const image = document.querySelector('#img')
// console.log(image)
const text = document.querySelector('.text')
// console.log(text)
const continent = document.querySelector('.continent')
// console.log(continent)
const capital = document.querySelector('.capital')
// console.log(capital)
const language = document.querySelector('.language')
// console.log(language)
const population = document.querySelector('.population')
// console.log(description)
btn.addEventListener('click', btnhandler)

function btnhandler(){
    
    function uicreate(data){
        console.log(data)
        image.src = data.flags.png
        text.textContent = `Country name: ${data.name.common}`
        continent.textContent = `Country Region: ${data.region}`;    
        capital.textContent = `Country Capital: ${data.capital[0]}`
        // language.textContent = `${data.languages.deu}`
        language.textContent = `Country Language: ${Object.values(data.languages).map((prop)=>prop).join()}`
        population.textContent = `Population: ${data.population}`
        
        btn.style.display = 'none'
        card.style.display = 'block'
    }
    

    
    const whereAmi = function(long , lati){
        fetch(`https://geocode.xyz/${long},${lati}?geoit=json`)
        .then(response=>{
            if(!response.ok){
                throw new Error('Sorry your code not exist')
            }
            return response.json()
        }).then((data)=>{
            console.log(data)
            return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        }).then(res=>{
        if(!res.ok){
            throw new Error(`Countrty not found ${res.status}`)
        }
        return res.json()
    }).then(data =>{
        console.log(data)
        uicreate(data[0])
    }).catch((err=>console.log(`${err}`)
    ))
}
whereAmi(52.508 , 13.381);
}
