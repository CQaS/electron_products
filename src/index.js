const {
    app,
    BrowserWindow,
    Menu
} = require('electron')
const url = require('url')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {})
}

let mainWin
let nuevoProductoWin

app.on('ready', () => {
    mainWin = new BrowserWindow({})
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

const templateMenu = [{
    label: 'File',
    submenu: [{
        label: 'Nuevo Producto',
        accelerator: 'Ctrl+N',
        click() {
            crearNuevoProductoWin()
        }
    }]
}]

const crearNuevoProductoWin = () => {
    nuevoProductoWin = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Nuevo Producto'
    })
    nuevoProductoWin.setMenu(null)
    nuevoProductoWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/nuevo_producto.html'),
        protocol: 'file',
        slashes: true
    }))
}