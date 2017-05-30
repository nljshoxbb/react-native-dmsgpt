import appModel from './app';
import router from './router';
import main from './main';
import user from './user';


export function registerModels(app: any) {
  app.model(appModel);
  app.model(router);
  app.model(main);
  app.model(user);
}
