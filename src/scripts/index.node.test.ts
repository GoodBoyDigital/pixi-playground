import { Application } from './app/Application';
import { Config } from './app/Config';

const app = new Application(Config);

void app.run();
