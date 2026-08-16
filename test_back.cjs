const puppeteer = require('puppeteer')
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
;(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const logs = []
  page.on('console', m => logs.push(m.type()+': '+m.text()))
  page.on('pageerror', e => logs.push('PAGEERROR: '+e.message))
  page.on('requestfailed', r => logs.push('REQFAIL: '+r.url()+' '+ (r.failure()&&r.failure().errorText)))

  await page.goto('http://localhost:8443/', { waitUntil: 'networkidle0' })
  await sleep(1800)

  const dump = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].map(b => b.textContent.trim().slice(0,30))
    // 找 fixed inset:0 的 div
    const fixed = [...document.querySelectorAll('div')].filter(d => {
      const s = getComputedStyle(d)
      return s.position === 'fixed' && s.inset === '0px' 
    }).map(d => d.className || d.id || 'div')
    return {
      totalButtons: btns,
      fixedDivs: fixed,
      bodyLen: document.body.innerHTML.length,
      hasShijianText: document.body.innerHTML.includes('时鉴'),
    }
  })
  console.log(JSON.stringify(dump, null, 2))
  console.log('LOGS:\n'+logs.join('\n'))
  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
