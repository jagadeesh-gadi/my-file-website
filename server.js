const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// =====================================================
// FOLDERS
// =====================================================

const PUBLIC_FOLDER = path.join(__dirname, "public");
const FILES_FOLDER = path.join(__dirname, "files");


// =====================================================
// CREATE FILES FOLDER IF NEEDED
// =====================================================

if (!fs.existsSync(FILES_FOLDER)) {

    fs.mkdirSync(FILES_FOLDER, {
        recursive: true
    });

    console.log("Created:");
    console.log(FILES_FOLDER);
}


// =====================================================
// SERVE WEBSITE
// =====================================================

app.use(express.static(PUBLIC_FOLDER));


// =====================================================
// TEST API
// =====================================================

app.get("/api/test", (req, res) => {

    console.log("======================================");
    console.log("API TEST REQUEST RECEIVED");

    res.json({
        success: true,
        message: "Server is working"
    });

    console.log("API TEST RESPONSE SENT");
    console.log("======================================");

});


// =====================================================
// SAFE PATH
// =====================================================

function getSafePath(relativePath = "") {

    // Convert Windows slashes to Linux slashes
    relativePath =
        relativePath.replace(/\\/g, "/");

    // Remove leading slash
    relativePath =
        relativePath.replace(/^\/+/, "");


    const rootPath =
        path.resolve(FILES_FOLDER);


    const requestedPath =
        path.resolve(
            FILES_FOLDER,
            relativePath
        );


    // Prevent ../ access
    if (
        requestedPath !== rootPath &&
        !requestedPath.startsWith(
            rootPath + path.sep
        )
    ) {

        return null;

    }


    return requestedPath;

}


// =====================================================
// LIST CURRENT FOLDER ONLY
// =====================================================

app.get("/api/files", (req, res) => {

    const startTime = Date.now();

    console.log("");
    console.log("======================================");
    console.log("API FILE REQUEST RECEIVED");
    console.log("======================================");


    try {

        // ---------------------------------------------
        // Requested folder
        // ---------------------------------------------

        const requestedPath =
            typeof req.query.path === "string"
                ? req.query.path
                : "";


        console.log(
            "Requested path:",
            requestedPath || "/"
        );


        // ---------------------------------------------
        // Safe path
        // ---------------------------------------------

        const directory =
            getSafePath(requestedPath);


        console.log(
            "Directory:",
            directory
        );


        if (!directory) {

            console.log(
                "ERROR: Access denied"
            );

            return res.status(403).json({
                error: "Access denied"
            });

        }


        // ---------------------------------------------
        // Check folder
        // ---------------------------------------------

        if (!fs.existsSync(directory)) {

            console.log(
                "ERROR: Folder not found"
            );

            return res.status(404).json({
                error: "Folder not found"
            });

        }


        // ---------------------------------------------
        // Check directory
        // ---------------------------------------------

        const stat =
            fs.statSync(directory);


        if (!stat.isDirectory()) {

            console.log(
                "ERROR: Not a directory"
            );

            return res.status(400).json({
                error: "Not a directory"
            });

        }


        // ---------------------------------------------
        // Read CURRENT folder only
        // ---------------------------------------------

        console.log(
            "Reading folder..."
        );


        const items =
            fs.readdirSync(
                directory,
                {
                    withFileTypes: true
                }
            );


        console.log(
            "Items:",
            items.length
        );


        // ---------------------------------------------
        // Build result
        // ---------------------------------------------

        const result =
            items
                .map(item => {

                    if (item.isDirectory()) {

                        return {
                            name: item.name,
                            type: "folder"
                        };

                    }


                    if (item.isFile()) {

                        return {
                            name: item.name,
                            type: "file"
                        };

                    }


                    return null;

                })
                .filter(item => item !== null)
                .sort((a, b) => {

                    // Folders first
                    if (
                        a.type === "folder" &&
                        b.type === "file"
                    ) {

                        return -1;

                    }


                    if (
                        a.type === "file" &&
                        b.type === "folder"
                    ) {

                        return 1;

                    }


                    // Alphabetical
                    return a.name.localeCompare(
                        b.name,
                        undefined,
                        {
                            numeric: true,
                            sensitivity: "base"
                        }
                    );

                });


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        res.json({
            path: requestedPath,
            count: result.length,
            items: result
        });


        console.log(
            "Response sent"
        );

        console.log(
            "Time:",
            Date.now() - startTime,
            "ms"
        );

        console.log(
            "======================================"
        );


    } catch (error) {

        console.error(
            "API ERROR:",
            error
        );


        res.status(500).json({
            error: "Unable to read folder",
            message: error.message
        });

    }

});


// =====================================================
// SERVE ACTUAL FILES
// =====================================================

app.use(
    "/files",
    express.static(FILES_FOLDER)
);


// =====================================================
// 404
// =====================================================

app.use((req, res) => {

    console.log(
        "404:",
        req.method,
        req.url
    );

    res.status(404).json({
        error: "Not found"
    });

});


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log("");
        console.log(
            "======================================"
        );

        console.log(
            "       MY FILE WEBSITE"
        );

        console.log(
            "======================================"
        );

        console.log("");

        console.log(
            "Files folder:"
        );

        console.log(
            FILES_FOLDER
        );

        console.log("");

        console.log(
            "Website:"
        );

        console.log(
            `http://localhost:${PORT}`
        );

        console.log("");

        console.log(
            "API:"
        );

        console.log(
            `http://localhost:${PORT}/api/files`
        );

        console.log("");

        console.log(
            "Test API:"
        );

        console.log(
            `http://localhost:${PORT}/api/test`
        );

        console.log("");

        console.log(
            "======================================"
        );

    }
);
