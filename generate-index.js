const fs = require("fs");
const path = require("path");

const ROOT =
    path.join(__dirname, "files");


function generateIndex(directory) {

    const entries =
        fs.readdirSync(
            directory,
            {
                withFileTypes: true
            }
        );


    const items =
        entries
            .filter(entry => {

                return entry.name !== "index.json";

            })
            .map(entry => {

                if (entry.isDirectory()) {

                    return {
                        name: entry.name,
                        type: "folder"
                    };

                }


                if (entry.isFile()) {

                    return {
                        name: entry.name,
                        type: "file"
                    };

                }


                return null;

            })
            .filter(Boolean)
            .sort((a, b) => {

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


                return a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            });


    const indexPath =
        path.join(
            directory,
            "index.json"
        );


    fs.writeFileSync(
        indexPath,
        JSON.stringify(
            items,
            null,
            2
        )
    );


    console.log(
        "Created:",
        indexPath
    );


    // Recursively process folders

    for (const entry of entries) {

        if (entry.isDirectory()) {

            generateIndex(
                path.join(
                    directory,
                    entry.name
                )
            );

        }

    }

}


console.log("");
console.log(
    "Generating folder indexes..."
);
console.log("");

generateIndex(ROOT);

console.log("");
console.log(
    "Finished!"
);
