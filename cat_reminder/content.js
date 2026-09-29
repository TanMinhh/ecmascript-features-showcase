const sleepImageUrl = chrome.runtime.getURL('sleeping_cat.png');
const awakeImageUrl = chrome.runtime.getURL('awake_cat.png');

const cornerCat = document.createElement('div');
cornerCat.style.position = 'fixed';
cornerCat.style.bottom = '20px';
cornerCat.style.right = '20px';
cornerCat.style.width = '64px';
cornerCat.style.height = '64px';
cornerCat.style.backgroundImage = `url(${sleepImageUrl})`;
cornerCat.style.backgroundSize = 'contain';
cornerCat.style.backgroundRepeat = 'no-repeat';
cornerCat.style.zIndex = '9998';
document.body.appendChild(cornerCat);

const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.flexDirection = 'column';
overlay.style.zIndex = '9999';

const centerCat = document.createElement('div');
centerCat.style.width = '250px';
centerCat.style.height = '250px';
centerCat.style.backgroundImage = `url(${awakeImageUrl})`;
centerCat.style.backgroundSize = 'contain';
centerCat.style.backgroundRepeat = 'no-repeat';

const text = document.createElement('div');
text.innerText = 'Time to drink water!';
text.style.color = '#fff';
text.style.fontSize = '30px';
text.style.fontWeight = 'bold';
text.style.marginTop = '20px';
text.style.fontFamily = 'sans-serif';

overlay.appendChild(centerCat);
overlay.appendChild(text);
document.body.appendChild(overlay);

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "showReminder") {
        overlay.style.display = 'flex';
    }
});