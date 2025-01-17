const fs = require('fs');
const path = require('path');

function migrateRouter(sourceDir) {
    // Remove Pages Router files
    const pagesDir = path.join(sourceDir, 'src', 'pages');
    const apiDir = path.join(pagesDir, 'api');

    function deleteRecursive(dir) {
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach((file) => {
                const curPath = path.join(dir, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    deleteRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(dir);
        }
    }

    // Remove API and pages directories
    deleteRecursive(apiDir);
    deleteRecursive(pagesDir);

    console.log('Pages Router files removed successfully.');
}

// Usage
const projectRoot = process.cwd();
migrateRouter(projectRoot);
