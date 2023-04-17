

// uniqueID.ts
function method1(arr: number[]): string {
  return arr.join('');
}

function method2(arr: number[]): bigint {
  let id = BigInt(0);

  for (const num of arr) {
    id = (id << BigInt(32)) | BigInt(num);
  }

  return id;
}

const numTrials = 10000;
const arr: number[] = [42, 13, 67, 254, 1024, 2048, 4096, 8192];

function runBenchmark() {
  let method1Time = 0;
  let method2Time = 0;

  for (let i = 0; i < numTrials; i++) {
    const startTime1 = performance.now();

    method1(arr);
    const endTime1 = performance.now();

    method1Time += endTime1 - startTime1;

    const startTime2 = performance.now();

    method2(arr);
    const endTime2 = performance.now();

    method2Time += endTime2 - startTime2;
  }

  console.log(`Method 1 (Concatenation) Average Time: ${method1Time / numTrials} ms`);
  console.log(`Method 2 (Bitshifting with BigInts) Average Time: ${method2Time / numTrials} ms`);
}

runBenchmark();
