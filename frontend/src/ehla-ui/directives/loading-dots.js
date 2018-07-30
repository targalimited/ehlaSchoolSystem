let timerID
export default {
  inserted(el, binding) {
    let numberOfDots = 0 
    timerID = setInterval(()=> {
      el.innerHTML = el.innerHTML + '.'
      numberOfDots++
      if (numberOfDots === 4) {
        el.innerHTML = el.innerHTML.slice(0, -4)
        numberOfDots = 0
      }
    }, binding.value.period)
  },
  unbind() {
    clearInterval(timerID)
  }
}
