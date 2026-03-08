import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-undef
const filePath = path.join(process.cwd(), 'src', 'data', 'challenges.js');
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to find the end of the tests array for each challenge object and inject the new properties
const updatedContent = content.replace(/(\s*tests:\s*\[[\s\S]*?\])\s*\}/g, (match, p1) => {
  return `${p1},
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\\n// Often uses modern ES6+ features\\nconst solve = (args) => {\\n  return 'Optimized!';\\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  }`;
});

fs.writeFileSync(filePath, updatedContent);
console.log('Successfully updated challenges.js with leetcodeLinks and communitySolutions.');
