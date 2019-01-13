document.addEventListener('DOMContentLoaded', () => {
  const createMonsterForm = document.querySelector("#create-monster")
  const monsterContainer = document.querySelector("#monster-container")
  const backButton = document.querySelector("#back")
  const forwardButton = document.querySelector("#forward")
  console.log(backButton, forwardButton);

  let currentPage = 1

//featch new monster list
  function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
      .then(function(responseObject){
      return responseObject.json()
      })
      .then(function(monsterList){
        monsterContainer.innerHTML = ""
        addMonsters(monsterList)
      }
    )
  }

//set new monster information
  function addMonsters(monsterList){
    monsterList.map(function(monster){
      monsterContainer.innerHTML += `
        <h2> ${monster.name}</h2>
        <h4> Age: ${monster.age}</h4>
        <p> Bio: ${monster.description}</p>
      `
    })
  }

  forwardButton.addEventListener("click", function(event){
    currentPage +=1
    getMonsters()
  })
//find a better way to adjust for pressing back on page 1
  backButton.addEventListener("click", function(event){
    if (currentPage == 1){ currentPage = 2 }
    currentPage -=1
    getMonsters()
  })

//when page init= make form, fetch monsters
  createMonsterForm.innerHTML = `
    <form action="http://localhost:3000/monsters">
    <input type="text" id="monster-name" name="firstname" placeholder="name..."><input type="text" id="monster-age" name="lastname" placeholder="age..."><input type="text" id="monster-description" name="lastname" placeholder="description..."><input type="submit" id="create-submit" value="Create">
    </form>
  `
  getMonsters()


  const createNewMonsterButton = document.querySelector("#create-submit")
  const newMonsterName = document.querySelector("#monster-name")
  const newMonsterAge = document.querySelector("#monster-age")
  const newMonsterdescription = document.querySelector("#monster-description")

  createNewMonsterButton.addEventListener("click", function(e){
    e.preventDefault()
    fetch(`http://localhost:3000/monsters`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: newMonsterName.value, age: newMonsterAge.value, description: newMonsterdescription.value
      })
    })
    .then(() => alert(`${newMonsterName.value} will be added to the end of the monster List`))
  })
})
