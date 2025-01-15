#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const addReactImport = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if React is already imported
  if (content.includes('import React')) return;
  
  // Add React import at the top
  const updatedContent = `import React from 'react';\n${content}`;
  
  fs.writeFileSync(filePath, updatedContent);
  console.log(`Added React import to ${filePath}`);
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      addReactImport(fullPath);
    }
  });
};

const srcDir = path.join(process.cwd(), 'src');
traverseDirectory(srcDir);
