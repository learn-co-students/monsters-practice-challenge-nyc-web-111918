document.addEventListener('DOMContentLoaded', () => {

  /*****************************************************************************
    * All of our variables and data.
  *****************************************************************************/

  const monsterContainer = document.querySelector('#monster-container')
  const forwardButton = document.querySelector('#forward')
  const backButton = document.querySelector('#back')
  const addMonsterForm = document.querySelector('#add-monster-form')
  let pageNumber = 1
  let allMonsters = []

  /*****************************************************************************
    * Onload fetch data
  *****************************************************************************/

  function fetchAllMonsters(allMonsters) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((r) => r.json())
    .then((monsterJSONData) => {
      allMonsters = monsterJSONData
      monsterContainer.innerHTML = renderAllMonsters(allMonsters)
    })
  }

  fetchAllMonsters(allMonsters)

  /*****************************************************************************
    * Event Listeners
  *****************************************************************************/

  document.body.addEventListener('click', (e) => {
    if (e.target.id === "forward") {
      pageNumber++
    } else if (e.target.id === "back") {
      if (pageNumber === 1) {
        return window.alert("Can't go below page 1!")
      } else {
        pageNumber--
      }
    }
    fetchAllMonsters(allMonsters)
  })

  addMonsterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const monsterNameInput = document.querySelector('#input-name').value
    const monsterAgeInput = document.querySelector('#input-age').value
    const monsterDescriptionInput = document.querySelector('#input-description').value
    fetch('http://localhost:3000/monsters', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "name": monsterNameInput,
        "age": monsterAgeInput,
        "description": monsterDescriptionInput
      })
    })
    .then(r => r.json())
    .then(monsterJSONData => {
      allMonsters.push(monsterJSONData)
      monsterContainer.innerHTML = renderAllMonsters(allMonsters)
    })
  })

}) //END OF DOMLOAD

/*****************************************************************************
  * Helper Functions (PURE!) Won't mutate
******************************************************************************/

const renderAllMonsters = (allMonsters) => {
  return allMonsters.map((monster) => monsterCardHTML(monster)).join('')
}

const monsterCardHTML = (monster) => {
  return `
    <div id="${monster.id}">
      <h2>${monster.name}</h2>
      <h4>${monster.age}</h4>
      <p>${monster.description}</p>
    </div>
  `
}
