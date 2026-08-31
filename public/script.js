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
let currentFileUrl = "";
let currentItems = [];
let folderRequest = null;

const folderCache = new Map();

function encodePath(path) {

//
return path
    .split("/")
    .filter(Boolean)
    .map(part => encodeURIComponent(part))
    .join("/");
//

}

function getFileUrl(filePath) {

//
return "/" +
    ROOT_FOLDER +
    "/" +
    encodePath(filePath);
//

}

function getFileIcon(name, type) {

//
if (type === "folder") {
    return "📁";
}

const extension =
    name.includes(".")
        ? name.split(".").pop().toLowerCase()
        : "";

switch (extension) {

    case "c":
        return "💻";

    case "h":
        return "🔧";

    case "cpp":
    case "cc":
        return "⚙️";

    case "java":
        return "☕";

    case "py":
        return "🐍";

    case "js":
        return "🟨";

    case "html":
        return "🌐";

    case "css":
        return "🎨";

    case "json":
        return "📋";

    case "pdf":
        return "📕";

    case "txt":
        return "📝";

    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
        return "🖼️";

    case "zip":
        return "🗜️";

    default:
        return "📄";
}
//

}

function getFileType(name, type) {

//
if (type === "folder") {
    return "Folder";
}

const extension =
    name.includes(".")
        ? name.split(".").pop().toUpperCase()
        : "FILE";

return extension + " File";
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
const extensions = [
    ".c",
    ".h",
    ".cpp",
    ".cc",
    ".java",
    ".py",
    ".js",
    ".html",
    ".css",
    ".json",
    ".txt",
    ".sh"
];

const lowerName =
    name.toLowerCase();

return extensions.some(
    ext => lowerName.endsWith(ext)
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

function openFile(item) {

//
const filePath =
    item.path ||
    item.url ||
    (
        currentFolder
            ? currentFolder + "/" + item.name
            : item.name
    );

const url =
    getFileUrl(filePath);


if (isCodeFile(item.name)) {

    openCodeFile(
        url,
        item.name
    );

    return;
}


if (isPdf(item.name)) {

    window.open(
        url,
        "_blank",
        "noopener"
    );

    return;
}


window.open(
    url,
    "_blank",
    "noopener"
);
//

}

async function openCodeFile(
url,
fileName
) {

//
codeFileName.textContent =
    fileName;

codeContent.textContent =
    "Loading...";

codeViewer.classList.remove(
    "hidden"
);

currentFileUrl =
    url;


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

    console.error(error);

    codeContent.textContent =
        "Unable to load this file.";
}
//

}

function closeViewer() {

//
codeViewer.classList.add(
    "hidden"
);

codeContent.textContent = "";
//

}

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


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();
}
//

);

openCodeNewTab.addEventListener(
"click",
() => {


    if (!currentFileUrl) {
        return;
    }


    window.open(
        currentFileUrl,
        "_blank",
        "noopener"
    );
}


);

closeCode.addEventListener(
"click",
closeViewer
);

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

document.addEventListener(
"keydown",
event => {


    if (
        event.key === "Escape"
    ) {

        closeViewer();
    }
}


);

async function loadFolder(
folderPath = ""
) {

//
currentFolder =
    folderPath;


searchInput.value =
    "";


updateFolderHeader(
    folderPath
);


if (
    folderCache.has(
        folderPath
    )
) {

    const cached =
        folderCache.get(
            folderPath
        );


    currentItems =
        cached;


    displayFiles(
        cached,
        folderPath
    );


    return;
}


showLoading();


if (folderRequest) {

    folderRequest.abort();
}


folderRequest =
    new AbortController();


const encodedFolder =
    encodePath(
        folderPath
    );


const indexPath =
    ROOT_FOLDER +
    "/" +
    (
        encodedFolder
            ? encodedFolder + "/"
            : ""
    ) +
    "index.json";


try {

    const response =
        await fetch(
            indexPath,
            {
                signal:
                    folderRequest.signal,

                cache:
                    "force-cache"
            }
        );


    if (!response.ok) {

        throw new Error(
            "HTTP " +
            response.status
        );
    }


    const items =
        await response.json();


    folderCache.set(
        folderPath,
        items
    );


    currentItems =
        items;


    displayFiles(
        items,
        folderPath
    );


} catch (error) {

    if (
        error.name ===
        "AbortError"
    ) {

        return;
    }


    console.error(
        "Unable to load folder:",
        error
    );


    container.innerHTML = `
        <div class="empty-message">

            <div class="empty-icon">
                ⚠️
            </div>

            <h3>
                Unable to load this folder
            </h3>

            <p>
                Please try again.
            </p>

            <button
                class="retry-button"
                type="button"
                onclick="loadFolder()"
            >
                🔄 Retry
            </button>

        </div>
    `;
}
//

}

function updateFolderHeader(
folderPath
) {

//
currentPathElement.textContent =
    "/" + folderPath;


if (folderPath) {

    const parts =
        folderPath
            .split("/")
            .filter(Boolean);


    folderTitle.textContent =
        "📁 " +
        parts[parts.length - 1];


    folderDescription.textContent =
        "Browse files in this folder";


} else {

    folderTitle.textContent =
        "📁 Home";


    folderDescription.textContent =
        "Browse your files and folders";
}
//

}

function displayFiles(
items,
folderPath
) {

//
container.innerHTML =
    "";


if (
    !items ||
    items.length === 0
) {

    container.innerHTML = `
        <div class="empty-message">

            <div class="empty-icon">
                📂
            </div>

            <h3>
                Empty folder
            </h3>

            <p>
                There are no files here.
            </p>

        </div>
    `;

    return;
}


const fragment =
    document.createDocumentFragment();


items.forEach(
    item => {

        const type =
            item.type ||
            (
                item.children
                    ? "folder"
                    : "file"
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "file-card " +
            (
                type === "folder"
                    ? "folder-card"
                    : ""
            );


        const icon =
            getFileIcon(
                item.name,
                type
            );


        const fileType =
            getFileType(
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
                        ${escapeHtml(
                            item.name
                        )}
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


        const openButton =
            card.querySelector(
                ".open-button"
            );


        openButton.addEventListener(
            "click",
            () => {

                if (
                    type === "folder"
                ) {

                    const newPath =
                        folderPath
                            ? folderPath +
                              "/" +
                              item.name
                            : item.name;


                    loadFolder(
                        newPath
                    );


                } else {

                    openFile(
                        item
                    );
                }
            }
        );


        fragment.appendChild(
            card
        );
    }
);


container.appendChild(
    fragment
);
//

}

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
                    .includes(
                        query
                    )
        );


    displayFiles(
        filtered,
        currentFolder
    );
}
//

);

homeButton.addEventListener(
"click",
() => {

//
    loadFolder("");
}
//

);

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


    const parentPath =
        parts.join("/");


    loadFolder(
        parentPath
    );
}
//

);

function escapeHtml(text) {

//
const div =
    document.createElement(
        "div"
    );


div.textContent =
    text;


return div.innerHTML;
//

}

loadFolder("");

//
//
