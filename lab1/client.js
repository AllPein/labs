const net = require('net');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();
client.connect(6379, '0.0.0.0', () => {
    console.log('Connected to the server.');
    promptCommand();
});

function promptCommand() {
    rl.question('Enter command: ', (input) => {
        if (input === 'exit') {
            client.end();
            rl.close();
            return;
        }
        
        client.write(input, () => {
            console.log('Command sent:', input);
        });

        client.once('data', (data) => {
            console.log('Received:', data.toString());
            promptCommand(); // prompt for the next command
        });
    });
}

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Connection error:', err);
});
