#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

const cleanErrorHandling = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });
  
  traverse.default(ast, {
    // Remove empty catch blocks
    CatchClause(path) {
      if (t.isBlockStatement(path.node.body) && path.node.body.body.length === 0) {
        path.remove();
      }
    },
    
    // Remove unnecessary try/catch
    TryStatement(path) {
      const tryBody = path.node.block.body;
      const catchClause = path.node.handler;
      
      if (catchClause && tryBody.length === 1 && t.isThrowStatement(tryBody[0])) {
        path.replaceWith(tryBody[0]);
      }
    }
  });
  
  const output = generate.default(ast, {}, code);
  
  fs.writeFileSync(filePath, output.code);
  console.log(`Cleaned error handling in ${filePath}`);
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      cleanErrorHandling(fullPath);
    }
  });
};

const srcDir = path.join(process.cwd(), 'src');
traverseDirectory(srcDir);
