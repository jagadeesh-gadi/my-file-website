const ROOT_FOLDER = "files";

/* =====================================================
MAIN ELEMENTS
===================================================== */

const container = document.getElementById("file-container");
const currentPathElement = document.getElementById("currentPath");

const homeButton = document.getElementById("homeButton");
const backButton = document.getElementById("backButton");

const searchInput = document.getElementById("searchInput");

const folderTitle = document.getElementById("folderTitle");
const folderDescription =
document.getElementById("folderDescription");

/* =====================================================
VIEWER ELEMENTS
Optional - script will NOT crash if missing
===================================================== */

const codeViewer =
document.getElementById("codeViewer");

const codeContent =
document.getElementById("codeContent");

const codeFileName =
document.getElementById("codeFileName");

const closeCode =
document.getElementById("closeCode");

const downloadCode =
document.getElementById("downloadCode");

const openCodeNewTab =
document.getElementById("openCodeNewTab");

/* =====================================================
VARIABLES
===================================================== */

let currentFolder = "";
let currentItems = [];
let currentFileUrl = "";

/* =====================================================
CACHE
===================================================== */

const folderCache = new Map();

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
INDEX URL
===================================================== */

function getIndexUrl(folder) {

//
const encodedFolder =
    encodePath(folder);

if (!encodedFolder) {

    return "/" +
        ROOT_FOLDER +
        "/index.json";
}

return "/" +
    ROOT_FOLDER +
    "/" +
    encodedFolder +
    "/index.json";
//

}

/* =====================================================
FILE URL
===================================================== */

function getFileUrl(folder, fileName) {

//
const fullPath =
    folder
        ? folder + "/" + fileName
        : fileName;

return "/" +
    ROOT_FOLDER +
    "/" +
    encodePath(fullPath);
//

}

/* =====================================================
FILE ICON
===================================================== */

function getIcon(name, type) {

//
if (type === "folder") {
    return "📁";
}

const lower =
    name.toLowerCase();

if (lower.endsWith(".c"))
    return "💻";

if (lower.endsWith(".h"))
    return "🔧";

if (
    lower.endsWith(".cpp") ||
    lower.endsWith(".cc")
)
    return "⚙️";

if (lower.endsWith(".java"))
    return "☕";

if (lower.endsWith(".py"))
    return "🐍";

if (lower.endsWith(".js"))
    return "🟨";

if (lower.endsWith(".html"))
    return "🌐";

if (lower.endsWith(".css"))
    return "🎨";

if (lower.endsWith(".json"))
    return "📋";

if (lower.endsWith(".pdf"))
    return "📕";

if (lower.endsWith(".txt"))
    return "📝";

if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp")
)
    return "🖼️";

if (lower.endsWith(".zip"))
    return "🗜️";

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

const index =
    name.lastIndexOf(".");

if (index === -1) {
    return "File";
}

return (
    name
        .substring(index + 1)
        .toUpperCase() +
    " File"
);
//

}

/* =====================================================
FILE SIZE
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

    return (
        (size / 1024).toFixed(1) +
        " KB"
    );
}

return (
    (size / (1024 * 1024)).toFixed(1) +
    " MB"
);
//

}

/* =====================================================
CODE FILE
===================================================== */

function isCodeFile(name) {

//
const lower =
    name.toLowerCase();

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

return extensions.some(
    ext => lower.endsWith(ext)
);
//

}

/* =====================================================
PDF FILE
===================================================== */

function isPdf(name) {

//
return name
    .toLowerCase()
    .endsWith(".pdf");
//

}

/* =====================================================
LOADING
===================================================== */

function showLoading() {

//
container.innerHTML = `

    <div class="loading">

        <div class="loading-spinner"></div>

        <p>
            Loading files...
        </p>

    </div>

`;
//

}

/* =====================================================
UPDATE HEADER
===================================================== */

function updateHeader(folder) {

//
if (currentPathElement) {

    currentPathElement.textContent =
        folder
            ? "/" + folder + "/"
            : "/";
}


if (!folder) {

    if (folderTitle) {

        folderTitle.textContent =
            "📁 Home";
    }

    if (folderDescription) {

        folderDescription.textContent =
            "Browse your files and folders";
    }

    if (backButton) {
        backButton.disabled = true;
    }

    return;
}


const parts =
    folder
        .split("/")
        .filter(Boolean);


if (folderTitle) {

    folderTitle.textContent =
        "📁 " +
        parts[parts.length - 1];
}


if (folderDescription) {

    folderDescription.textContent =
        "Browse files in this folder";
}


if (backButton) {
    backButton.disabled = false;
}
//

}

/* =====================================================
LOAD FOLDER
===================================================== */

async function loadFolder(folder = "") {

//
currentFolder =
    folder;


if (searchInput) {
    searchInput.value = "";
}


updateHeader(folder);


/* -----------------------------------------------
   CHECK CACHE FIRST
------------------------------------------------ */

if (folderCache.has(folder)) {

    currentItems =
        folderCache.get(folder);

    displayFiles(
        currentItems,
        folder
    );

    return;
}


/* -----------------------------------------------
   SHOW LOADING
------------------------------------------------ */

showLoading();


const url =
    getIndexUrl(folder);


console.log(
    "Loading folder:",
    url
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
            "HTTP " +
            response.status
        );
    }


    const data =
        await response.json();


    /* -------------------------------------------
       SAVE ONLY SMALL INDEX.JSON
       NOT THE WHOLE FILES FOLDER
    -------------------------------------------- */

    folderCache.set(
        folder,
        data
    );


    currentItems =
        data;


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
                ${escapeHtml(
                    error.message
                )}
            </p>

            <button
                class="retry-button"
                id="retryButton"
                type="button"
            >
                🔄 Retry
            </button>

        </div>

    `;


    const retryButton =
        document.getElementById(
            "retryButton"
        );


    if (retryButton) {

        retryButton.addEventListener(
            "click",
            () => {
                loadFolder(folder);
            }
        );
    }
}
//

}

/* =====================================================
DISPLAY FILES
===================================================== */

function displayFiles(
items,
folder
) {

//
container.innerHTML = "";


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
                No files found.
            </p>

        </div>

    `;

    return;
}


/* -----------------------------------------------
   FOLDERS FIRST
------------------------------------------------ */

const sorted =
    [...items].sort(
        (a, b) => {

            const aFolder =
                a.type === "folder"
                    ? 0
                    : 1;

            const bFolder =
                b.type === "folder"
                    ? 0
                    : 1;


            if (
                aFolder !==
                bFolder
            ) {

                return (
                    aFolder -
                    bFolder
                );
            }


            return a.name.localeCompare(
                b.name
            );
        }
    );


const fragment =
    document.createDocumentFragment();


sorted.forEach(
    item => {

        const type =
            item.type === "folder"
                ? "folder"
                : "file";


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "file-card" +
            (
                type === "folder"
                    ? " folder-card"
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


        const button =
            card.querySelector(
                ".open-button"
            );


        button.addEventListener(
            "click",
            () => {

                /* FOLDER */

                if (
                    type ===
                    "folder"
                ) {

                    const nextFolder =
                        folder
                            ? folder +
                              "/" +
                              item.name
                            : item.name;


                    loadFolder(
                        nextFolder
                    );


                    return;
                }


                /* FILE */

                openFile(item);

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


console.log(
    "Opening:",
    url
);


/* -----------------------------------------------
   CODE
------------------------------------------------ */

if (
    isCodeFile(
        item.name
    )
) {

    openCode(
        url,
        item.name
    );

    return;
}


/* -----------------------------------------------
   PDF
------------------------------------------------ */

if (
    isPdf(
        item.name
    )
) {

    window.open(
        url,
        "_blank"
    );

    return;
}


/* -----------------------------------------------
   OTHER FILE
------------------------------------------------ */

window.open(
    url,
    "_blank"
);
//

}

/* =====================================================
OPEN CODE
===================================================== */

async function openCode(
url,
fileName
) {

//
/*
   IMPORTANT:

   If viewer HTML is not present,
   simply open the code in a new tab.

   This prevents:
   "codeFileName is null"
*/

if (
    !codeViewer ||
    !codeContent ||
    !codeFileName
) {

    window.open(
        url,
        "_blank"
    );

    return;
}


currentFileUrl =
    url;


codeFileName.textContent =
    fileName;


codeContent.textContent =
    "Loading code...";


codeViewer.classList.remove(
    "hidden"
);


try {

    const response =
        await fetch(
            url,
            {
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


    const text =
        await response.text();


    codeContent.textContent =
        text;


} catch (error) {

    console.error(
        "Code loading error:",
        error
    );


    codeContent.textContent =
        "Unable to load this code file.";
}
//

}

/* =====================================================
CLOSE CODE VIEWER
===================================================== */

function closeViewer() {

//
if (!codeViewer) {
    return;
}


codeViewer.classList.add(
    "hidden"
);


if (codeContent) {

    codeContent.textContent =
        "";
}


currentFileUrl =
    "";
//

}

/* =====================================================
DOWNLOAD
===================================================== */

if (downloadCode) {

//
downloadCode.addEventListener(
    "click",
    () => {

        if (!currentFileUrl) {
            return;
        }


        const link =
            document.createElement(
                "a"
            );


        link.href =
            currentFileUrl;


        link.download =
            codeFileName
                ? codeFileName.textContent
                : "download";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();
    }
);
//

}

/* =====================================================
OPEN CODE NEW TAB
===================================================== */

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

/* =====================================================
CLOSE CODE BUTTON
===================================================== */

if (closeCode) {

//
closeCode.addEventListener(
    "click",
    closeViewer
);
//

}

/* =====================================================
CLICK OUTSIDE VIEWER
===================================================== */

if (codeViewer) {

//
codeViewer.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            codeViewer
        ) {

            closeViewer();
        }
    }
);
//

}

/* =====================================================
ESCAPE
===================================================== */

document.addEventListener(
"keydown",
event => {

//
    if (
        event.key ===
        "Escape"
    ) {

        closeViewer();
    }
}
//

);

/* =====================================================
HOME
===================================================== */

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

/* =====================================================
BACK
===================================================== */

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


        const parent =
            parts.join("/");


        loadFolder(
            parent
        );
    }
);
//

}

/* =====================================================
SEARCH
===================================================== */

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
                        .includes(
                            query
                        )
            );


        displayFiles(
            filtered,
            currentFolder
        );
    }
);
//

}

/* =====================================================
ESCAPE HTML
===================================================== */

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

/* =====================================================
START
===================================================== */

loadFolder("");
