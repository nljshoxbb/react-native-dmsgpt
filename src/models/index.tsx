import appModel from './app';
import router from './router';
import main from './main';
import user from './user';
import fruitList from './fruitList';
import article from './article';
import purchase from './purchase';





export function registerModels(app: any) {
  app.model(appModel);
  app.model(router);
  app.model(main);
  app.model(user);
  app.model(fruitList);
  app.model(purchase);
  app.model(article);

}
