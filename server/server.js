const express = require('express');

const cors = require('cors');
const { rootRouter } = require('./src/routes/index.route')

const app = express();

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use('/posts', express.static('posts'));
app.use(rootRouter)



const PORT = process.env.PORT || 3000

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`SERVER started at http://localhost:${PORT}..`)
    })
}



startServer()