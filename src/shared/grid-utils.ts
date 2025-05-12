import type { Sample } from '@/types/commands';

export function generateRandomSamples(count: number): Sample[] {
  const samples: Sample[] = [];
  const positions = new Set<string>();

  positions.add('0,0');

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let posKey: string;

    do {
      x = Math.floor(Math.random() * 10) - 5;
      y = Math.floor(Math.random() * 10) - 5;
      posKey = `${x},${y}`;
    } while (positions.has(posKey));

    positions.add(posKey);

    samples.push({
      id: `sample-${i}`,
      x,
      y,
      isPickedUp: false,
    });
  }

  return samples;
}

export function calculateGridBoundaries(
  manipulatorX: number,
  manipulatorY: number,
  samples: Sample[],
) {
  let minX = Math.min(manipulatorX, 0);
  let maxX = Math.max(manipulatorX, 0);
  let minY = Math.min(manipulatorY, 0);
  let maxY = Math.max(manipulatorY, 0);

  samples.forEach((sample) => {
    if (!sample.isPickedUp) {
      minX = Math.min(minX, sample.x);
      maxX = Math.max(maxX, sample.x);
      minY = Math.min(minY, sample.y);
      maxY = Math.max(maxY, sample.y);
    }
  });

  minX -= 1;
  maxX += 1;
  minY -= 1;
  maxY += 1;

  return { minX, maxX, minY, maxY };
}
