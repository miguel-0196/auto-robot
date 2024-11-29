const robot = require("robotjs")

// Time
const preparation = 15 * 1000
const duration = 3 * 60 * 60 * 1000
const start = Date.now()

// Size
const {width, height} = robot.getScreenSize()
const topLimit = 100
const bottomLimit = 100
const leftLimit = 500
const rightLimit = 150

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

setTimeout(() => {
  onInterval()
}, preparation)

const onInterval = async () => {
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      triggerTab()
      break
    case 1:
    case 2:
    case 3:
      await triggerType()
      break
    case 4:
      triggerScroll()
      break
  }

  await delay(5000)

  if (Date.now() - start < duration) {
    onInterval()
  }
}

const triggerTab = () => {
  const x = Math.floor(leftLimit + Math.random() * (width - leftLimit - rightLimit))
  const y = 40
  robot.moveMouse(x, y)
  robot.mouseClick()
}

const triggerType = async () => {
  const x = width - rightLimit
  const y = Math.floor(topLimit + Math.random() * (height - topLimit - bottomLimit))
  robot.moveMouse(x, y)
  robot.mouseClick()
  robot.keyTap('enter')
  robot.keyTap('s', 'control')
  await delay(3000)
  const reload = Math.random() > 0.5

  if (reload) {
    robot.keyTap('tab', 'alt')
    await delay(1000)
    robot.keyTap('f5')
    await delay(2000 + Math.random() * 3000)
    robot.keyTap('tab', 'alt')
    await delay(1000)
  }

  robot.keyTap('z', 'control')
  robot.keyTap('s', 'control')
}

const triggerScroll = () => {
  const x = Math.floor(width - 10)
  const y = Math.floor(topLimit + Math.random() * (height - topLimit - bottomLimit))
  robot.moveMouse(x, y)
  robot.mouseClick()
}
