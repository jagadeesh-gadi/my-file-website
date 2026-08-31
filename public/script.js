```javascript
/* =====================================================
   CONFIGURATION
===================================================== */

const ROOT_FOLDER = "/files";


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const container =
    document.getElementById("file-container");

const currentPathElement =
    document.getElementById("currentPath");

const homeButton =
    document.getElementById("homeButton");

const backButton =
    document.getElementById("backButton");

const searchInput =
    document.getElementById("searchInput");

const folderTitle =
    document.getElementById("folderTitle");

const folderDescription =
    document.getElementById("folderDescription");


/* =====================================================
   CODE VIEWER
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
   STATE
===================================================== */

let currentFolder = "";

let currentFileUrl = "";

let currentItems = [];


/* =====================================================
   ENCODE PATH
===================================================== */

function encodePath(path) {

    return path
        .split("/")
        .filter(Boolean)
        .map(part => encodeURIComponent(part))
        .join("/");

}


/* =====================================================
   FILE URL
===================================================== */

function getFileUrl(filePath) {

    return (
        ROOT_FOLDER +
        "/" +
        encodePath(filePath)
    );

}


/* =====================================================
   FILE ICON
===================================================== */

function getFileIcon(name, type) {

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
        case "hpp":
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
        case "gif":
            return "🖼️";

        case "zip":
            return "🗜️";

        case "exe":
        case "out":
            return "⚙️";

        default:
            return "📄";
    }

}


/* =====================================================
   FILE TYPE
===================================================== */

function getFileType(name, type) {

    if (type === "folder") {
        return "Folder";
    }

    if (!name.includes(".")) {
        return "File";
    }

    const extension =
        name.split(".").pop().toUpperCase();

    return extension + " File";

}


/* =====================================================
   FORMAT SIZE
===================================================== */

function formatSize(size) {

    if (
        size === undefined ||
        size === null ||
        size === 0
    ) {
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


    if (size < 1024 * 1024 * 1024) {

        return (
            (size / (1024 * 1024)).toFixed(1) +
            " MB"
        );

    }


    return (
        (size / (1024 * 1024 * 1024)).toFixed(2) +
        " GB"
    );

}


/* =====================================================
   CODE FILE
===================================================== */

function isCodeFile(name) {

    const extensions = [

        ".c",
        ".h",

        ".cpp",
        ".cc",
        ".hpp",

        ".java",

        ".py",

        ".js",

        ".html",

        ".css",

        ".json",

        ".txt",

        ".sh",

        ".bash"

    ];


    const lower =
        name.toLowerCase();


    return extensions.some(
        extension =>
            lower.endsWith(extension)
    );

}


/* =====================================================
   PDF
===================================================== */

function isPdf(name) {

    return name
        .toLowerCase()
        .endsWith(".pdf");

}


/* =====================================================
   OPEN FILE
===================================================== */

function openFile(item) {

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


    console.log(
        "Opening:",
        url
    );


    /* ---------------------------------------------
       CODE
    --------------------------------------------- */

    if (isCodeFile(item.name)) {

        openCodeFile(
            url,
            item.name
        );

        return;

    }


    /* ---------------------------------------------
       PDF
    --------------------------------------------- */

    if (isPdf(item.name)) {

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

        return;

    }


    /* ---------------------------------------------
       OTHER FILES
    --------------------------------------------- */

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   CODE VIEWER
===================================================== */

async function openCodeFile(
    url,
    fileName
) {

    currentFileUrl = url;


    codeFileName.textContent =
        fileName;


    codeContent.textContent =
        "Loading code...";


    codeViewer.classList.remove(
        "hidden"
    );


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
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
            "❌ Unable to load this file.";

    }

}


/* =====================================================
   CLOSE CODE VIEWER
===================================================== */

function closeViewer() {

    codeViewer.classList.add(
        "hidden"
    );


    codeContent.textContent = "";

    currentFileUrl = "";

}


/* =====================================================
   DOWNLOAD CODE
===================================================== */

if (downloadCode) {

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

}


/* =====================================================
   OPEN CODE NEW TAB
===================================================== */

if (openCodeNewTab) {

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

}


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (closeCode) {

    closeCode.addEventListener(
        "click",
        closeViewer
    );

}


/* =====================================================
   CLICK OUTSIDE VIEWER
===================================================== */

if (codeViewer) {

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

}


/* =====================================================
   ESC KEY
===================================================== */

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


/* =====================================================
   LOAD FOLDER
===================================================== */

async function loadFolder(
    folderPath = ""
) {

    currentFolder =
        folderPath
            .split("/")
            .filter(Boolean)
            .join("/");


    /* ---------------------------------------------
       SHOW LOADING
    --------------------------------------------- */

    container.innerHTML = `

        <div class="loading">

            <div class="loading-spinner"></div>

            <p>
                Loading files...
            </p>

        </div>

    `;


    /* ---------------------------------------------
       PATH
    --------------------------------------------- */

    currentPathElement.textContent =
        currentFolder
            ? "/" + currentFolder
            : "/";


    /* ---------------------------------------------
       TITLE
    --------------------------------------------- */

    if (currentFolder) {

        const parts =
            currentFolder
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


    /* ---------------------------------------------
       BACK BUTTON
    --------------------------------------------- */

    if (backButton) {

        if (currentFolder) {

            backButton.disabled = false;

            backButton.style.opacity = "1";

        } else {

            backButton.disabled = true;

            backButton.style.opacity = "0.5";

        }

    }


    /* ---------------------------------------------
       SEARCH RESET
    --------------------------------------------- */

    if (searchInput) {
        searchInput.value = "";
    }


    try {

        /* -----------------------------------------
           CREATE INDEX URL
        ----------------------------------------- */

        const encodedFolder =
            encodePath(
                currentFolder
            );


        const indexPath =
            currentFolder
                ? `${ROOT_FOLDER}/${encodedFolder}/index.json`
                : `${ROOT_FOLDER}/index.json`;


        console.log(
            "Loading index:",
            indexPath
        );


        /* -----------------------------------------
           FETCH ONLY SMALL JSON
        ----------------------------------------- */

        const response =
            await fetch(
                indexPath,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} - ${indexPath}`
            );

        }


        const items =
            await response.json();


        currentItems =
            Array.isArray(items)
                ? items
                : [];


        displayFiles(
            currentItems,
            currentFolder
        );


    } catch (error) {

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
                    ${escapeHtml(error.message)}
                </p>

                <br>

                <button
                    class="toolbar-button"
                    onclick="loadFolder('')"
                >
                    🏠 Home
                </button>

            </div>

        `;

    }

}


/* =====================================================
   DISPLAY FILES
===================================================== */

function displayFiles(
    items,
    folderPath
) {

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
                    There are no files here.
                </p>

            </div>

        `;

        return;

    }


    /* ---------------------------------------------
       SORT
       Folders first, then files
    --------------------------------------------- */

    const sortedItems =
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
                    aFolder !== bFolder
                ) {

                    return (
                        aFolder -
                        bFolder
                    );

                }


                return a.name
                    .toLowerCase()
                    .localeCompare(
                        b.name.toLowerCase()
                    );

            }
        );


    /* ---------------------------------------------
       CREATE CARDS
    --------------------------------------------- */

    sortedItems.forEach(
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
                                : isPdf(item.name)
                                    ? "Read PDF →"
                                    : isCodeFile(item.name)
                                        ? "View Code →"
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
                event => {

                    event.preventDefault();


                    /* -------------------------
                       FOLDER
                    ------------------------- */

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


                        return;

                    }


                    /* -------------------------
                       FILE
                    ------------------------- */

                    openFile(
                        item
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

if (searchInput) {

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

}


/* =====================================================
   HOME
===================================================== */

if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            loadFolder("");

        }
    );

}


/* =====================================================
   BACK
===================================================== */

if (backButton) {

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


            const parentPath =
                parts.join("/");


            loadFolder(
                parentPath
            );

        }
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(text);


    return div.innerHTML;

}


/* =====================================================
   START WEBSITE
===================================================== */

loadFolder("");
```
