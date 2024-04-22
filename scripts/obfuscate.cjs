const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

async function obfuscateFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Check if the file contains the comment "// obfuscate = false" at the beginning
        if (fileContent.trim().startsWith('// obfuscate = false')) {
            console.log(`Skipping obfuscation for file "${filePath}" as per directive.`);
            return;
        }

        const obfuscatedContent = JavaScriptObfuscator.obfuscate(fileContent, {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            numbersToExpressions: true,
            simplify: true,
            shuffleStringArray: true,
            splitStrings: true,
            stringArrayThreshold: 0.75
        }).getObfuscatedCode();
        
        fs.writeFileSync(filePath, obfuscatedContent, 'utf-8');
        console.log(`File "${filePath}" obfuscated successfully.`);
    } catch (err) {
        console.error(`Error obfuscating file "${filePath}": ${err}`);
        return;
    }
}

async function obfuscateDirectory(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                await obfuscateDirectory(filePath);
            } else if (path.extname(filePath) === '.js') {
                await obfuscateFile(filePath);
            }
        }
    } catch (err) {
        console.error(`Error obfuscating directory "${directoryPath}": ${err}`);
    }
}

async function obfuscateJavaScriptFiles(filePath) {
    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            await obfuscateDirectory(filePath);
        } else if (path.extname(filePath) === '.js') {
            await obfuscateFile(filePath);
        } else {
            console.error('Provided path is not a directory or a JavaScript file.');
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide a file path.');
} else {
    obfuscateJavaScriptFiles(filePath);
}
