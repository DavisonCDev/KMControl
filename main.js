const { app, BrowserWindow } = require('electron');
const path = require('path');

// Função para criar a janela principal
function createWindow() {
    // Cria uma nova janela do navegador
    const win = new BrowserWindow({
        width: 800,  // Largura inicial
        height: 600, // Altura inicial
        // Definir o caminho do arquivo HTML
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Se você usar um preload
            nodeIntegration: true
        }
    });

    // Carrega o arquivo index.html
    win.loadFile('index.html');

    // Maximiza a janela assim que for criada
    win.maximize();
}

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(() => {
    createWindow();

    // No macOS, manter o aplicativo ativo mesmo sem janelas
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Fechar o aplicativo quando todas as janelas forem fechadas (para o Windows e Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
