import { readFileSync } from 'node:fs';

interface Range {
    start: number;
    end: number;
}

function parseRanges(input: string): Range[] {
    const lines = input.trim().split('\n');
    const ranges: Range[] = [];
    for (const line of lines) {
        if (line.includes('-')) {
            const [startStr, endStr] = line.split('-');
            ranges.push({
                start: parseInt(startStr as string, 10),
                end: parseInt(endStr as string, 10),
            });
        }
    }
    return ranges;
}

function mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) {
        return [];
    }

    ranges.sort((a, b) => a.start - b.start || a.end - b.end);

    const merged: Range[] = [ranges[0] as Range];

    for (let i = 1; i < ranges.length; i++) {
        const lastMerged = merged[merged.length - 1];
        const current = ranges[i];

        if ((current?.start as number) <= (lastMerged?.end as number)) {
            (lastMerged as Range).end = Math.max(
                (lastMerged as Range).end,
                (current as Range).end,
            );
        } else {
            merged.push(current as Range);
        }
    }

    return merged;
}

function calculateTotalFreshIds(ranges: Range[]): number {
    let total = 0;
    for (const range of ranges) {
        total += range.end - range.start + 1;
    }
    return total;
}

const input = readFileSync('src/5/input.txt', 'utf8');
const allRanges = parseRanges(input);
const freshRanges = allRanges.filter(
    (range) => range.start !== undefined && range.end !== undefined,
);
const mergedFreshRanges = mergeRanges(freshRanges);
const totalFreshIds = calculateTotalFreshIds(mergedFreshRanges);

console.log(totalFreshIds);
