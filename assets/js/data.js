/* ============================================================
   ДАННИ ЗА САЙТА — редактирайте ТУК, без да пипате кода.
   Пълни указания: README.md в главната папка.
   ============================================================ */

window.SITE = {

  /* --- Демо режим ---------------------------------------------
     true  = показва дискретни бележки „примерно съдържание“
     false = за публикуване, СЛЕД като менюто, отзивите и
             работното време са потвърдени от механата.        */
  demo: true,

  /* --- Контакти ----------------------------------------------- */
  phone: "089 369 8008",
  phoneIntl: "+359893698008",
  email: "mehana.pechinsko@gmail.com",
  facebook: "https://www.facebook.com/mehanapechinsko",
  // mapsUrl отваря истинската страница на механата в Google (по неин CID),
  // а не само точка с координати — оттам са отзивите, снимките и часовете.
  mapsUrl: "https://www.google.com/maps?cid=12844904807683056575",
  // directionsUrl дава упътване стъпка по стъпка до самата механа.
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.4497086,24.9770085",
  mapsEmbed: "https://www.google.com/maps?q=41.4497086,24.9770085&hl=bg&z=14&output=embed",
  coords: { lat: 41.4497086, lng: 24.9770085 },
  address: {
    bg: "Проход Печинско, път III-867 между Мадан и Златоград, общ. Златоград, 4988",
    en: "Pechinsko Pass, road III-867 between Madan and Zlatograd, 4988, Bulgaria"
  },

  /* --- Временно съобщение (лентата най-горе) -------------------
     active: false → лентата не се показва.                      */
  notice: {
    active: true,
    bg: "За агнешко чеверме е необходима предварителна заявка по телефона.",
    en: "Lamb cheverme requires advance ordering by phone."
  },

  /* --- Работно време -------------------------------------------
     ВАЖНО: попълнете САМО след потвърждение от механата.
     Оставете hours: null, докато няма потвърждение — сайтът
     ще покаже „позвънете за актуално работно време“.
     Пример:
     hours: [
       { d: { bg: "Понеделник", en: "Monday" }, t: { bg: "почивен ден", en: "closed" } },
       { d: { bg: "Вторник – Петък", en: "Tue – Fri" }, t: { bg: "11:00 – 23:00", en: "11:00 – 23:00" } },
       { d: { bg: "Събота – Неделя", en: "Sat – Sun" }, t: { bg: "11:00 – 23:00", en: "11:00 – 23:00" } }
     ]                                                            */
  hours: null,

  /* --- Резервации ----------------------------------------------
     endpoint: адрес, на който формата изпраща заявката
     (напр. Formspree: https://formspree.io/f/XXXXXXX).
     Празно "" = демо режим: формата показва потвърждение,
     но НЕ изпраща нищо.                                          */
  reservation: {
    endpoint: "",
    maxGuestsNote: {
      bg: "За групи над 10 души се обадете по телефона.",
      en: "For groups of 10+, please call us."
    }
  },

  /* --- Отзиви ---------------------------------------------------
     Кратки цитати от реални отзиви в Google.
     ЗАДЪЛЖИТЕЛНО: поискайте одобрение от механата, преди
     сайтът да тръгне на живо (вижте README.md).                 */
  reviews: [
    {
      bg: "Голяма вкусотия беше. Дроб по Печински — номер 1.",
      en: "Delicious food. The Pechinsko-style liver is number one.",
      author: "И. К.",
      source: { bg: "отзив в Google", en: "Google review" }
    },
    {
      bg: "Много вкусна храна, големи порции и любезни собственици.",
      en: "Very tasty food, generous portions and kind owners.",
      author: "К. С.",
      source: { bg: "отзив в Google", en: "Google review" }
    },
    {
      bg: "Невероятно място по пътя от България за Гърция. Страхотна храна.",
      en: "An amazing stop on the road from Bulgaria to Greece. Great food.",
      author: "С. К.",
      source: { bg: "отзив в Google", en: "Google review" }
    },
    {
      bg: "Приятен интериор, чисто и уютно. Автентичен местен стил, бързо обслужване и вкусна храна на съвсем разумни цени.",
      en: "Nice interior, clean and cosy. Local authentic style, fast service and delicious food at very reasonable prices.",
      author: "В. П.",
      source: { bg: "отзив в Google", en: "Google review" }
    }
  ],

  /* --- Галерия --------------------------------------------------
     Реални снимки на механата (обработени) в assets/img/photos/.
     group: mehana | gledka | kuhnia | ogan
     size: m-a … m-g (големина в мозайката)
     pos: незадължително — коя част от кадъра да се вижда (object-position) */
  gallery: [
    { src: "assets/img/photos/fasada-zima.jpg", group: "mehana", size: "m-a", pos: "50% 35%",
      alt: { bg: "Фасадата на механата с изписаното „Механа Печинско“", en: "The tavern facade with the painted 'Mehana Pechinsko' lettering" } },
    { src: "assets/img/photos/terasa-gledka.jpg", group: "gledka", size: "m-b",
      alt: { bg: "Дървената тераса с маси над гористата долина", en: "The wooden terrace with tables above the forested valley" } },
    { src: "assets/img/photos/chorba-kilim.jpg", group: "kuhnia", size: "m-c",
      alt: { bg: "Топла чорба в троянска купа, вино и салата върху родопска черга", en: "Hot soup in a Troyan ceramic bowl, wine and salad on a Rhodope rug" } },
    { src: "assets/img/photos/cheverme-jar.jpg", group: "ogan", size: "m-d",
      alt: { bg: "Чеверме се пече бавно на шиш над жаравата", en: "Cheverme roasting slowly on a spit over the embers" } },
    { src: "assets/img/photos/salon-kamina.jpg", group: "mehana", size: "m-e",
      alt: { bg: "Салонът с камината, дълги маси и карирани покривки", en: "The dining room with the fireplace, long tables and checked tablecloths" } },
    { src: "assets/img/photos/prohod-vecher.jpg", group: "gledka", size: "m-f",
      alt: { bg: "Проходът привечер, гледан от механата", en: "The pass at dusk, seen from the tavern" } },
    { src: "assets/img/photos/drob-parlenki.jpg", group: "kuhnia", size: "m-g",
      alt: { bg: "Дроб по печински с лимон и пърленка от пещта", en: "Pechinsko-style liver with lemon and parlenka flatbread" } },
    { src: "assets/img/photos/rodopi-gledka.jpg", group: "gledka", size: "m-b",
      alt: { bg: "Родопските ридове, гледани от прохода", en: "The Rhodope ridges seen from the pass" } },
    { src: "assets/img/photos/bob-gyuveche.jpg", group: "kuhnia", size: "m-c",
      alt: { bg: "Боб в троянска керамична купа на трапезата", en: "Beans in a Troyan ceramic bowl on the table" } },
    { src: "assets/img/photos/salon-prozorci.jpg", group: "mehana", size: "m-g",
      alt: { bg: "Светлият салон с прозорци към планината", en: "The bright dining room with windows to the mountain" } }
  ],

  galleryGroups: [
    { id: "mehana", bg: "Механата", en: "The tavern" },
    { id: "gledka", bg: "Гледката", en: "The view" },
    { id: "kuhnia", bg: "От кухнята", en: "From the kitchen" },
    { id: "ogan", bg: "На жив огън", en: "Over live fire" }
  ]
};
