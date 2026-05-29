const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const directoriesToSkip = ['node_modules', '.git', 'dist', 'build', '.vscode', '.idea'];
const filesToSkip = ['package-lock.json'];

let modifiedFiles = [];
let renamedFiles = [];

function replaceInFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    // Only process text files
    const binaryExts = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.mp4', '.mp3'];
    if (binaryExts.includes(ext)) {
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Perform replacements
        content = content.replace(/Zivaro/g, 'HustiQ');
        content = content.replace(/zivaro/g, 'hustiq');
        content = content.replace(/ZIVARO/g, 'HUSTIQ');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedFiles.push(filePath);
        }
    } catch (e) {
        console.error(`Error processing file ${filePath}:`, e);
    }
}

function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        if (directoriesToSkip.includes(item)) {
            continue;
        }

        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
            
            // Check if directory needs renaming
            const newDirName = item.replace(/Zivaro/g, 'HustiQ').replace(/zivaro/g, 'hustiq');
            if (newDirName !== item) {
                const newFullPath = path.join(dirPath, newDirName);
                fs.renameSync(fullPath, newFullPath);
                renamedFiles.push({ old: fullPath, new: newFullPath });
            }
        } else {
            if (filesToSkip.includes(item)) {
                continue;
            }
            
            let currentPath = fullPath;
            // Process file content first
            replaceInFile(currentPath);

            // Check if file needs renaming
            const newFileName = item.replace(/Zivaro/g, 'HustiQ').replace(/zivaro/g, 'hustiq');
            if (newFileName !== item) {
                const newFullPath = path.join(dirPath, newFileName);
                fs.renameSync(currentPath, newFullPath);
                renamedFiles.push({ old: currentPath, new: newFullPath });
            }
        }
    }
}

console.log('Starting brand replacement...');
processDirectory(projectRoot);

// Generate Report
let reportContent = '# Brand Replacement Report\n\n## Replaced Occurrences in Files\n';
if (modifiedFiles.length === 0) {
    reportContent += 'No files were modified.\n';
} else {
    modifiedFiles.forEach(file => {
        reportContent += `- ${path.relative(projectRoot, file).replace(/\\/g, '/')}\n`;
    });
}

reportContent += '\n## Renamed Files / Directories\n';
if (renamedFiles.length === 0) {
    reportContent += 'No files or directories were renamed.\n';
} else {
    renamedFiles.forEach(rename => {
        reportContent += `- ${path.relative(projectRoot, rename.old).replace(/\\/g, '/')} -> ${path.relative(projectRoot, rename.new).replace(/\\/g, '/')}\n`;
    });
}

const reportPath = path.join(projectRoot, 'brand_update_report.md');
fs.writeFileSync(reportPath, reportContent, 'utf8');

console.log('Brand replacement complete!');
console.log(`Report generated at: ${reportPath}`);
