# List-Otomatis
List otomatis pakai label untuk blogger, buat yang suka ngasih daftar untuk setiap postingan.

## Cara Pakai
1. Buka Blogger.
2. Masuk halaman dan buat baru halaman
3. Copy dan paste kode di bawah ini
4. Lihat pada bagian script terdapat https://NAMA.blogspot.com/ rubah sesuai link blogmu
5. Selamat Mencoba

## Kode
<div id="anime-list" class="waternime">
  <div class="waternime-apb">
    <a href="#num">#</a>
    <a href="#A">A</a><a href="#B">B</a><a href="#C">C</a><a href="#D">D</a><a href="#E">E</a>
    <a href="#F">F</a><a href="#G">G</a><a href="#H">H</a><a href="#I">I</a><a href="#J">J</a>
    <a href="#K">K</a><a href="#L">L</a><a href="#M">M</a><a href="#N">N</a><a href="#O">O</a>
    <a href="#P">P</a><a href="#Q">Q</a><a href="#R">R</a><a href="#S">S</a><a href="#T">T</a>
    <a href="#U">U</a><a href="#V">V</a><a href="#W">W</a><a href="#X">X</a><a href="#Y">Y</a>
    <a href="#Z">Z</a>
  </div>
  <div class="waternime-wrap" id="anime-content"></div>
</div>

<style>
.waternime {
  overflow: hidden;
  font-family: sans-serif;
  color: #eee;
}

.waternime .waternime-apb a {
  display: inline-block;
  margin: 2px;
  padding: 5px;
  width: 25px;
  text-align: center;
  background: #333;
  color: #fff;
  transition: 0.3s;
  border-radius: 4px;
}
.waternime .waternime-apb a:hover {
  background: #8a3324;
}

.waternime .waternime-group {
  margin-top: 20px;
  clear: both;
}

.waternime .waternime-head {
  font-weight: bold;
  font-size: 18px;
  padding: 8px 0;
  border-bottom: 2px solid #8a3324;
  color: #fff;
  text-align: left;
}

.waternime .anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}

.waternime .waternime-item {
  width: 50%;
  float: left;
  box-sizing: border-box;
}

.waternime .waternime-title a {
  display: block;
  padding: 6px 12px;
  font-size: 15px;
  color: #ccc;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.waternime .waternime-title a:hover {
  color: #8a3324;
}

@media(max-width:768px) {
  .waternime .waternime-item {
    width: 100%;
  }
}
</style>

<script>
const letters = ['num', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const blogURL = 'https://NAMA.blogspot.com/'; // Ganti ke URL blog kamu

function labelToTitle(label) {
  return label === 'num' ? '#' : label;
}

function labelToURL(label) {
  return label === 'num' ? '0-9' : label;
}

async function fetchPosts(label) {
  const url = `${blogURL}/feeds/posts/summary/-/${labelToURL(label)}?alt=json&max-results=100`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const entries = data.feed.entry || [];
    return entries.map(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === 'alternate').href;
      return `<div class='waternime-item'><div class='waternime-title'><a href='${link}'>${title}</a></div></div>`;
    }).join('');
  } catch {
    return '';
  }
}

async function generateList() {
  const container = document.getElementById('anime-content');
  const results = await Promise.all(letters.map(label => fetchPosts(label)));

  results.forEach((html, i) => {
    if (html) {
      const label = letters[i];
      const section = `
        <div class='waternime-group'>
          <span class="anchor" id="${label}"></span>
          <div class='waternime-head'>${labelToTitle(label)}</div>
          ${html}
        </div>
      `;
      container.innerHTML += section;
    }
  });
}

generateList();
</script>
