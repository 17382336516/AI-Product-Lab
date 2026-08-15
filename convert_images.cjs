// 批量把 src/imports 下 png/jpg 转成 webp（质量 85，缩放到合理宽度，不放大原图）
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, 'src/imports')
const exts = ['.png', '.jpg', '.jpeg']
const MAX_W = 1600 // 显示宽度上限，超过才缩放；原图更小则保持原尺寸（不放大）

function walk(d) {
  const out = []
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (exts.includes(path.extname(e.name).toLowerCase())) out.push(p)
  }
  return out
}

const files = walk(dir)
console.log('Found images:', files.length)

let totalBefore = 0
let totalAfter = 0
let skipped = 0

;(async () => {
  for (const f of files) {
    const webp = f.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    if (fs.existsSync(webp)) { skipped++; continue }
    const stat = fs.statSync(f)
    totalBefore += stat.size
    let img = sharp(f)
    const meta = await img.metadata()
    if (meta.width && meta.width > MAX_W) {
      img = img.resize({ width: MAX_W })
    }
    const buf = await img.webp({ quality: 85 }).toBuffer()
    fs.writeFileSync(webp, buf)
    totalAfter += buf.length
    console.log(
      path.relative(dir, f),
      (stat.size / 1024).toFixed(0) + 'KB',
      '->',
      (buf.length / 1024).toFixed(0) + 'KB'
    )
  }
  console.log('---')
  console.log('Skipped (already webp):', skipped)
  console.log('Total before:', (totalBefore / 1024 / 1024).toFixed(1) + 'MB')
  console.log('Total after :', (totalAfter / 1024 / 1024).toFixed(1) + 'MB')
})()
