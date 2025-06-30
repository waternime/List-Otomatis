const letters = ['num', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const blogURL = 'https://yuretsuki.blogspot.com/'; // Ganti ke URL blog kamu

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