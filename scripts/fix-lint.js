#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration for handling different types of lint issues
const LINT_FIXES = {
  // Remove unused imports
  unusedImports: {
    pattern: /import\s+(?:\{[^}]+\}|\w+)\s+from\s+['"][^'"]+['"];?\s*\/\/\s*unused/,
    action: (file) => {
      const content = fs.readFileSync(file, 'utf8');
      const cleanedContent = content.split('\n')
        .filter(line => !line.match(/\/\/\s*unused/))
        .join('\n');
      fs.writeFileSync(file, cleanedContent);
    }
  },

  // Remove commented-out code
  commentedCode: {
    pattern: /^\s*\/\/.*import/,
    action: (file) => {
      const content = fs.readFileSync(file, 'utf8');
      const cleanedContent = content.split('\n')
        .filter(line => !line.trim().startsWith('// import'))
        .join('\n');
      fs.writeFileSync(file, cleanedContent);
    }
  },

  // Handle any type usage
  anyType: {
    pattern: /:\s*any\b/,
    action: (file) => {
      const content = fs.readFileSync(file, 'utf8');
      const cleanedContent = content.replace(/:\s*any\b/g, ': unknown');
      fs.writeFileSync(file, cleanedContent);
    }
  }
};

// Function to recursively find files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip specific directories
      const ignoredDirs = [
        'node_modules', 
        '.next', 
        'out', 
        'dist', 
        '.git'
      ];
      
      if (!ignoredDirs.includes(file)) {
        findFiles(filePath, fileList);
      }
    } else if (
      file.endsWith('.ts') || 
      file.endsWith('.tsx') || 
      file.endsWith('.js') || 
      file.endsWith('.jsx')
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Main lint fixing function
function fixLintErrors() {
  console.log('🔍 Starting lint error fix process...');

  // Find all relevant files
  const projectRoot = path.resolve(process.cwd());
  const files = findFiles(projectRoot);

  // Apply fixes to each file
  files.forEach(file => {
    try {
      let fileModified = false;
      let content = fs.readFileSync(file, 'utf8');

      // Apply each lint fix
      Object.values(LINT_FIXES).forEach(fix => {
        if (fix.pattern.test(content)) {
          fix.action(file);
          fileModified = true;
        }
      });

      if (fileModified) {
        console.log(`✨ Fixed lint issues in: ${path.relative(projectRoot, file)}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}: ${error.message}`);
    }
  });

  // Run ESLint auto-fix
  try {
    console.log('🔧 Running ESLint auto-fix...');
    execSync('npx eslint . --fix', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
  } catch (error) {
    console.error('❌ ESLint auto-fix encountered an error');
  }

  // Run type checking
  try {
    console.log('✅ Running TypeScript type check...');
    execSync('npx tsc --noEmit', { 
      stdio: 'inherit', 
      cwd: projectRoot 
    });
  } catch (error) {
    console.error('❌ TypeScript type checking failed');
  }

  console.log('🎉 Lint fixing process complete!');
}

// Run the lint fixing process
fixLintErrors();
