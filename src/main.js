import app from 'src/app';
import AppContainer from './app-container';

if (app.config.debug) {
  window.app = app;
}

app.vue.init('#app', AppContainer);
