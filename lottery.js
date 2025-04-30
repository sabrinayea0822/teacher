
let poems = [];

async function loadPoems() {
  try {
    const res = await fetch("data/poems.json");
    if (!res.ok) throw new Error("Failed to load poems.json");
    poems = await res.json();
  } catch (error) {
    console.error("Error loading poems:", error);
  }
}
loadPoems();

const drawBtn = document.getElementById("drawBtn");
const output = document.getElementById("output");

function showAnimation(callback) {
  const frames = ["frames/frame1.png", "frames/frame2.png", "frames/frame3.png", "frames/frame4.png"];
  const img = document.getElementById("animation");
  let count = 0;
  const interval = setInterval(() => {
    img.src = frames[count % frames.length];
    count++;
    if (count > 10) {
      clearInterval(interval);
      callback();
    }
  }, 100);
}

function draw() {
  output.innerHTML = "";
  showAnimation(() => {
    if (poems.length === 0) {
      output.innerHTML = "❌ 籤詩尚未載入完成，請稍後再試。";
      return;
    }

    const number = Math.floor(Math.random() * poems.length) + 1;
    const poem = poems[number - 1];

    const poemHTML = `
      <h2>${poem.title}【${poem.luck}】</h2>
      <p><strong>📜 籤詩：</strong>${poem.main}</p>
      <p><strong>📘 解說：</strong>${poem.explanation}</p>
      <p><strong>🔍 卜問事項：</strong>${poem.topics.join("・")}</p>
    `;
    output.innerHTML = poemHTML;

    const img = new Image();
    const exts = ["jpg", "JPG", "png"];
    let found = false;

    for (let ext of exts) {
      const path = `data/投影片${number}.${ext}`;
      const testImg = new Image();
      testImg.onload = () => {
        if (!found) {
          img.src = path;
          img.style.maxWidth = "300px";
          output.appendChild(img);
          found = true;
        }
      };
      testImg.src = path;
    }
  });
}

drawBtn.addEventListener("click", draw);
