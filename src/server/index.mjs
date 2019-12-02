import { dirname, join as joinPath } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import templateEngine from 'express-es6-template-engine';

import routeRoot from './routes/root';

const PORT = process.env.PORT || 3000;
const DIR = dirname(fileURLToPath(import.meta.url));

const app = express();

app.engine('html', templateEngine);
app.set('views', joinPath(DIR, 'views'));
app.set('view engine', 'html');

app.get('/', routeRoot);

app.use(express.static('./static'));

app.listen(
    PORT,
    () => process.stdout.write(`Server started on http://0.0.0.0:${PORT}\n`)
);
