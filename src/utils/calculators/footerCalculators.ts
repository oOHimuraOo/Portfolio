import { footerInfo } from "../class/siteInfoClass";

function getRandomDateInYear(date:string) {
  const start = new Date(date)
  const end = new Date(date)
  end.setMonth(start.getMonth() + 12)

  const randomTimeStamp = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  const randomDate = new Date(randomTimeStamp)

  return randomDate
}

function stringDateModelConverter(date:Date) {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

const getRandomBoolean = (): boolean => {
  return Math.random() < 0.5
}

export function generateFooterInfos() {
  const date = new Date().toDateString()
  const data = stringDateModelConverter(getRandomDateInYear(date))
  const views = Math.floor(Math.random() * 100)
  const errors = Math.floor(Math.random() * 5)
  const alerts = Math.floor(Math.random() * 5)
  const author = 'made by oOHimuraOo'
  const madeIn = 'made with VUE.js'
  const expertise = ['https://via.placeholder.com/5x5', 'https://via.placeholder.com/10x10', 'https://via.placeholder.com/15x15', 'https://via.placeholder.com/20x20', 'https://via.placeholder.com/25x25', 'https://via.placeholder.com/30x30', 'https://via.placeholder.com/35x35']
  const status = getRandomBoolean()

  const footer = new footerInfo(data,views, errors,alerts,author,madeIn,expertise,status)
  return footer
}
