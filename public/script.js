const ROOT_FOLDER = "files";

const container = document.getElementById("file-container");
const currentPathElement = document.getElementById("currentPath");
const homeButton = document.getElementById("homeButton");


// =====================================================
// ENCODE PATH
// =====================================================

function encodePath(path) {

    return path
        .split("/")
        .map(part => encodeURIComponent(part))
        .join("/");

}


// =====================================================
// LOAD FOLDER
// =====================================================

async function loadFolder(folderPath = "") {

    container.innerHTML = "<p>Loading...</p>";

    currentPathElement.textContent =
        "/" + folderPath;


    try {

        const indexPath =
            ROOT_FOLDER +
            "/" +
            encodePath(folderPath) +
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
            <p>
                ❌ Unable to load this folder.
            </p>
        `;

    }

}


// =====================================================
// DISPLAY FILES
// =====================================================

function displayFiles(
    items,
    currentFolder
) {

    container.innerHTML = "";


    if (!items.length) {

        container.innerHTML =
            "<p>This folder is empty.</p>";

        return;

    }


    items.forEach(item => {

        const element =
            document.createElement("div");


        // =============================================
        // FOLDER
        // =============================================

        if (item.type === "folder") {

            element.className = "folder";


            const link =
                document.createElement("a");


            link.href = "#";


            link.textContent =
                "📁 " + item.name;


            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const newPath =
                        currentFolder +
                        item.name +
                        "/";


                    loadFolder(newPath);

                }
            );


            element.appendChild(link);

        }


        // =============================================
        // FILE
        // =============================================

        else if (item.type === "file") {

            element.className = "file";


            const link =
                document.createElement("a");


            const filePath =
                ROOT_FOLDER +
                "/" +
                currentFolder +
                encodeURIComponent(
                    item.name
                );


            link.href =
                encodePath(filePath);


            link.target = "_blank";


            link.rel =
                "noopener noreferrer";


            link.textContent =
                "📄 " + item.name;


            element.appendChild(link);

        }


        container.appendChild(element);

    });

}


// =====================================================
// HOME
// =====================================================

homeButton.addEventListener(
    "click",
    () => {

        loadFolder("");

    }
);


// =====================================================
// START
// =====================================================

loadFolder("");
