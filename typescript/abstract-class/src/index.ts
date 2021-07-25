import express from 'express';
import { healthRoutes } from './routes/health-routes';

const app = express()
const port = 3000;

app.get('/ping', (req, resp) => {
    resp.send('PONG')
})


app.use(healthRoutes)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})