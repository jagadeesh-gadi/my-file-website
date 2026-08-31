const ROOT_FOLDER = "files";

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
   VIEWER ELEMENTS
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
        .map(part =>
            encodeURIComponent(part)
        )
        .join("/");

}


/* =====================================================
   FILE URL
===================================================== */

function getFileUrl(filePath) {

    return (
        "/" +
        ROOT_FOLDER +
        "/" +
        encodePath(filePath)
    );

}


/* =====================================================
   FILE ICON
===================================================== */

function getFileIcon(name, type) {

    const extension =
        name
            .split(".")
            .pop()
            .toLowerCase();


    if (type === "folder") {
        return "📁";
    }


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

}


/* =====================================================
   FILE TYPE
===================================================== */

function getFileType(name, type) {

    if (type === "folder") {
        return "Folder";
    }

    const extension =
        name
            .split(".")
            .pop()
            .toUpperCase();

    return extension + " File";
}


/* =====================================================
   FORMAT SIZE
===================================================== */

function formatSize(size) {

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

}


/* =====================================================
   IS CODE FILE
===================================================== */

function isCodeFile(name) {

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
        extension =>
            name.toLowerCase().endsWith(extension)
    );

}


/* =====================================================
   IS PDF
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
            "_blank"
        );

        return;
    }


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   OPEN CODE FILE
===================================================== */

async function openCodeFile(
    url,
    fileName
) {

    try {

        codeContent.textContent =
            "Loading...";

        codeFileName.textContent =
            fileName;

        codeViewer.classList.remove(
            "hidden"
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to load file"
            );

        }


        const text =
            await response.text();


        codeContent.textContent =
            text;


        currentFileUrl =
            url;


    } catch (error) {

        codeContent.textContent =
            "Unable to load this file.";

        console.error(error);

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

}


/* =====================================================
   DOWNLOAD
===================================================== */

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


/* =====================================================
   OPEN NEW TAB
===================================================== */

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


/* =====================================================
   CLOSE EVENTS
===================================================== */

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


/* =====================================================
   LOAD FOLDER
===================================================== */

async function loadFolder(
    folderPath = ""
) {

    currentFolder =
        folderPath;


    container.innerHTML = `
        <div class="loading">

            <div class="loading-spinner"></div>

            <p>
                Loading files...
            </p>

        </div>
    `;


    currentPathElement.textContent =
        "/" + folderPath;


    folderTitle.textContent =
        folderPath
            ? "📁 " +
              folderPath.split("/").filter(Boolean).pop()
            : "📁 Home";


    folderDescription.textContent =
        folderPath
            ? "Browse files in this folder"
            : "Browse your files and folders";


    try {

        const encodedFolder =
            encodePath(folderPath);


        const indexPath =
            ROOT_FOLDER +
            "/" +
            (
                encodedFolder
                    ? encodedFolder + "/"
                    : ""
            ) +
            "index.json";


        const response =
            await fetch(indexPath);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const items =
            await response.json();


        currentItems =
            items;


        displayFiles(
            items,
            folderPath
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
                    Please try again.
                </p>

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
                    There are no files here.
                </p>

            </div>
        `;

        return;
    }


    items.forEach(
        item => {

            const card =
                document.createElement("div");


            const type =
                item.type ||
                (
                    item.children
                        ? "folder"
                        : "file"
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

                    <a
                        href="#"
                        class="open-button"
                    >
                        ${
                            type === "folder"
                                ? "Open →"
                                : "Open ↗"
                        }
                    </a>

                </div>

            `;


            card
                .querySelector(
                    ".open-button"
                )
                .addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


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


            container.appendChild(card);

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

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


/* =====================================================
   HOME
===================================================== */

homeButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        loadFolder("");

    }
);


/* =====================================================
   BACK
===================================================== */

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


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =====================================================
   START
===================================================== */

loadFolder("");