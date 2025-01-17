#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const cleanImports = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remove lines like 'use client' or 'use server'
  const cleanedContent = content.replace(/^(\/\/\s*)?['"]use (client|server)['"];?\n/gm, '');
  
  fs.writeFileSync(filePath, cleanedContent);
  console.log(`Cleaned imports in ${filePath}`);
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      cleanImports(fullPath);
    }
  });
};

const srcDir = path.join(process.cwd(), 'src');
traverseDirectory(srcDir);
