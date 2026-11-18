import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('https://www.werenota.com/', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.screenshot({ path: '/tmp/live-home.png' });
const m = await p.evaluate(() => {
  const h1 = document.querySelector('h1');
  const btn = document.querySelector('.btn.primary');
  return {
    h1: getComputedStyle(h1).color,
    btn: getComputedStyle(btn).backgroundColor,
    btnText: getComputedStyle(btn).color,
    bodyText: getComputedStyle(document.querySelector('.lede')).color,
    interLoaded: document.fonts.check('16px Inter'),
    fonts: [...document.fonts].length,
  };
});
console.log(JSON.stringify(m, null, 1));
await b.close();
