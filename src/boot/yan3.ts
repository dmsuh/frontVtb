import { boot } from 'quasar/wrappers';
import YmapPlugin from 'vue-yandex-maps';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  const settings = {
    apiKey:
      'eb81f49d-9d2a-490e-99fd-8743cfee4a7a', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'longlat', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1', // Версия Я.Карт
  };
  app.use(YmapPlugin, settings)
});
