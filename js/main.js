import "../style.css"
import Alert from "./classes/Alert"
import { apiKey } from "./keys"

let apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

let $searchForm = document.querySelector("#search-form")
let $inputMovie = document.querySelector("#search-movie-name")
let alert = new Alert("alert")

let fetchApi = async (url, cb) => {
  let response = await fetch(url)
  response = await response.json()
  cb(response)
}

let renderData = (data) => {
  let $divResult = document.getElementById("result")
  
  if(data.Response === "True") {
    const { 
      Title, 
      Plot, 
      Year, 
      Genre, 
      Rated, 
      Poster,
      Director,
      Actors,
      Awards,
      Ratings
    } = data

    let peopleRating = Ratings[0]
    let { Value } = peopleRating
    peopleRating = Value.split("/")[0]
    peopleRating = parseFloat(peopleRating)

    $divResult.innerHTML = `
      <div class="poster-container">
        <img src="${Poster}" >
      </div>
      <div class="movie-details">
        <div>
          <p class="movie-title">
            ${Title} <em class="movie-year">(${Year})</em>
          </p>
          <div class="movie-rating ${peopleRating >= 7.0 ? "good" : "bad"}">
            <p>${peopleRating}/10</p>
          </div>
        </div>
        <p class="movie-description">${Plot}</p>
        <p class="movie-genre">Genre: ${Genre}</p>
        <p class="movie-director">Director: ${Director}</p>
        <p class="movie-actors">Actors: ${Actors}</p>
        <p class="movie-age-rating">${Rated}</p>
        <p class="movie-awards">${Awards != "N/A" ? Awards : "This movie doesn't have any award."}</p>
      </div>
    `
  } else {
    alert.showMsg(data.Error)
    $divResult.innerHTML = `<p class="not-found">No results</p>`
  }
}

$searchForm.addEventListener("submit", async evt => {
  evt.preventDefault()

  const { value: movieName } = $inputMovie
  await fetchApi(`${apiUrl}&t=${movieName}`, renderData)
})