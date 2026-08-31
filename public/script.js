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

/* =====================================================
ENCODE PATH
===================================================== */

function encodePath(path) {

//
return path
    .split("/")
    .filter(Boolean)
    .map(part => encodeURIComponent(part))
    .join("/");
//

}

/* =====================================================
GET INDEX URL
===================================================== */

function getIndexUrl(folder) {

//
const encoded = encodePath(folder);

if (encoded) {
    return "/" + ROOT_FOLDER + "/" + encoded + "/index.json";
}

return "/" + ROOT_FOLDER + "/index.json";
//

}

/* =====================================================
GET FILE URL
===================================================== */

function getFileUrl(folder, name) {

//
const path = folder
    ? folder + "/" + name
    : name;

return "/" + ROOT_FOLDER + "/" + encodePath(path);
//

}

/* =====================================================
ICON
===================================================== */

function getIcon(name, type) {

//
if (type === "folder") {
    return "📁";
}

const lower = name.toLowerCase();

if (lower.endsWith(".c")) return "💻";
if (lower.endsWith(".h")) return "🔧";
if (lower.endsWith(".cpp")) return "⚙️";
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
if (lower.endsWith(".zip")) return "🗜️";

return "📄";
//

}

/* =====================================================
FILE TYPE
===================================================== */

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

/* =====================================================
SIZE
===================================================== */

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

/* =====================================================
CODE FILE?
===================================================== */

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

/* =====================================================
PDF?
===================================================== */

function isPdf(name) {

//
return name.toLowerCase().endsWith(".pdf");
//

}

/* =====================================================
LOAD FOLDER
===================================================== */

async function loadFolder(folder = "") {

//
currentFolder = folder;

searchInput.value = "";

updateHeader(folder);

/* CACHE */

if (cache.has(folder)) {

    currentItems = cache.get(folder);

    displayFiles(
        currentItems,
        folder
    );

    return;
}


/* LOADING */

container.innerHTML = `
    <div class="loading">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    </div>
`;


const url = getIndexUrl(folder);

console.log("Loading:", url);


try {

    const response = await fetch(url, {
        cache: "default"
    });


    if (!response.ok) {

        throw new Error(
            "HTTP " + response.status
        );
    }


    const data = await response.json();


    cache.set(folder, data);

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
                ${error.message}
            </p>

            <button
                class="retry-button"
                type="button"
                onclick="loadFolder(currentFolder)">
                🔄 Retry
            </button>

        </div>
    `;
}
//

}

/* =====================================================
HEADER
===================================================== */

function updateHeader(folder) {

//
currentPathElement.textContent =
    "/" + folder;


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

/* =====================================================
DISPLAY FILES
===================================================== */

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


/* FOLDERS FIRST */

const sorted =
    [...items].sort((a, b) => {

        const typeA =
            a.type === "folder" ? 0 : 1;

        const typeB =
            b.type === "folder" ? 0 : 1;

        if (typeA !== typeB) {
            return typeA - typeB;
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
                type="button">

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

/* =====================================================
OPEN FILE
===================================================== */

function openFile(item) {

//
const url =
    getFileUrl(
        currentFolder,
        item.name
    );


/* CODE */

if (isCodeFile(item.name)) {

    openCode(
        url,
        item.name
    );

    return;
}


/* PDF */

if (isPdf(item.name)) {

    window.open(
        url,
        "_blank"
    );

    return;
}


/* OTHER FILE */

window.open(
    url,
    "_blank"
);
//

}

/* =====================================================
CODE VIEWER
===================================================== */

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
        await fetch(url);


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

    codeContent.textContent =
        "Unable to load code file.";


    console.error(error);
}
//

}

/* =====================================================
CLOSE VIEWER
===================================================== */

function closeViewer() {

//
codeViewer.classList.add(
    "hidden"
);

codeContent.textContent = "";

currentFileUrl = "";
//

}

/* =====================================================
DOWNLOAD
===================================================== */

downloadCode.addEventListener(
"click",
() => {

//
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
//

);

/* =====================================================
NEW TAB
===================================================== */

openCodeNewTab.addEventListener(
"click",
() => {

//
    if (!currentFileUrl) {
        return;
    }


    window.open(
        currentFileUrl,
        "_blank"
    );
}
//

);

/* =====================================================
CLOSE BUTTON
===================================================== */

closeCode.addEventListener(
"click",
closeViewer
);

/* =====================================================
CLICK OUTSIDE
===================================================== */

codeViewer.addEventListener(
"click",
event => {

//
    if (
        event.target === codeViewer
    ) {
        closeViewer();
    }
}
//

);

/* =====================================================
ESC
===================================================== */

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

/* =====================================================
HOME
===================================================== */

homeButton.addEventListener(
"click",
() => {

//
    loadFolder("");
}
//

);

/* =====================================================
BACK
===================================================== */

backButton.addEventListener(
"click",
() => {

//
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
//

);

/* =====================================================
SEARCH
===================================================== */

searchInput.addEventListener(
"input",
() => {

//
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
//

);

/* =====================================================
ESCAPE HTML
===================================================== */

function escapeHtml(text) {

//
const div =
    document.createElement("div");

div.textContent =
    text;

return div.innerHTML;
//

}

/* =====================================================
START
===================================================== */

loadFolder("");
