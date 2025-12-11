import * as fs from 'node:fs';

const file = fs.readFileSync('src/11/input.txt', 'utf8');
const rows = file.split('\n');

const dict: { [key: string]: string[] } = {};

for (const r of rows) {
    const temp = r.split(': ');
    if (temp.length === 2) {
        const id = temp[0];
        const connectionsString = temp[1];
        if (id && connectionsString) {
            const connections = connectionsString.split(' ');
            dict[id] = connections;
        }
    }
}

const queue: string[][] = dict.you ? [['you']] : [];
const allPaths: string[][] = [];

while (queue.length > 0) {
    const currentPath = queue.shift();
    if (!currentPath) {
        continue;
    }
    const lastNode = currentPath[currentPath.length - 1];

    if (lastNode === 'out') {
        allPaths.push(currentPath);
    } else if (lastNode) {
        const neighbors = dict[lastNode] || [];
        for (const neighbor of neighbors) {
            if (!currentPath.includes(neighbor)) {
                const newPath = [...currentPath, neighbor];
                queue.push(newPath);
            }
        }
    }
}

console.log(allPaths.length);
