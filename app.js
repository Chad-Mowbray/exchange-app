class Exchange {
  
  constructor() {
    this.url = `https://api.vatcomply.com/rates?base=`
    this.parentDiv = document.querySelector("#container")
    this.isLoading = false
  }

  setUpEventListener() {
    document.querySelector('select').addEventListener('change', (e) => {
      this.doEverything(e.target.value)
    })
  }

  loading(){
    if (this.isLoading) {
      this.parentDiv.innerHTML = "<h2>Loading...</h2>"
    } else {
      this.parentDiv.innerHTML = ""
    }
  }

  async doEverything(base) {
    try {
      let rates = await this.setUpRates(base)
      let formattedRates = this.displayRates(rates)
      this.createItems(formattedRates)
    } catch (err) {
      console.log(err)
      let p = document.createElement('p')
      p.textContent = "Error: Please try again later"
      this.parentDiv.appendChild(p)
    }
  }

  displayRates(rates) {
    let rateStrings = Object.entries(rates)
    let formattedRates = rateStrings.map( entry => `<p><b>Currency:</b> ${entry[0]}</p><br/><p><b>Value:</b>${entry[1]}</p>`)
    return formattedRates
  }

  createItems(formattedRates) {
    this.isLoading = false
    this.loading()
    for(let i = 1; i <= formattedRates.length - 1; i++) {
      let itemDiv = document.createElement('div')
      itemDiv.className = "item"
      itemDiv.innerHTML = formattedRates[i]
      this.parentDiv.appendChild(itemDiv)
    }
  }

  async setUpRates(base="USD") {
    this.isLoading = true
    this.loading()
    let response = await fetch(this.url + base)
    let respJSON = await response.json()
    let rates = respJSON.rates
    return rates
  }

  run() {
    this.setUpEventListener()
  }

}


window.onload = () => {
  let ex = new Exchange()
  ex.run()
}


