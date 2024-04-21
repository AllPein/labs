const net = require('net');

const db = {};

async function handleCommand(input, socket) {
    const parts = input.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
        case 'store':
            if (args.length == 2) {
                db[args[0]] = args[1];
                socket.write('Ok\n');
            }
            break;
        case 'load':
            if (args.length == 1) {
                const value = db[args[0]] || 'Key not found';
                socket.write(`${value}\n`);
            }
            break;
        case 'search':
            if (args.length == 1) {
                const results = Object.keys(db).filter(k => k.startsWith(args[0])).join(',');
                socket.write(`${results}\n`);
            }
            break;
        default:
            socket.write('Unsupported command or incorrect usage\n');
            break;
    }
}

const server = net.createServer((socket) => {
    console.log('Client connected.');

    socket.on('data', (data) => {
        const command = data.toString();
        handleCommand(command, socket);
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });
});

server.listen(6379, '0.0.0.0', () => {
    console.log('Server is running on port 6379');
});
