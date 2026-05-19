let currentStep = 0;
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
