const app = require('./src/app');

app.listen(process.env.SERVE_PORT || 6969, () => {
    console.log(`Server running at port 6969`)
})