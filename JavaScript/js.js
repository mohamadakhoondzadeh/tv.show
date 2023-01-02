let episodes = null
const container = document.querySelector(".cardContainer")
const input = document.querySelector("input")
const select = document.querySelector("select")
console.log(select);


fetchEpisodes()
async function fetchEpisodes() {
  const res = await fetch('https://api.tvmaze.com/shows/82/episodes')
  episodes = await res.json()
  renderEpisodes(episodes)
  renderOptions(episodes)

}

function renderEpisodes(data) {
  const cards = document.querySelector("div")
  cards.classList.add("cards")
  data.forEach((element)=>{
    const card = document.createElement("div")
    card.classList = "card"
    card.innerText = `S${element.season < 10 ? "0" + element.season: element.season }E${element.number < 10 ? "0" + element.number : element.number}`

    const image = document.createElement("img")
    image.setAttribute("src",element.image.medium)
    image.setAttribute('class', "card-img-top")
    image.setAttribute('style', 'width: 18 rem;')
    card.setAttribute('style' , 'width: 18 rem;')
    card.append(image)
    container.append(card)
    
    })
}
function liveSearch(data, value){
  const cards = document.querySelector(".cards")
  container.innerHTML=''

  //if (value) {
    //cards && cards.remove()
    const filterEpisodes = data.filter(
      (element) =>element.name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1 ||
        element.summary.toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1
      
    )
    //renderEpisodes(filterEpisodes)

    filterEpisodes.forEach((element)=>{
    const card = document.createElement("div")
    card.classList = "card row"
    card.innerText = `S${element.season < 10 ? "0" + element.season: element.season }E${element.number < 10 ? "0" + element.number : element.number}`

    const image = document.createElement("img")
    image.setAttribute("src",element.image.medium)
    image.setAttribute('class', "card-img-top col-3")
    image.setAttribute('style', 'width: 18 rem;')

    const summary = document.createElement("span")
    summary.innerHTML = element.summary
    card.setAttribute('style' , 'width: 18 rem;')
    card.append(image)
    card.append(summary)
    console.log('li')
    container.append(card)
    })
    
 // }else{
   // cards && cards.remove()
   // renderEpisodes(episodes)
  //}
}
input.addEventListener("input", (e) =>{
  liveSearch(episodes, e.target.value)
})

function renderOptions(data) {
  data.map((element)=>{
    let option = document.createElement("option")
    option.textContent =`S${
         element.season < 10 ? "0" + element.season : element.season
       }E${element.number < 10 ? "0" + element.number : element.number} - ${element.name}`
    option.value = element.id

    select.append(option)
  })
  
}

function selectEpisodes(data, value) {
  console.log(value)
  const episode=data.filter((element)=>element.id==value)
  console.log(episode)
  container.innerHTML=''
  episode.forEach((element)=>{
    const card = document.createElement("div")
    card.classList = "card row"
    card.innerText = `S${element.season < 10 ? "0" + element.season: element.season }E${element.number < 10 ? "0" + element.number : element.number}`

    const image = document.createElement("img")
    image.setAttribute("src",element.image.medium)
    image.setAttribute('class', "card-img-top col-3")
    image.setAttribute('style', 'width: 18 rem;')

    const summary = document.createElement("p")
    summary.innerHTML = element.summary
    card.setAttribute('style' , 'width: 18 rem;')
    card.append(image)
    card.append(summary)
    container.append(card)
    
    })
  //console.log(data)
  //alert('hi')
  // const cards = document.querySelector(".cards")
  // if (value !== "all-Episodes") {
  //   cards && cards.remove()
  //   renderEpisodes(episodes)
  // }
}

select.addEventListener("change", (e)=>{
  selectEpisodes(episodes, e.target.value)
})


//`S${
//   item.season < 10 ? "0" + item.season : item.season
// }E${item.number < 10 ? "0" + item.number : item.number} - ${item.name}`