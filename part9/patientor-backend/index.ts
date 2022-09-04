const app = require('./src/app')
const http = require('http')
const server = http.createServer(app)

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})