class Alert {
  constructor(alertId) {
    this.alertElement = document.getElementById(alertId)
  }

  showMsg(msg) {
    this.alertElement.style["display"] = "block"
    this.alertElement.innerHTML = `<p>${msg}</p>`
    setTimeout(() => {
      this.alertElement.style["display"] = "none"
    }, 5000)
  }
}

export default Alert