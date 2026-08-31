const ROOT_FOLDER = "files";

const container = document.getElementById("file-container");
const currentPathElement = document.getElementById("currentPath");
const homeButton = document.getElementById("homeButton");
const backButton = document.getElementById("backButton");
const searchInput = document.getElementById("searchInput");
const folderTitle = document.getElementById("folderTitle");
const folderDescription = document.getElementById("folderDescription");

const codeViewer = document.getElementById("codeViewer");
const codeContent = document.getElementById("codeContent");
const codeFileName = document.getElementById("codeFileName");
const closeCode = document.getElementById("closeCode");
const downloadCode = document.getElementById("downloadCode");
const openCodeNewTab = document.getElementById("openCodeNewTab");

let currentFolder = "";
let currentItems = [];
let currentFileUrl = "";

const cache = new Map();

function encodePath(path) {

//
return path
    .split("/")
    .filter(Boolean)
    .map(part => encodeURIComponent(part))
    .join("/");
//

}

function getIndexUrl(folder) {

//
const encoded = encodePath(folder);

if (encoded) {
    return "/" + ROOT_FOLDER + "/" + encoded + "/index.json";
}

return "/" + ROOT_FOLDER + "/index.json";
//

}

function getFileUrl(folder, name) {

//
const path = folder
    ? folder + "/" + name
    : name;

return "/" + ROOT_FOLDER + "/" + encodePath(path);
//

}

function getIcon(name, type) {

//
if (type === "folder") {
    return "📁";
}

const lower = name.toLowerCase();

if (lower.endsWith(".c")) return "💻";
if (lower.endsWith(".h")) return "🔧";
if (lower.endsWith(".cpp")) return "⚙️";
if (lower.endsWith(".cc")) return "⚙️";
if (lower.endsWith(".java")) return "☕";
if (lower.endsWith(".py")) return "🐍";
if (lower.endsWith(".js")) return "🟨";
if (lower.endsWith(".html")) return "🌐";
if (lower.endsWith(".css")) return "🎨";
if (lower.endsWith(".pdf")) return "📕";
if (lower.endsWith(".txt")) return "📝";
if (lower.endsWith(".json")) return "📋";
if (lower.endsWith(".png")) return "🖼️";
if (lower.endsWith(".jpg")) return "🖼️";
if (lower.endsWith(".jpeg")) return "🖼️";
if (lower.endsWith(".webp")) return "🖼️";
if (lower.endsWith(".zip")) return "🗜️";

return "📄";
//

}

function getType(name, type) {

//
if (type === "folder") {
    return "Folder";
}

const parts = name.split(".");

if (parts.length === 1) {
    return "File";
}

return parts.pop().toUpperCase() + " File";
//

}

function formatSize(size) {

//
if (!size) {
    return "";
}

if (size < 1024) {
    return size + " B";
}

if (size < 1024 * 1024) {
    return (size / 1024).toFixed(1) + " KB";
}

return (size / (1024 * 1024)).toFixed(1) + " MB";
//

}

function isCodeFile(name) {

//
const lower = name.toLowerCase();

return (
    lower.endsWith(".c") ||
    lower.endsWith(".h") ||
    lower.endsWith(".cpp") ||
    lower.endsWith(".cc") ||
    lower.endsWith(".java") ||
    lower.endsWith(".py") ||
    lower.endsWith(".js") ||
    lower.endsWith(".html") ||
    lower.endsWith(".css") ||
    lower.endsWith(".json") ||
    lower.endsWith(".txt") ||
    lower.endsWith(".sh")
);
//

}

function isPdf(name) {

//
return name
    .toLowerCase()
    .endsWith(".pdf");
//

}

function showLoading() {

//
container.innerHTML = `
    <div class="loading">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    </div>
`;
//

}

async function loadFolder(folder = "") {

//
currentFolder = folder;

if (searchInput) {
    searchInput.value = "";
}

updateHeader(folder);

if (cache.has(folder)) {

    currentItems = cache.get(folder);

    displayFiles(
        currentItems,
        folder
    );

    return;
}

showLoading();

const url = getIndexUrl(folder);

console.log("Loading:", url);

try {

    const response = await fetch(
        url,
        {
            cache: "force-cache"
        }
    );

    if (!response.ok) {

        throw new Error(
            "HTTP " + response.status
        );

    }

    const data = await response.json();

    cache.set(
        folder,
        data
    );

    currentItems = data;

    displayFiles(
        data,
        folder
    );

} catch (error) {

    console.error(
        "Folder loading error:",
        error
    );

    container.innerHTML = `
        <div class="empty-message">

            <div class="empty-icon">
                ⚠️
            </div>

            <h3>
                Unable to load folder
            </h3>

            <p>
                ${escapeHtml(error.message)}
            </p>

            <button
                class="retry-button"
                type="button"
                id="retryButton"
            >
                🔄 Retry
            </button>

        </div>
    `;

    const retryButton =
        document.getElementById("retryButton");

    if (retryButton) {

        retryButton.addEventListener(
            "click",
            () => loadFolder(folder)
        );

    }

}
//

}

function updateHeader(folder) {

//
currentPathElement.textContent =
    folder
        ? "/" + folder + "/"
        : "/";

if (!folder) {

    folderTitle.textContent =
        "📁 Home";

    folderDescription.textContent =
        "Browse your files and folders";

    backButton.disabled = true;

    return;

}

const parts =
    folder
        .split("/")
        .filter(Boolean);

folderTitle.textContent =
    "📁 " + parts[parts.length - 1];

folderDescription.textContent =
    "Browse files in this folder";

backButton.disabled = false;
//

}

function displayFiles(items, folder) {

//
container.innerHTML = "";

if (!items || items.length === 0) {

    container.innerHTML = `
        <div class="empty-message">

            <div class="empty-icon">
                📂
            </div>

            <h3>
                Empty folder
            </h3>

            <p>
                No files found.
            </p>

        </div>
    `;

    return;

}

const fragment =
    document.createDocumentFragment();

const sorted =
    [...items].sort((a, b) => {

        const folderA =
            a.type === "folder" ? 0 : 1;

        const folderB =
            b.type === "folder" ? 0 : 1;

        if (folderA !== folderB) {
            return folderA - folderB;
        }

        return a.name.localeCompare(
            b.name
        );

    });

sorted.forEach(item => {

    const type =
        item.type === "folder"
            ? "folder"
            : "file";

    const card =
        document.createElement("div");

    card.className =
        "file-card " +
        (
            type === "folder"
                ? "folder-card"
                : ""
        );

    const icon =
        getIcon(
            item.name,
            type
        );

    const fileType =
        getType(
            item.name,
            type
        );

    const size =
        formatSize(
            item.size
        );

    card.innerHTML = `
        <div class="card-top">

            <div class="file-icon">
                ${icon}
            </div>

            <div class="file-info">

                <div class="file-name">
                    ${escapeHtml(item.name)}
                </div>

                <div class="file-type">
                    ${fileType}
                </div>

            </div>

        </div>

        <div class="card-bottom">

            <span class="file-size">
                ${size}
            </span>

            <button
                class="open-button"
                type="button"
            >
                ${
                    type === "folder"
                        ? "Open →"
                        : "Open ↗"
                }
            </button>

        </div>
    `;

    const button =
        card.querySelector(
            ".open-button"
        );

    button.addEventListener(
        "click",
        () => {

            if (type === "folder") {

                const nextFolder =
                    folder
                        ? folder + "/" + item.name
                        : item.name;

                loadFolder(
                    nextFolder
                );

            } else {

                openFile(item);

            }

        }
    );

    fragment.appendChild(card);

});

container.appendChild(fragment);
//

}

function openFile(item) {

//
const url =
    getFileUrl(
        currentFolder,
        item.name
    );

if (isCodeFile(item.name)) {

    openCode(
        url,
        item.name
    );

    return;

}

window.open(
    url,
    "_blank"
);
//

}

async function openCode(
url,
fileName
) {

//
currentFileUrl = url;

codeFileName.textContent =
    fileName;

codeContent.textContent =
    "Loading...";

codeViewer.classList.remove(
    "hidden"
);

try {

    const response =
        await fetch(
            url,
            {
                cache: "force-cache"
            }
        );

    if (!response.ok) {

        throw new Error(
            "HTTP " + response.status
        );

    }

    const text =
        await response.text();

    codeContent.textContent =
        text;

} catch (error) {

    console.error(error);

    codeContent.textContent =
        "Unable to load code file.";

}
//

}

function closeViewer() {

//
codeViewer.classList.add(
    "hidden"
);

codeContent.textContent = "";

currentFileUrl = "";
//

}

if (downloadCode) {

//
downloadCode.addEventListener(
    "click",
    () => {

        if (!currentFileUrl) {
            return;
        }

        const link =
            document.createElement("a");

        link.href =
            currentFileUrl;

        link.download =
            codeFileName.textContent;

        document.body.appendChild(link);

        link.click();

        link.remove();

    }
);
//

}

if (openCodeNewTab) {

//
openCodeNewTab.addEventListener(
    "click",
    () => {

        if (!currentFileUrl) {
            return;
        }

        window.open(
            currentFileUrl,
            "_blank"
        );

    }
);
//

}

if (closeCode) {

//
closeCode.addEventListener(
    "click",
    closeViewer
);
//

}

if (codeViewer) {

//
codeViewer.addEventListener(
    "click",
    event => {

        if (
            event.target === codeViewer
        ) {

            closeViewer();

        }

    }
);
//

}

document.addEventListener(
"keydown",
event => {

//
    if (
        event.key === "Escape"
    ) {

        closeViewer();

    }

}
//

);

if (homeButton) {

//
homeButton.addEventListener(
    "click",
    () => {

        loadFolder("");

    }
);
//

}

if (backButton) {

//
backButton.addEventListener(
    "click",
    () => {

        if (!currentFolder) {
            return;
        }

        const parts =
            currentFolder
                .split("/")
                .filter(Boolean);

        parts.pop();

        loadFolder(
            parts.join("/")
        );

    }
);
//

}

if (searchInput) {

//
searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        if (!query) {

            displayFiles(
                currentItems,
                currentFolder
            );

            return;

        }

        const filtered =
            currentItems.filter(
                item =>
                    item.name
                        .toLowerCase()
                        .includes(query)
            );

        displayFiles(
            filtered,
            currentFolder
        );

    }
);
//

}

function escapeHtml(text) {

//
const div =
    document.createElement("div");

div.textContent =
    text;

return div.innerHTML;
//

}

loadFolder("");
