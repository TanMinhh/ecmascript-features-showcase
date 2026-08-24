const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchUser(id) {
    console.log(`Start getting data id: ${id}`);
    await delay(1000);
    return `User ${id}`;
}

const ids = [1, 2, 3];

async function demoPromiseAll() {
    console.time("Promise.all process time");
    await Promise.all(ids.map(fetchUser));
    console.timeEnd("Promise.all process time");
}

async function demoArrayFromAsync() {
    console.time("Array.fromAsync process time");
    await Array.fromAsync(ids, fetchUser);
    console.timeEnd("Array.fromAsync process time");
}

demoPromiseAll()
demoArrayFromAsync()