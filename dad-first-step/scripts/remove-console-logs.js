#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const removeConsoleLogs = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remove console.log, console.warn, console.error statements
  const cleanedContent = content.replace(/console\.(log|warn|error)\(.*\);?/gm, '');
  
  fs.writeFileSync(filePath, cleanedContent);
  console.log(`Removed console logs in ${filePath}`);
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      removeConsoleLogs(fullPath);
    }
  });
};

const srcDir = path.join(process.cwd(), 'src');
traverseDirectory(srcDir);
