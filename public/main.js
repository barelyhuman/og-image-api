let values = {
  title: "Post Title",
  subtitle: "Reaper",
  fontSize: 14,
  fontSizeTwo: 8,
  color: "#000",
  backgroundImageURL: "",
  backgroundColor: "",
};

const resultImgContainer = document.getElementById("result-image");
const resultURLCodeContainer = document.getElementById("result-url");
const copyButton = document.getElementById("copy-button");
const loader = document.querySelector(".loader");

function main() {
  const ogTitle = document.getElementById("og-title");
  const ogSubtitle = document.getElementById("og-subtitle");
  const ogFontSize = document.getElementById("og-font-size");
  const ogFontSizeTwo = document.getElementById("og-font-size-two");
  const ogFontColor = document.getElementById("og-font-color");
  const ogBgUrl = document.getElementById("og-bg-url");
  const ogBgColor = document.getElementById("og-bg-color");

  // init

  ogTitle.value = values.title;
  ogSubtitle.value = values.subtitle;
  ogFontSize.value = values.fontSize;
  ogFontSizeTwo.value = values.fontSizeTwo;
  ogFontColor.value = values.color;
  ogBgUrl.value = values.backgroundImageURL;
  ogBgColor.value = values.backgroundColor;

  // init end

  ogTitle.addEventListener("change", (e) => onKeyChange(e, "title"));
  ogSubtitle.addEventListener("change", (e) => onKeyChange(e, "subtitle"));
  ogFontSize.addEventListener("change", (e) => onKeyChange(e, "fontSize"));
  ogFontSizeTwo.addEventListener(
    "change",
    (e) => onKeyChange(e, "fontSizeTwo"),
  );
  ogFontColor.addEventListener("change", (e) => onKeyChange(e, "color"));
  ogBgUrl.addEventListener(
    "change",
    (e) => onKeyChange(e, "backgroundImageURL"),
  );
  ogBgColor.addEventListener("change", (e) => {
    debugger;
    onKeyChange(e, "backgroundColor");
  });

  copyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    resultURLCodeContainer.innerHTML = "Copied!";
    await copy(generateURL());
    setTimeout(() => {
      updateImage();
    }, 1500);
  });

  resultImgContainer.addEventListener("load", function (e) {
    loader.classList.remove("show");
  });
}

function onKeyChange(e, key) {
  values[key] = e.target.value;
  updateImage();
}

function generateURL() {
  const url = `${window.location.origin}/generate`;
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

  if (values.fontSizeTwo) {
    params.append("fontSizeTwo", values.fontSizeTwo);
  }

  if (values.color) {
    params.append("color", values.color);
  }

  if (values.backgroundImageURL) {
    params.append("backgroundImageURL", values.backgroundImageURL);
  }

  if (values.backgroundColor) {
    params.append("backgroundColor", values.backgroundColor);
  }

  return `${url}?${params.toString()}`;
}

function updateImage() {
  loader.classList.add("show");
  const imageUrl = generateURL();
  resultImgContainer.src = imageUrl;
  resultURLCodeContainer.innerHTML = imageUrl;
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
