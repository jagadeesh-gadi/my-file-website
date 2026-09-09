javascript
const ROOT_FOLDER = "files";


/* =====================================================
   MAIN ELEMENTS
===================================================== */

const container =
    document.getElementById("file-container");

const currentPathElement =
    document.getElementById("currentPath");

const homeButton =
    document.getElementById("breadcrumbHome");

const backButton =
    document.getElementById("backButton");

const searchInput =
    document.getElementById("searchInput");

const folderTitle =
    document.getElementById("folderTitle");

const folderDescription =
    document.getElementById("folderDescription");

const folderTree =
    document.getElementById("folderTree");

const refreshButton =
    document.getElementById("refreshButton");


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

const copyCode =
    document.getElementById("copyCode");

const downloadCode =
    document.getElementById("downloadCode");

const openCodeNewTab =
    document.getElementById("openCodeNewTab");


/* =====================================================
   MOBILE ELEMENTS
===================================================== */

const mobileHome =
    document.getElementById("mobileHome");

const mobileBack =
    document.getElementById("mobileBack");

const mobileRefresh =
    document.getElementById("mobileRefresh");


/* =====================================================
   VARIABLES
===================================================== */

let currentFolder = "";

let currentItems = [];

let currentFileUrl = "";


/* =====================================================
   CACHE
===================================================== */

const folderCache =
    new Map();


/* =====================================================
   TREE CACHE
===================================================== */

const treeCache =
    new Map();


/* =====================================================
   TREE EXPANDED FOLDERS
===================================================== */

const expandedFolders =
    new Set();


/* =====================================================
   REQUEST CONTROL
===================================================== */

let currentRequestId = 0;


/* =====================================================
   NORMALIZE PATH
===================================================== */

function normalizePath(path) {

    if (!path) {
        return "";
    }

    return String(path)
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

    if (!encodedFolder) {

        return (
            "/" +
            ROOT_FOLDER +
            "/index.json"
        );
    }

    return (
        "/" +
        ROOT_FOLDER +
        "/" +
        encodedFolder +
        "/index.json"
    );
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

    let fullPath = "";


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
   GET ITEM TYPE
===================================================== */

function getItemType(item) {

    if (!item) {
        return "file";
    }


    const type =
        String(
            item.type || ""
        ).toLowerCase();


    if (
        type === "folder" ||
        type === "directory" ||
        type === "dir"
    ) {

        return "folder";
    }


    if (
        item.isDirectory === true ||
        item.directory === true
    ) {

        return "folder";
    }


    return "file";
}


/* =====================================================
   GET ICON
===================================================== */

function getIcon(
    name,
    type
) {

    if (type === "folder") {
        return "📁";
    }


    const lower =
        String(name || "")
            .toLowerCase();


    if (lower.endsWith(".c")) {
        return "💻";
    }


    if (lower.endsWith(".h")) {
        return "🔧";
    }


    if (
        lower.endsWith(".cpp") ||
        lower.endsWith(".cc")
    ) {

        return "⚙️";
    }


    if (lower.endsWith(".java")) {
        return "☕";
    }


    if (lower.endsWith(".py")) {
        return "🐍";
    }


    if (lower.endsWith(".js")) {
        return "🟨";
    }


    if (lower.endsWith(".html")) {
        return "🌐";
    }


    if (lower.endsWith(".css")) {
        return "🎨";
    }


    if (lower.endsWith(".json")) {
        return "📋";
    }


    if (lower.endsWith(".pdf")) {
        return "📕";
    }


    if (lower.endsWith(".txt")) {
        return "📝";
    }


    if (
        lower.endsWith(".png") ||
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".webp")
    ) {

        return "🖼️";
    }


    if (lower.endsWith(".zip")) {
        return "🗜️";
    }


    return "📄";
}


/* =====================================================
   FILE TYPE
===================================================== */

function getType(
    name,
    type
) {

    if (type === "folder") {
        return "Folder";
    }


    const index =
        String(name || "")
            .lastIndexOf(".");


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
            (
                numericSize / 1024
            ).toFixed(1) +
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
        String(name || "")
            .toLowerCase();


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
            lower.endsWith(extension)
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
   LOADING MAIN AREA
===================================================== */

function showLoading() {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <div class="loader"></div>

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
                "C Programming";
        }


        if (folderDescription) {

            folderDescription.textContent =
                "Browse your C programming files and folders";
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
            parts[
                parts.length - 1
            ];
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
   UPDATE STATISTICS
===================================================== */

function updateStatistics(items) {

    const folderCount =
        document.getElementById(
            "folderCount"
        );

    const fileCount =
        document.getElementById(
            "fileCount"
        );

    const itemCount =
        document.getElementById(
            "itemCount"
        );


    if (!Array.isArray(items)) {

        items = [];
    }


    const folders =
        items.filter(
            item =>
                getItemType(item) ===
                "folder"
        ).length;


    const files =
        items.filter(
            item =>
                getItemType(item) ===
                "file"
        ).length;


    if (folderCount) {

        folderCount.textContent =
            folders;
    }


    if (fileCount) {

        fileCount.textContent =
            files;
    }


    if (itemCount) {

        const total =
            items.length;


        itemCount.textContent =
            total +
            (
                total === 1
                    ? " item"
                    : " items"
            );
    }
}


/* =====================================================
   SHOW ERROR
===================================================== */

function showFolderError(
    folder,
    url,
    error
) {

    console.error(
        "Folder loading error:",
        folder,
        error
    );


    if (!container) {
        return;
    }


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

    const normalizedFolder =
        normalizePath(folder);


    const requestId =
        ++currentRequestId;


    currentFolder =
        normalizedFolder;


    if (searchInput) {

        searchInput.value =
            "";
    }


    updateHeader(
        normalizedFolder
    );


    updateActiveTree(
        normalizedFolder
    );


    if (
        folderCache.has(
            normalizedFolder
        )
    ) {

        currentItems =
            folderCache.get(
                normalizedFolder
            );


        updateStatistics(
            currentItems
        );


        displayFiles(
            currentItems,
            normalizedFolder
        );


        return;
    }


    showLoading();


    const url =
        getIndexUrl(
            normalizedFolder
        );


    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (
            requestId !==
            currentRequestId
        ) {

            return;
        }


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "Invalid index.json format"
            );
        }


        folderCache.set(
            normalizedFolder,
            data
        );


        currentItems =
            data;


        updateStatistics(
            data
        );


        displayFiles(
            data,
            normalizedFolder
        );


    } catch (error) {

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


    container.innerHTML =
        "";


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
                    No files or folders found.
                </p>

            </div>

        `;

        return;
    }


    const normalizedFolder =
        normalizePath(folder);


    const sorted =
        [...items].sort(
            (a, b) => {

                const aType =
                    getItemType(a);

                const bType =
                    getItemType(b);


                if (
                    aType !==
                    bType
                ) {

                    return (
                        aType === "folder"
                            ? -1
                            : 1
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


    const fragment =
        document.createDocumentFragment();


    sorted.forEach(
        item => {

            if (
                !item ||
                !item.name
            ) {

                return;
            }


            const type =
                getItemType(item);


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

                <div class="file-card-top">

                    <div class="file-card-icon">
                        ${icon}
                    </div>

                    <div class="file-card-arrow">
                        →
                    </div>

                </div>


                <div class="file-card-name">
                    ${escapeHtml(
                        item.name
                    )}
                </div>


                <div class="file-card-type">
                    ${escapeHtml(
                        fileType
                    )}

                    ${
                        size
                            ? " • " +
                              escapeHtml(
                                  size
                              )
                            : ""
                    }

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

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


                        loadFolder(
                            nextFolder
                        );


                        expandTreePath(
                            nextFolder
                        );


                        return;
                    }


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
                    method: "GET",
                    cache: "no-store"
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
            "Unable to load this file.\n\n" +
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


if (closeCode) {

    closeCode.addEventListener(
        "click",
        closeViewer
    );
}


/* =====================================================
   COPY CODE
===================================================== */

if (copyCode) {

    copyCode.addEventListener(
        "click",
        async () => {

            if (!codeContent) {
                return;
            }


            const text =
                codeContent.textContent;


            try {

                await navigator.clipboard.writeText(
                    text
                );


                const oldText =
                    copyCode.textContent;


                copyCode.textContent =
                    "Copied ✓";


                setTimeout(
                    () => {

                        copyCode.textContent =
                            oldText;

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );
            }
        }
    );
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
   ESCAPE KEY
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
   HOME BUTTON
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
   BACK BUTTON
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
   REFRESH
===================================================== */

function refreshWebsite() {

    folderCache.clear();

    treeCache.clear();

    currentItems = [];


    buildFolderTree();


    loadFolder(
        currentFolder
    );
}


if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        refreshWebsite
    );
}


/* =====================================================
   MOBILE HOME
===================================================== */

if (mobileHome) {

    mobileHome.addEventListener(
        "click",
        () => {

            loadFolder("");
        }
    );
}


/* =====================================================
   MOBILE BACK
===================================================== */

if (mobileBack) {

    mobileBack.addEventListener(
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
}


/* =====================================================
   MOBILE REFRESH
===================================================== */

if (mobileRefresh) {

    mobileRefresh.addEventListener(
        "click",
        refreshWebsite
    );
}


/* =====================================================
   LOAD JSON FOR TREE
===================================================== */

async function loadTreeFolder(
    folder
) {

    const normalizedFolder =
        normalizePath(folder);


    if (
        treeCache.has(
            normalizedFolder
        )
    ) {

        return treeCache.get(
            normalizedFolder
        );
    }


    const url =
        getIndexUrl(
            normalizedFolder
        );


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
                response.status
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "Invalid index.json"
            );
        }


        treeCache.set(
            normalizedFolder,
            data
        );


        return data;


    } catch (error) {

        console.error(
            "Tree loading error:",
            normalizedFolder,
            error
        );


        return [];
    }
}


/* =====================================================
   BUILD ROOT TREE
===================================================== */

async function buildFolderTree() {

    if (!folderTree) {
        return;
    }


    folderTree.innerHTML = `

        <div class="tree-loading">

            <div class="tree-loader"></div>

            <span>
                Loading folders...
            </span>

        </div>

    `;


    try {

        const items =
            await loadTreeFolder(
                ""
            );


        folderTree.innerHTML =
            "";


        const rootWrapper =
            document.createElement(
                "div"
            );


        /*
         * ROOT = files
         */

        const rootItem =
            createTreeFolder(
                "files",
                "",
                true
            );


        rootWrapper.appendChild(
            rootItem
        );


        folderTree.appendChild(
            rootWrapper
        );


        /*
         * Root is automatically opened
         */

        expandedFolders.add("");


        const rootChildren =
            await createTreeChildren(
                "",
                items
            );


        rootWrapper.appendChild(
            rootChildren
        );


        rootChildren.classList.remove(
            "hidden"
        );


        updateActiveTree(
            currentFolder
        );


    } catch (error) {

        console.error(
            "Unable to build folder tree:",
            error
        );


        folderTree.innerHTML = `

            <div class="tree-loading">

                <span>
                    Unable to load folders
                </span>

            </div>

        `;
    }
}


/* =====================================================
   CREATE TREE FOLDER
===================================================== */

function createTreeFolder(
    name,
    path,
    root = false
) {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "tree-item";


    row.dataset.path =
        path;


    row.dataset.type =
        "folder";


    row.innerHTML = `

        <span class="tree-arrow">
            ▶
        </span>

        <span class="tree-icon">
            📁
        </span>

        <span class="tree-name">
            ${escapeHtml(name)}
        </span>

    `;


    const arrow =
        row.querySelector(
            ".tree-arrow"
        );


    /*
     * ROOT FILES
     */

    if (root) {

        arrow.classList.add(
            "open"
        );
    }


    /*
     * CLICK FOLDER
     */

    row.addEventListener(
        "click",
        async event => {

            event.stopPropagation();


            /*
             * ROOT
             */

            if (root) {

                toggleTreeFolder(
                    row,
                    "",
                    true
                );


                loadFolder(
                    ""
                );


                return;
            }


            /*
             * NORMAL FOLDER
             */

            const folderPath =
                normalizePath(
                    path
                );


            toggleTreeFolder(
                row,
                folderPath,
                false
            );


            loadFolder(
                folderPath
            );
        }
    );


    return row;
}


/* =====================================================
   CREATE TREE CHILDREN
===================================================== */

async function createTreeChildren(
    folder,
    items
) {

    const children =
        document.createElement(
            "div"
        );


    children.className =
        "tree-children hidden";


    if (
        !Array.isArray(items)
    ) {

        return children;
    }


    /*
     * Only folders are shown
     * inside the Explorer tree.
     */

    const folders =
        items
            .filter(
                item =>
                    getItemType(item) ===
                    "folder"
            )
            .sort(
                (a, b) =>
                    String(
                        a.name
                    ).localeCompare(
                        String(
                            b.name
                        ),
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    )
            );


    for (
        const item of folders
    ) {

        const name =
            String(
                item.name
            );


        const path =
            folder
                ? folder +
                  "/" +
                  name
                : name;


        const row =
            createTreeFolder(
                name,
                path,
                false
            );


        children.appendChild(
            row
        );


        /*
         * Add empty placeholder.
         * Actual children are loaded
         * only when the folder expands.
         */

        const placeholder =
            document.createElement(
                "div"
            );


        placeholder.className =
            "tree-children hidden";


        placeholder.dataset.for =
            path;


        children.appendChild(
            placeholder
        );
    }


    return children;
}


/* =====================================================
   TOGGLE TREE FOLDER
===================================================== */

async function toggleTreeFolder(
    row,
    path,
    isRoot
) {

    const parent =
        row.parentElement;


    if (!parent) {
        return;
    }


    let children =
        Array.from(
            parent.children
        ).find(
            element =>
                element.classList.contains(
                    "tree-children"
                ) ||
                element.dataset.for ===
                    path
        );


    /*
     * If children do not exist,
     * create them.
     */

    if (!children) {

        const items =
            await loadTreeFolder(
                path
            );


        children =
            await createTreeChildren(
                path,
                items
            );


        parent.appendChild(
            children
        );
    }


    /*
     * Expand / collapse
     */

    if (
        children.classList.contains(
            "hidden"
        )
    ) {

        children.classList.remove(
            "hidden"
        );


        expandedFolders.add(
            path
        );


        const arrow =
            row.querySelector(
                ".tree-arrow"
            );


        if (arrow) {

            arrow.classList.add(
                "open"
            );
        }


    } else {

        children.classList.add(
            "hidden"
        );


        expandedFolders.delete(
            path
        );


        const arrow =
            row.querySelector(
                ".tree-arrow"
            );


        if (arrow) {

            arrow.classList.remove(
                "open"
            );
        }
    }
}


/* =====================================================
   FIND TREE ROW
===================================================== */

function findTreeRow(path) {

    if (!folderTree) {
        return null;
    }


    const normalized =
        normalizePath(path);


    const rows =
        folderTree.querySelectorAll(
            ".tree-item"
        );


    for (
        const row of rows
    ) {

        if (
            normalizePath(
                row.dataset.path || ""
            ) === normalized
        ) {

            return row;
        }
    }


    return null;
}


/* =====================================================
   UPDATE ACTIVE TREE
===================================================== */

function updateActiveTree(
    path
) {

    if (!folderTree) {
        return;
    }


    const rows =
        folderTree.querySelectorAll(
            ".tree-item"
        );


    rows.forEach(
        row => {

            row.classList.remove(
                "active"
            );
        }
    );


    const row =
        findTreeRow(
            path
        );


    if (row) {

        row.classList.add(
            "active"
        );
    }
}


/* =====================================================
   EXPAND TREE PATH
===================================================== */

async function expandTreePath(
    path
) {

    const normalized =
        normalizePath(path);


    if (!normalized) {
        return;
    }


    const parts =
        normalized
            .split("/")
            .filter(Boolean);


    let currentPath =
        "";


    for (
        const part of parts
    ) {

        currentPath =
            currentPath
                ? currentPath +
                  "/" +
                  part
                : part;


        let row =
            findTreeRow(
                currentPath
            );


        /*
         * If row doesn't exist,
         * the parent probably hasn't
         * been expanded yet.
         */

        if (!row) {

            const parentPath =
                currentPath
                    .split("/")
                    .slice(0, -1)
                    .join("/");


            const parentRow =
                findTreeRow(
                    parentPath
                );


            if (parentRow) {

                await toggleTreeFolder(
                    parentRow,
                    parentPath,
                    parentPath === ""
                );
            }


            row =
                findTreeRow(
                    currentPath
                );
        }


        if (!row) {
            continue;
        }


        const parent =
            row.parentElement;


        if (!parent) {
            continue;
        }


        let children =
            Array.from(
                parent.children
            ).find(
                element =>
                    element.classList.contains(
                        "tree-children"
                    ) ||
                    element.dataset.for ===
                        currentPath
            );


        /*
         * Load children if required.
         */

        if (!children) {

            const items =
                await loadTreeFolder(
                    currentPath
                );


            children =
                await createTreeChildren(
                    currentPath,
                    items
                );


            parent.appendChild(
                children
            );
        }


        children.classList.remove(
            "hidden"
        );


        expandedFolders.add(
            currentPath
        );


        const arrow =
            row.querySelector(
                ".tree-arrow"
            );


        if (arrow) {

            arrow.classList.add(
                "open"
            );
        }
    }


    updateActiveTree(
        normalized
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
   INITIALIZE
===================================================== */

async function initialize() {

    console.log(
        "C Programming Library starting..."
    );


    /*
     * Build left Explorer
     */

    await buildFolderTree();


    /*
     * Load root folder
     */

    await loadFolder(
        ""
    );


    console.log(
        "C Programming Library ready."
    );
}


/* =====================================================
   START
===================================================== */

initialize();

