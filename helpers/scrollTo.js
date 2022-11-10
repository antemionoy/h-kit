let SmoothScrolling = {
  timer: null,

  stop: function () {
    clearTimeout(this.timer)
  },

  scrollTo: function (node, offsetInit, callback) {
    let settings = {
      duration: 1000,
      easing: {
        outQuint: function (x, t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
      },
    }
    let percentage
    let startTime
    let nodeTop = node.offsetTop - offsetInit
    let nodeHeight = node.offsetHeight
    let body = document.body
    let html = document.documentElement
    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    let windowHeight = window.innerHeight
    let offset = window.pageYOffset
    let delta = nodeTop - offset
    let bottomScrollableY = height - windowHeight
    let targetY =
      bottomScrollableY < delta
        ? bottomScrollableY - (height - nodeTop - nodeHeight + offset)
        : delta

    startTime = Date.now()
    percentage = 0

    if (this.timer) {
      clearInterval(this.timer)
    }

    function step() {
      let yScroll
      let elapsed = Date.now() - startTime

      if (elapsed > settings.duration) {
        clearTimeout(this.timer)
      }

      percentage = elapsed / settings.duration

      if (percentage > 1) {
        clearTimeout(this.timer)

        if (callback) {
          callback()
        }
      } else {
        yScroll = settings.easing.outQuint(
          0,
          elapsed,
          offset,
          targetY,
          settings.duration
        )
        window.scrollTo(0, yScroll)
        this.timer = setTimeout(step, 1)
      }
    }

    this.timer = setTimeout(step, 1)
  },
}

export default SmoothScrolling
