const fs = require('fs');

console.log('Starting automated tests...\n');

let passed = 0;
let failed = 0;

function test(name, condition) {
    if (condition) {
        console.log(`TEST PASSED: ${name}`);
        passed++;
    } else {
        console.error(`TEST FAILED: ${name}`);
        failed++;
    }
}

// Test 1
test('app.js exists', fs.existsSync('app.js'));

// Test 2
test('package.json exists', fs.existsSync('package.json'));

// Test 3
test('public/index.html exists', fs.existsSync('public/index.html'));

// Test 4
test('build.js exists', fs.existsSync('build.js'));

// Test 5
test('Jenkinsfile exists', fs.existsSync('Jenkinsfile'));

// Test 6
test('package.json contains test script', 
    fs.existsSync('package.json') &&
    JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts.test === 'node test.js'
);

console.log(`\nTests Passed: ${passed}`);
console.log(`Tests Failed: ${failed}`);

if (failed > 0) {
    console.error('\nAutomated testing failed.');
    process.exit(1);
}

console.log('\nAll 6 automated tests passed.');
