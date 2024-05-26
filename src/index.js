const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
const url = require('url')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {})
}

let mainWin
let nuevoProductoWin

app.on('ready', () => {
    mainWin = new BrowserWindow({
        title: 'Index Productos',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Usar un script de precarga
            nodeIntegration: false, // Mayor seguridad desactivando nodeIntegration
            contextIsolation: true, // Activar aislamiento de contexto
        }
    })
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainManu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainManu)

    mainWin.on('closed', () => {
        app.quit()
    })
})

ipcMain.on('producto:nuevo', (e, P) => {
    console.log(P)
    mainWin.webContents.send('producto:nuevo', P)
})

const templateMenu = [{
    label: 'File',
    submenu: [{
            label: 'Nuevo Producto',
            accelerator: 'Ctrl+N',
            click() {
                crearNuevoProductoWin()
            }
        },
        {
            label: 'Eliminar Producto'
        },
        {
            label: 'Salir',
            accelerator: process.platform == 'darwin' ? 'command+S' : 'Ctrl+S',
            click() {
                app.quit()
            }
        }
    ]
}]

const crearNuevoProductoWin = () => {
    nuevoProductoWin = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Nuevo Producto',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Usar un script de precarga
            nodeIntegration: false, // Mayor seguridad desactivando nodeIntegration
            contextIsolation: true, // Activar aislamiento de contexto
            enableRemoteModule: false,
        }
    })
    nuevoProductoWin.setMenu(null)
    nuevoProductoWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/nuevo_producto.html'),
        protocol: 'file',
        slashes: true
    }))
}

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [{
                label: 'Abrir/Cerrar win dev',
                accelerator: 'Ctrl+D',
                click(item, focuseWindow) {
                    focuseWindow.toggleDevTools()
                }
            },
            {
                role: 'reload',
            }
        ]
    })
}