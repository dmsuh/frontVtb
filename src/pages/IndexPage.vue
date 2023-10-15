<template>
  <q-page class="row items-center justify-evenly">
    <div style="height: 20vh" class="scroll">
      <q-card style="" class="flex column scroll" :key="feature" v-for="feature in features">
        <q-card-section>
          <div style="width: 400px;" class="flex row ">
            <div>
              <label>
                Название отделения: {{feature.name}}
              </label>
              <label>
                <br>
                Адресс: {{feature.address}}
                <br>
              </label>
              <label> Расстояние: {{ calcCrow(myCord[1],myCord[0],feature.longitude, feature.latitude).toFixed(1) }}</label>
            </div>
            <div class="flex self-end">Нагрузка: {{(feature.queue===null||feature.queue===0)?0:feature.window/feature.queue}}</div>
            <q-btn @click="build([feature.longitude, feature.latitude])">Построить маршрут</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-btn @click="dialog=!dialog">Фильтры</q-btn>
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Выберите услуг(у/и):</div>
        </q-card-section>
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <h5>Переводы</h5>
          <q-checkbox v-model="payload.transferRub"> Переводы в рублях</q-checkbox>
          <q-checkbox v-model="payload.transferIno"> Переводы в иностранной валюте</q-checkbox>
          <h5>Банковские карты</h5>
          <q-checkbox v-model="payload.creditCard"> Кредитные карты</q-checkbox>
          <q-checkbox v-model="payload.debitCard"> Дебетовые карты</q-checkbox>
          <h5> Ценные бумаги/инвестиции</h5>
          <q-checkbox v-model="payload.broker"> Брокерское обслуживание</q-checkbox>
          <q-checkbox v-model="payload.veksels"> Векселя банка</q-checkbox>
          <q-checkbox v-model="payload.depService">  Депозитарное обслуживание</q-checkbox>
          <q-checkbox v-model="payload.trustManagment">  Доверительное управление</q-checkbox>
          <q-checkbox v-model="payload.investProduct">  Инвестиционные продукты</q-checkbox>
          <q-checkbox v-model="payload.operPIF"> Операции с паями ПИФ</q-checkbox>
          <q-checkbox v-model="payload.valueSSSR"> Осуществление выкупа ценных бумаг СССР</q-checkbox>
          <q-checkbox v-model="payload.npfVTB"> Услуги НПФ ВТБ</q-checkbox>
          <h5>Кредиты</h5>
          <q-checkbox v-model="payload.ipCreditsConsult">  Ипотечные кредиты (консультирование)</q-checkbox>
          <q-checkbox v-model="payload.ipCreditsCreate"> Ипотечные кредиты (оформление, выдача)</q-checkbox>
          <q-checkbox v-model="payload.potCreditsConsult">  Потребительские кредиты (консультирование, прием документов)</q-checkbox>
          <q-checkbox v-model="payload.potCreditsCreate">  Потребительские кредиты (оформление, выдача)</q-checkbox>
          <q-checkbox v-model="payload.autoCredits"> Автокредиты (оформление, выдача)</q-checkbox>
          <q-checkbox v-model="payload.milletaryCredits">  Военная ипотека (оформление, выдача)</q-checkbox>
          <q-checkbox v-model="payload.studyCredits">  Образовательный кредит (оформление, выдача)</q-checkbox>
          <h5>Платежи</h5>
          <q-checkbox v-model="payload.paymentsYR">Платежи в пользу ЮЛ</q-checkbox>
          <q-checkbox v-model="payload.LC">Аккредитивы</q-checkbox>
          <q-checkbox v-model="payload.sscrow">Эскроу-счет</q-checkbox>
          <h5> Другие услуги</h5>
          <q-checkbox v-model="payload.UDBO"> Открытие УДБО</q-checkbox>
          <q-checkbox v-model="payload.operationGJC"> Операции, связанные с обслуживанием госпрограмм (ГЖС)</q-checkbox>
          <q-checkbox v-model="payload.operationSubsid">Операции, связанные с обслуживанием региональных программ (субсидии)</q-checkbox>
          <h5>Страхование</h5>
          <q-checkbox v-model="payload.operationInno"> Операции с наличной иностранной валютой</q-checkbox>
          <q-checkbox v-model="payload.specialBill"> Операции с наличной иностранной валютой</q-checkbox>
          <h5>Вклады, металлы, сейфы</h5>
          <q-checkbox v-model="payload.saveCert">Сберегательные сертификаты банка</q-checkbox>
          <q-checkbox v-model="payload.moneyDragBuy">Монеты из драгоценных металлов (покупка)</q-checkbox>
          <q-checkbox v-model="payload.moneyDragSell">Монеты из драгоценных металлов (продажа)</q-checkbox>
          <q-checkbox v-model="payload.metBill">Обезличенные металлические счета</q-checkbox>
          <q-checkbox v-model="payload.dragMetBuy">Драгоценные металлы в слитках (покупка)</q-checkbox>
          <q-checkbox v-model="payload.dragMetSell">Драгоценные металлы в слитках (продажа)</q-checkbox>
          <q-checkbox v-model="payload.safeRent">Предоставление в аренду индивидуальных сейфов</q-checkbox>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Применить" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card v-if="multiRouteValue!==null" style=" z-index: 1000; left: 100px; width: 160px; position: absolute">
      <q-card-section class="flex">
        <label> {{multiRouteValue[0]}}</label>
        <div :key="ind" v-for="(item,ind) in multiRouteValue">
          <label v-if="ind!==0" >{{item}}</label>
        </div>
      </q-card-section>

    </q-card>
    <q-no-ssr>
      <div id="map"></div>
    </q-no-ssr>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import {computed, onMounted, ref, watch} from 'vue';
import axios from "axios";
import { loadYmap } from 'vue-yandex-maps';
import {useQuasar} from "quasar";
const calcCrow =(lat1, lon1, lat2, lon2)=>
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
// Converts numeric degrees to radians
const toRad =(Value) =>
{
  return Value * Math.PI / 180;
}
const map = ref(null)
const multiRouteValue = ref(null)
const coordinate = ref([
  45.93221984255815,
  51.534153702109194
])
const payload = ref({})
const dialog = ref(false)
const time = ref([])
const $q = useQuasar()
const secret = ref('')
const processRoute= function (index, route) {
  // Берем из таблицы обработчик для данного типа маршрута и применяем его.

  return (index + 1) + ". " + createCommonRouteOutput(route);
}
const createCommonRouteOutput= function (route) {
  time.value.push(route.properties.get("duration").text)
  return "Протяженность маршрута: " + route.properties.get("distance").text + " " +
    "Время в пути: " + route.properties.get("duration").text;
}
const build = async (cordOtd)=>{
  console.log(cliMap)
  const deleteElement = document.querySelector("#map");

  deleteElement.innerHTML = '';
  const multiRouteModel = new cliMap.value.multiRouter.MultiRouteModel([
      [myCord.value],
      cordOtd
    ], {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: false,
      boundsAutoApply: true
    }),

    // Создаём выпадающий список для выбора типа маршрута.
    routeTypeSelector = new cliMap.value.control.ListBox({
      data: {
        content: 'Как добраться'
      },
      items: [
        new cliMap.value.control.ListBoxItem({data: {content: "Авто"},state: {selected: true}}),
        new cliMap.value.control.ListBoxItem({data: {content: "Общественным транспортом"}}),
        new cliMap.value.control.ListBoxItem({data: {content: "Пешком"}})
      ],
      options: {
        itemSelectOnClick: false
      }
    }),
    // Получаем прямые ссылки на пункты списка.
    autoRouteItem = routeTypeSelector.get(0),
    masstransitRouteItem = routeTypeSelector.get(1),
    pedestrianRouteItem = routeTypeSelector.get(2);

  // Подписываемся на события нажатия на пункты выпадающего списка.
  autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });
  masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
  pedestrianRouteItem.events.add('click', function (e) { changeRoutingMode('pedestrian', e.get('target')); });



  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new cliMap.value.Map('map', {
      center: [55.750625, 37.626],
      zoom: 7,
      controls: [routeTypeSelector]
    }, {
      buttonMaxWidth: 300
    }),

    // Создаем на основе существующей модели мультимаршрут.
    multiRoute = new cliMap.value.multiRouter.MultiRoute(multiRouteModel, {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: false,
      boundsAutoApply: true
    });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
  console.log( multiRouteModel)
  setTimeout(()=>{
    var routes = multiRouteModel.getRoutes(),
    result = [];
    if (routes.length) {
      result.push("Всего маршрутов: " + routes.length + ".");
      for (var i = 0, l = routes.length; i < l; i++) {
        result.push(processRoute(i, routes[i]));
      }
    } else {
      result.push("Нет маршрутов.");
    }
    multiRouteValue.value=result
    return result.join("<br/>");

  },2000)


  function changeRoutingMode(routingMode, targetItem) {
    multiRouteModel.setParams({ routingMode: routingMode }, true);

    // Отменяем выбор элементов.
    autoRouteItem.deselect();
    masstransitRouteItem.deselect();
    pedestrianRouteItem.deselect();

    // Выбираем элемент и закрываем список.
    targetItem.select();
    routeTypeSelector.collapse();
    setTimeout(()=>{
      var routes = multiRouteModel.getRoutes(),
        result = ["Данные успешно получены."];
      if (routes.length) {
        result.push("Всего маршрутов: " + routes.length + ".");
        for (var i = 0, l = routes.length; i < l; i++) {
          result.push(processRoute(i, routes[i]));
        }
      } else {
        result.push("Нет маршрутов.");
      }
      multiRouteValue.value=result
      return result.join("<br/>");

    },2000)
  }
}
const suggestVal = ref(<string[]>[])
const suggest = (value: string)=>{
  if (secret.value==='Фиксики'){
    const arr = [] as string[]
    suggestVal.value= []
    axios.get(`https://suggest-maps.yandex.ru/v1/suggest?apikey=b0984d9c-3daf-439b-829e-0b9ea881d6a3&text=${value}&types=locality`).then(response=>{
      console.log(response);
      response.data.results.forEach(city=>{
        arr.push(city.title.text)
      })
      suggestVal.value.push(...arr)
      console.log(response);
    })


  }
  /*axios.get('https://headless-cms3.vtb.ru/projects/atm/models/default/items/departments').then(response =>{
        console.log(response);
        features.value = response.data.branches
      })
      <q-card :key="item" v-for="item in features">
      <q-card-section> {{item.properties.CompanyMetaData.Categories[0].name}}</q-card-section>
      <q-card-section>Адресс: {{item.properties.description}}</q-card-section>
      <q-card-section>{{item}}</q-card-section>
    </q-card>
      */
}
const features =ref([])
const value = ref(null)
const city = ref(null)
const getBanks =async ()=> {
  console.log(map);
    axios.get(`http://localhost:8080/api/all`)
      .then(response => {
        features.value=response.data
        console.log(response.data);
      })
  console.log('Вывод');
}
const checkMyLocation =async (e)=>{
  value.value=e

  console.log('------');
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
    console.log(position.coords);

  });
}

watch(()=>coordinate.value, (newVal)=>{
  console.log(newVal);
  console.log(value.value.children[1]._props.title);
  value.value.children[1]._props.title=newVal
})
const myCord =ref([
  45.93221984255815,
  51.534153702109194
])
const init =(e)=>{
  console.log(e);
  value.value=e
}
const cliMap = ref({})
onMounted(async ()=>{
  await getBanks()
  const settings = {
    apiKey:
      'eb81f49d-9d2a-490e-99fd-8743cfee4a7a', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'longlat', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1', // Версия Я.Карт
  };
  await loadYmap(settings);
   cliMap.value =ymaps


  var location = ymaps.geolocation.get({
    mapStateAutoApply: true
  });

// Асинхронная обработка ответа.
  location.then(
    function(result) {
      // Добавление местоположения на карту.
      myCord.value=result.geoObjects.position
      myMap.geoObjects.add(result.geoObjects)
    },
    function(err) {
      console.log('Ошибка: ' + err)
    }
  );
})

</script>
