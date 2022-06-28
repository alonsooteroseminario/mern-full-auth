require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
}

const app = express()
app.use(express.json({ limit: '50mb' }));

app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use("/api/oauth", require('./routes/oauth'));
app.use("/api/datamanagement", require("./routes/datamanagement"));
app.use("/api/modelderivative",require("./routes/modelderivative"));
// Routes Basic Viewer
app.use('/api/forge/oauth', require('./routes/routesBasic/oauth'));
app.use('/api/forge/oss', require('./routes/routesBasic/oss'));
app.use('/api/forge/modelderivative', require('./routes/routesBasic/modelderivative'));
// Routes BIM360 Viewer
app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}));
app.use('/api/forge', require('./routes/routesBIM360/oauth'));
app.use('/api/forge', require('./routes/routesBIM360/datamanagement'));
app.use('/api/forge', require('./routes/routesBIM360/user'));

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})