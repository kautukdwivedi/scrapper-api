import express from 'express';
const app = express()
let port = process.env.PORT || 3000;

import dataRoutes from './routes/data.js'

app.use('/data', dataRoutes);

app.get('/', (req, res) => {
    res.send('Medium Crawler API')
})

app.listen(port, () => {
    console.log('server started at ', port);
});

export default app;