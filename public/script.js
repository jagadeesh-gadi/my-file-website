
const ROOT_FOLDER = "files";

/* =====================================================
MAIN ELEMENTS
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
LOADING REQUEST CONTROL
===================================================== */

let currentRequestId = 0;


/* =====================================================
NORMALIZE PATH
===================================================== */

function normalizePath(path) {

    if (!path) {
        return "";
    }

    return path
        .split("/")
        .filter(Boolean)
        .map(part => part.trim())
        .filter(Boolean)
        .join("/");
}


/* =====================================================
ENCODE PATH
===================================================== */

function encodePath(path) {

    const normalized =
        normalizePath(path);

    if (!normalized) {
        return "";
    }

    return normalized
        .split("/")
        .map(part =>
            encodeURIComponent(part)
        )
        .join("/");
}


/* =====================================================
INDEX URL
===================================================== */

function getIndexUrl(folder = "") {

    const normalizedFolder =
        normalizePath(folder);

    const encodedFolder =
        encodePath(normalizedFolder);

    let url;

    if (!encodedFolder) {

        url =
            "/" +
            ROOT_FOLDER +
            "/index.json";

    } else {

        url =
            "/" +
            ROOT_FOLDER +
            "/" +
            encodedFolder +
            "/index.json";
    }

    return url;
}


/* =====================================================
FILE URL
===================================================== */

function getFileUrl(
    folder,
    fileName
) {

    const normalizedFolder =
        normalizePath(folder);

    const normalizedFileName =
        String(fileName || "").trim();

    let fullPath;

    if (normalizedFolder) {

        fullPath =
            normalizedFolder +
            "/" +
            normalizedFileName;

    } else {

        fullPath =
            normalizedFileName;
    }

    return (
        "/" +
        ROOT_FOLDER +
        "/" +
        encodePath(fullPath)
    );
}


/* =====================================================
FILE ICON
===================================================== */

function getIcon(name, type) {

    if (type === "folder") {
        return "📁";
    }

    const lower =
        String(name || "").toLowerCase();


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
}


/* =====================================================
FILE TYPE
===================================================== */

function getType(name, type) {

    if (type === "folder") {
        return "Folder";
    }

    const index =
        String(name || "").lastIndexOf(".");


    if (index === -1) {
        return "File";
    }


    return (
        String(name)
            .substring(index + 1)
            .toUpperCase() +
        " File"
    );
}


/* =====================================================
FILE SIZE
===================================================== */

function formatSize(size) {

    if (
        size === undefined ||
        size === null ||
        size === ""
    ) {
        return "";
    }

    const numericSize =
        Number(size);


    if (Number.isNaN(numericSize)) {
        return "";
    }


    if (numericSize < 1024) {

        return (
            numericSize +
            " B"
        );
    }


    if (
        numericSize <
        1024 * 1024
    ) {

        return (
            (numericSize / 1024)
                .toFixed(1) +
            " KB"
        );
    }


    return (
        (
            numericSize /
            (1024 * 1024)
        ).toFixed(1) +
        " MB"
    );
}


/* =====================================================
CODE FILE
===================================================== */

function isCodeFile(name) {

    const lower =
        String(name || "").toLowerCase();


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
        ext =>
            lower.endsWith(ext)
    );
}


/* =====================================================
PDF FILE
===================================================== */

function isPdf(name) {

    return String(name || "")
        .toLowerCase()
        .endsWith(".pdf");
}


/* =====================================================
LOADING
===================================================== */

function showLoading() {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <div class="loading-spinner"></div>

            <p>
                Loading files...
            </p>

        </div>

    `;
}


/* =====================================================
UPDATE HEADER
===================================================== */

function updateHeader(folder) {

    const normalizedFolder =
        normalizePath(folder);


    if (currentPathElement) {

        currentPathElement.textContent =
            normalizedFolder
                ? "/" +
                  normalizedFolder +
                  "/"
                : "/";
    }


    if (!normalizedFolder) {

        if (folderTitle) {

            folderTitle.textContent =
                "📁 Home";
        }


        if (folderDescription) {

            folderDescription.textContent =
                "Browse your files and folders";
        }


        if (backButton) {

            backButton.disabled =
                true;
        }


        return;
    }


    const parts =
        normalizedFolder
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

        backButton.disabled =
            false;
    }
}


/* =====================================================
SHOW FOLDER ERROR
===================================================== */

function showFolderError(
    folder,
    url,
    error
) {

    if (!container) {
        return;
    }


    console.error(
        "========================================"
    );

    console.error(
        "FOLDER LOADING ERROR"
    );

    console.error(
        "Folder:",
        folder || "/"
    );

    console.error(
        "URL:",
        url
    );

    console.error(
        "Error:",
        error
    );

    console.error(
        "========================================"
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

            <p>
                <strong>
                    Requested:
                </strong>
                ${escapeHtml(url)}
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

                folderCache.delete(
                    folder
                );

                loadFolder(
                    folder
                );
            }
        );
    }
}


/* =====================================================
LOAD FOLDER
===================================================== */

async function loadFolder(
    folder = ""
) {

    /* -----------------------------------------------
       NORMALIZE FOLDER
    ------------------------------------------------ */

    const normalizedFolder =
        normalizePath(folder);


    /* -----------------------------------------------
       REQUEST ID
       Prevent old requests from overwriting
       the current folder
    ------------------------------------------------ */

    const requestId =
        ++currentRequestId;


    /* -----------------------------------------------
       UPDATE CURRENT FOLDER
    ------------------------------------------------ */

    currentFolder =
        normalizedFolder;


    /* -----------------------------------------------
       CLEAR SEARCH
    ------------------------------------------------ */

    if (searchInput) {

        searchInput.value =
            "";
    }


    /* -----------------------------------------------
       UPDATE HEADER
    ------------------------------------------------ */

    updateHeader(
        normalizedFolder
    );


    /* -----------------------------------------------
       CACHE
    ------------------------------------------------ */

    if (
        folderCache.has(
            normalizedFolder
        )
    ) {

        console.log(
            "Loading from cache:",
            normalizedFolder || "/"
        );


        currentItems =
            folderCache.get(
                normalizedFolder
            );


        displayFiles(
            currentItems,
            normalizedFolder
        );


        return;
    }


    /* -----------------------------------------------
       SHOW LOADING
    ------------------------------------------------ */

    showLoading();


    /* -----------------------------------------------
       BUILD URL
    ------------------------------------------------ */

    const url =
        getIndexUrl(
            normalizedFolder
        );


    console.log(
        "========================================"
    );

    console.log(
        "Loading folder:",
        normalizedFolder || "/"
    );

    console.log(
        "Index URL:",
        url
    );

    console.log(
        "========================================"
    );


    /* -----------------------------------------------
       FETCH INDEX.JSON
    ------------------------------------------------ */

    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        /* -------------------------------------------
           IGNORE OLD REQUEST
        -------------------------------------------- */

        if (
            requestId !==
            currentRequestId
        ) {

            return;
        }


        console.log(
            "HTTP status:",
            response.status,
            url
        );


        /* -------------------------------------------
           HTTP ERROR
        -------------------------------------------- */

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                url
            );
        }


        /* -------------------------------------------
           READ JSON
        -------------------------------------------- */

        const data =
            await response.json();


        /* -------------------------------------------
           VALIDATE JSON
        -------------------------------------------- */

        if (
            !Array.isArray(data)
        ) {

            throw new Error(
                "Invalid index.json format. Expected an array."
            );
        }


        /* -------------------------------------------
           CACHE INDEX
        -------------------------------------------- */

        folderCache.set(
            normalizedFolder,
            data
        );


        /* -------------------------------------------
           UPDATE CURRENT ITEMS
        -------------------------------------------- */

        currentItems =
            data;


        /* -------------------------------------------
           DISPLAY
        -------------------------------------------- */

        displayFiles(
            data,
            normalizedFolder
        );


    } catch (error) {

        /* -------------------------------------------
           IGNORE OLD REQUEST ERROR
        -------------------------------------------- */

        if (
            requestId !==
            currentRequestId
        ) {

            return;
        }


        showFolderError(
            normalizedFolder,
            url,
            error
        );
    }
}


/* =====================================================
DISPLAY FILES
===================================================== */

function displayFiles(
    items,
    folder
) {

    if (!container) {
        return;
    }


    /* -----------------------------------------------
       CLEAR
    ------------------------------------------------ */

    container.innerHTML =
        "";


    /* -----------------------------------------------
       VALIDATE
    ------------------------------------------------ */

    if (
        !Array.isArray(items) ||
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
       NORMALIZE FOLDER
    ------------------------------------------------ */

    const normalizedFolder =
        normalizePath(folder);


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


                return String(
                    a.name || ""
                ).localeCompare(
                    String(
                        b.name || ""
                    ),
                    undefined,
                    {
                        sensitivity:
                            "base"
                    }
                );
            }
        );


    /* -----------------------------------------------
       FRAGMENT
    ------------------------------------------------ */

    const fragment =
        document.createDocumentFragment();


    /* -----------------------------------------------
       CREATE CARDS
    ------------------------------------------------ */

    sorted.forEach(
        item => {

            if (!item || !item.name) {
                return;
            }


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
                            ${escapeHtml(
                                fileType
                            )}
                        </div>

                    </div>

                </div>


                <div class="card-bottom">

                    <span class="file-size">
                        ${escapeHtml(
                            size
                        )}
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


            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    /* --------------------------------
                       FOLDER
                    -------------------------------- */

                    if (
                        type ===
                        "folder"
                    ) {

                        const nextFolder =
                            normalizedFolder
                                ? normalizedFolder +
                                  "/" +
                                  item.name
                                : item.name;


                        console.log(
                            "Opening folder:",
                            nextFolder
                        );


                        loadFolder(
                            nextFolder
                        );


                        return;
                    }


                    /* --------------------------------
                       FILE
                    -------------------------------- */

                    openFile(
                        item
                    );
                }
            );


            fragment.appendChild(
                card
            );
        }
    );


    /* -----------------------------------------------
       DISPLAY
    ------------------------------------------------ */

    container.appendChild(
        fragment
    );
}


/* =====================================================
OPEN FILE
===================================================== */

function openFile(item) {

    if (
        !item ||
        !item.name
    ) {

        return;
    }


    const url =
        getFileUrl(
            currentFolder,
            item.name
        );


    console.log(
        "Opening file:",
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
}


/* =====================================================
OPEN CODE
===================================================== */

async function openCode(
    url,
    fileName
) {

    /* -----------------------------------------------
       OPTIONAL VIEWER
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       SAVE CURRENT URL
    ------------------------------------------------ */

    currentFileUrl =
        url;


    /* -----------------------------------------------
       UPDATE VIEWER
    ------------------------------------------------ */

    codeFileName.textContent =
        fileName;


    codeContent.textContent =
        "Loading code...";


    codeViewer.classList.remove(
        "hidden"
    );


    /* -----------------------------------------------
       FETCH CODE
    ------------------------------------------------ */

    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                url
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
            "Unable to load this code file.\n\n" +
            error.message;
    }
}


/* =====================================================
CLOSE CODE VIEWER
===================================================== */

function closeViewer() {

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
}


/* =====================================================
DOWNLOAD
===================================================== */

if (downloadCode) {

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
CLOSE CODE BUTTON
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
                event.target ===
                codeViewer
            ) {

                closeViewer();
            }
        }
    );
}


/* =====================================================
ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeViewer();
        }
    }
);


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


            const parent =
                parts.join("/");


            loadFolder(
                parent
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
                        String(
                            item.name || ""
                        )
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
        String(
            text ?? ""
        );


    return div.innerHTML;
}


/* =====================================================
START APPLICATION
===================================================== */

loadFolder("");

