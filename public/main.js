let values = {
  title: "default title",
  subtitle: "default subtitle",
  fontSize: 12,
};

const resultImg = document.getElementById("result-image");
const resultURL = document.getElementById("result-url");
const copyButton = document.getElementById("copy-button");
const loader = document.querySelector(".loader");

function main() {
  const ogTitle = document.getElementById("og-title");
  const ogSubtitle = document.getElementById("og-subtitle");
  const ogFontSize = document.getElementById("og-font-size");

  ogTitle.addEventListener("change", onTitleChange);
  ogSubtitle.addEventListener("change", onSubtitleChange);
  ogFontSize.addEventListener("change", onFontSizeChange);
  copyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await copy(generateURL());
  });

  resultImg.addEventListener("load", function (e) {
    loader.classList.remove("show");
  });
}

function onTitleChange(e) {
  values.title = e.target.value;
  updateImage();
}

function onSubtitleChange(e) {
  values.subtitle = e.target.value;
  updateImage();
}

function onFontSizeChange(e) {
  values.fontSize = e.target.value;
  updateImage();
}

function generateURL() {
  const url = `${window.location.origin}/api`;
  const params = new URLSearchParams();
  if (values.fontSize) {
    params.append("fontSize", values.fontSize);
  }
  if (values.title) {
    params.append("title", values.title);
  }
  if (values.subtitle) {
    params.append("subtitle", values.subtitle);
  }

  return `${url}?${params.toString()}`;
}

function updateImage() {
  loader.classList.add("show");
  const imageUrl = generateURL();
  resultImg.src = imageUrl;
  resultURL.innerHTML = imageUrl;
}

async function copy(text) {
  if (!navigator.clipboard) {
    return _copyDeprecated(text);
  }
  await navigator.clipboard.writeText(text);
}

function _copyDeprecated(text) {
  var copyTextarea = document.createElement("textarea");
  copyTextarea.style.position = "fixed";
  copyTextarea.style.opacity = "0";
  copyTextarea.textContent = text;

  document.body.appendChild(copyTextarea);
  copyTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(copyTextarea);
}

main();
updateImage();
