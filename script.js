let gameData = null;
let currentScenario = null;
let currentChapter = null;
let currentSceneIndex = 0;

const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const scenarioList = document.getElementById('scenario-list');

// Tải dữ liệu từ JSON
fetch('story.json')
    .then(res => res.json())
    .then(data => {
        gameData = data;
        renderMenu();
    });

function renderMenu() {
    menuScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    scenarioList.innerHTML = '';

    gameData.scenarios.forEach(scen => {
        let div = document.createElement('div');
        div.className = 'scenario-item';
        div.innerHTML = `<h3>${scen.title}</h3>`;
        
        scen.chapters.forEach(chap => {
            let btn = document.createElement('button');
            btn.innerText = chap.title;
            btn.onclick = () => startChapter(scen.id, chap.id);
            div.appendChild(btn);
        });
        scenarioList.appendChild(div);
    });
}

function startChapter(scenId, chapId) {
    currentScenario = gameData.scenarios.find(s => s.id === scenId);
    currentChapter = currentScenario.chapters.find(c => c.id === chapId);
    currentSceneIndex = 0;
    
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    updateScene();
}

function updateScene() {
    const scene = currentChapter.scenes[currentSceneIndex];
    document.getElementById('name-tag').innerText = scene.name;
    document.getElementById('text-content').innerText = scene.text;
    document.getElementById('background').style.backgroundImage = `url('assets/${scene.bg}')`;
    
    const charImg = document.getElementById('character');
    if (scene.char) {
        charImg.src = `assets/${scene.char}`;
        charImg.style.display = 'block';
    } else {
        charImg.style.display = 'none';
    }
}

document.getElementById('dialogue-box').onclick = () => {
    if (currentSceneIndex < currentChapter.scenes.length - 1) {
        currentSceneIndex++;
        updateScene();
    } else {
        alert("Hết chương. Quay lại menu.");
        renderMenu();
    }
};

document.getElementById('back-to-menu').onclick = renderMenu;let currentStep = 0;
let storyData = [];

fetch('story.json')
    .then(response => response.json())
    .then(data => {
        storyData = data;
        updateScene();
    });

document.getElementById('dialogue-box').addEventListener('click', () => {
    if (currentStep < storyData.length - 1) {
        currentStep++;
        updateScene();
    }
});

function updateScene() {
    const scene = storyData[currentStep];
    document.getElementById('name-tag').innerText = scene.name;
    document.getElementById('text-content').innerText = scene.text;
    document.getElementById('background').style.backgroundImage = `url('${scene.bg}')`;
    const charImg = document.getElementById('character');
    if (scene.char) {
        charImg.src = scene.char;
        charImg.style.opacity = 1;
    } else {
        charImg.style.opacity = 0;
    }
}
