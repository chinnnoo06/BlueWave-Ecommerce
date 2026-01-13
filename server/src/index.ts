import server from './server';
import colors from 'colors'
import { PORT as PORTENV} from './config/env';

const PORT = PORTENV || 4000;

server.listen(PORT, () => {
  console.log(colors.cyan.bold(`Servidor escuchando en http://localhost:${PORT}`));
});
