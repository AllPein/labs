const { handleCommand, db } = require('./server');  // Import the exported function

describe('TCP Command Handler Tests', () => {
  let mockSocket;

  beforeEach(() => {
    mockSocket = { write: jest.fn() };
    for (const key in db) {  // Clear the db object before each test
      delete db[key];
    }
  });

  test('should store and retrieve a value', async () => {
    handleCommand('store key1 value1', mockSocket);
    expect(mockSocket.write).toHaveBeenCalledWith('Ok\n');
    expect(db['key1']).toBe('value1');

    handleCommand('load key1', mockSocket);
    expect(mockSocket.write).toHaveBeenCalledWith('value1\n');
  });

  test('should return "Key not found" for non-existing keys', async () => {
    handleCommand('load key2', mockSocket);
    expect(mockSocket.write).toHaveBeenCalledWith('Key not found\n');
  });

  test('should search keys starting with a prefix', async () => {
    handleCommand('store apple 10', mockSocket);
    handleCommand('store appletree 20', mockSocket);
    handleCommand('store banana 30', mockSocket);

    handleCommand('search app', mockSocket);
    expect(mockSocket.write).toHaveBeenCalledWith('apple,appletree\n');
  });

  test('should handle unsupported commands', async () => {
    handleCommand('delete key1', mockSocket);
    expect(mockSocket.write).toHaveBeenCalledWith('Unsupported command or incorrect usage\n');
  });
});
