const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:8443/', { waitUntil: 'networkidle0' })
  await new Promise(r=>setTimeout(r,1500))
  const info = await page.evaluate(() => {
    const anchors = [...document.querySelectorAll('a[href]')].map(a => {
      const r = a.getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), href: a.getAttribute('href') }
    })
    // 找包含这些 a 的父级容器
    const parent = document.querySelector('a[href]')?.parentElement
    const pr = parent?.getBoundingClientRect()
    return { anchors, parent: pr ? {x:Math.round(pr.x),y:Math.round(pr.y),w:Math.round(pr.width),h:Math.round(pr.height)} : null }
  })
  console.log(JSON.stringify(info, null, 2))
  await browser.close()
})()
