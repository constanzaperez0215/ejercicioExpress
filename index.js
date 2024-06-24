const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())
// Permite la comunicación de 2 aplicaciones de orígenes o dominios diferentes.

app.use(express.json())
// Middleware que sirve específicamente para parsear el cuerpo de una consulta y permitirle a la ruta acceder los payload de cada consulta.

app.get('/home', (req, res) => {
  try {
    res.status(200).send('Hello word Express.js')
  } catch (error) {
    res.send('Error en el servidor')
  }
})

app.get('/perfil', (req, res) => {
  res.send('Constanza Pérez')
})

app.get('/fecha', (req, res) => {
  const fecha = new Date()
  res.send(fecha)
})

app.get('/productos', (req, res) => {
  const productos = JSON.parse(fs.readFileSync('./productos.json'))
  res.json(productos)
})

app.get('/usuarios', (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync('./usuarios.json'))

  res.json(usuarios)
})

// Metodos post

app.post('/productos', (req, res) => {
  try {
    const producto = req.body
    // producto almacena el payload de la consulta
    const productos = JSON.parse(fs.readFileSync('./productos.json'))
    // Almacena el contenido de productos.json parseado
    productos.push(producto)
    // Agreda el nuevo producto a la lista productos
    fs.writeFileSync('productos.json', JSON.stringify(productos))
    // Sobreescribe productos.json por el nuevo arreglo que contiene el nuesvo producto
    res.send('producto agregado con exito')
    // Mensaje para saber que el producto se agregó
  } catch (error) {
    res.status(404).send('Error en el servidor')
  }
})

app.post('/usuarios', (req, res) => {
  const usuario = req.body
  const usuarios = JSON.parse(fs.readFileSync('./usuarios.json'))
  usuarios.push(usuario)
  fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios))
  res.send('usuario agregado con exito')
})

// Metodo DELETE

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params
  // Encuenta el parametro de la url (id)
  const productos = JSON.parse(fs.readFileSync('./productos.json'))
  // leer el documento json productos
  const index = productos.findIndex(p => p.id == id)
  // La funcion de index es encontrar el id en productos
  productos.splice(index, 1)
  // con la funcion splice se elimina de productos el id con el indice asignado por index
  fs.writeFileSync('./productos.json', JSON.stringify(productos))
  // Sobreescribe el documento json por los nuevos productos
  res.send('Producto eliminado con exito')
})

// USUARIOS

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuarios = JSON.parse(fs.readFileSync('./usuarios.json'))
  const index = usuarios.findIndex(usua => usua.id == id)
  usuarios.splice(index, 1)
  fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios))
  res.send('Usuario eliminado con exito')
})

// Metodo PUT

// PRODUCTO

app.put('/productos/:id', (req, res) => {
  const { id } = req.params
  const producto = req.body
  const productos = JSON.parse(fs.readFileSync('./productos.json'))
  const index = productos.findIndex(p => p.id == id)
  productos[index] = producto
  // busca al producto por su index y le envía como debería ser ese producto
  fs.writeFileSync('./productos.json', JSON.stringify(productos))
  res.send('Producto modificado con exito')
})

// UAUARIOS

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuario = req.body
  const usuarios = JSON.parse(fs.readFileSync('./usuarios.json'))
  const index = usuarios.findIndex( usua => usua.id == id)
  usuarios[index] = usuario
  fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios))
  res.send('Usuario modificado con exito')
})

// Devolver un archivo HTML

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, console.log('Servidor encendido!'))
