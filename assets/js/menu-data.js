/* ============================================================
   МЕНЮ — редактирайте ТУК.

   ⚠️  ПРИМЕРНО МЕНЮ. Ястията са подбрани по действителни
   споменавания от гости и типична родопска кухня, но цени,
   грамажи и наличности НЕ са потвърдени от механата.
   Заменете ги с реалното меню преди публикуване (README.md).

   Цените са в ЕВРО. Сайтът показва автоматично и левовата
   равностойност по фиксирания курс 1 € = 1,95583 лв.

   Полета на всяко ястие:
   - name / desc: на български и английски
   - price: число в евро  ИЛИ  priceNote: текст (напр. „по заявка“)
   - weight: грамаж, напр. "300 г"
   - tags: fire (на жив огън) | classic (родопска класика)
           | share (за споделяне) | order (по заявка) | spec (специалитет)
   - allergens: Г глутен · М мляко · Я яйца · Р риба · ЯД ядки
   - available: false → показва се като „изчерпано“, без да се трие
   - featured: true → показва се в акцентите на началната страница
   ============================================================ */

window.MENU = {
  categories: [
    {
      id: "salati",
      name: { bg: "Салати", en: "Salads" },
      items: [
        {
          name: { bg: "Шопска салата", en: "Shopska salad" },
          desc: { bg: "Домати, краставици, печена чушка, сирене", en: "Tomatoes, cucumbers, roasted pepper, white brine cheese" },
          price: 4.6, weight: "400 г", allergens: ["М"]
        },
        {
          name: { bg: "Овчарска салата", en: "Shepherd's salad" },
          desc: { bg: "Домати, краставици, шунка, кашкавал, яйце, гъби", en: "Tomatoes, cucumbers, ham, yellow cheese, egg, mushrooms" },
          price: 5.7, weight: "450 г", allergens: ["М", "Я"]
        },
        {
          name: { bg: "Зеле с моркови", en: "Cabbage and carrot slaw" },
          desc: { bg: "Тънко нарязано, с олио и лимон", en: "Finely shredded, with oil and lemon" },
          price: 3.4, weight: "300 г", allergens: []
        },
        {
          name: { bg: "Печени чушки с чесън", en: "Roasted peppers with garlic" },
          desc: { bg: "Обелени червени чушки, магданоз, домашен винегрет", en: "Peeled red peppers, parsley, house vinaigrette" },
          price: 4.2, weight: "300 г", allergens: []
        }
      ]
    },
    {
      id: "supi",
      name: { bg: "Супи", en: "Soups" },
      items: [
        {
          name: { bg: "Шкембе чорба", en: "Tripe soup" },
          desc: { bg: "С люта чушка и оцет с чесън", en: "Served with hot pepper and garlic vinegar" },
          price: 3.9, weight: "300 мл", allergens: ["М"]
        },
        {
          name: { bg: "Пилешка супа", en: "Chicken soup" },
          desc: { bg: "Със застройка и фиде", en: "With egg-yogurt liaison and vermicelli" },
          price: 3.4, weight: "300 мл", allergens: ["Г", "М", "Я"]
        },
        {
          name: { bg: "Гъбена супа с манатарки", en: "Porcini mushroom soup" },
          desc: { bg: "Родопски манатарки, картофи, копър", en: "Rhodope porcini, potatoes, dill" },
          price: 4.4, weight: "300 мл", allergens: ["М"], tags: ["classic"]
        },
        {
          name: { bg: "Таратор", en: "Tarator" },
          desc: { bg: "Студена млечна супа с краставица и орехи — сезонно", en: "Cold yogurt soup with cucumber and walnuts — seasonal" },
          price: 2.9, weight: "300 мл", allergens: ["М", "ЯД"]
        }
      ]
    },
    {
      id: "predyastia",
      name: { bg: "Топли предястия", en: "Warm starters" },
      items: [
        {
          name: { bg: "Манатарки на тиган", en: "Pan-fried porcini" },
          desc: { bg: "С масло, чесън и чубрица", en: "With butter, garlic and summer savory" },
          price: 7.9, weight: "250 г", allergens: ["М"], tags: ["classic"]
        },
        {
          name: { bg: "Сирене по шопски", en: "Shopska-style baked cheese" },
          desc: { bg: "В гювече, с домати, чушки и яйце", en: "In a clay pot with tomatoes, peppers and egg" },
          price: 4.9, weight: "300 г", allergens: ["М", "Я"]
        },
        {
          name: { bg: "Кашкавал пане", en: "Breaded yellow cheese" },
          desc: { bg: "С боровинково сладко", en: "With blueberry preserve" },
          price: 5.4, weight: "200 г", allergens: ["Г", "М", "Я"]
        },
        {
          name: { bg: "Пресни картофки със сирене", en: "New potatoes with cheese" },
          desc: { bg: "Сотирани с масло и копър", en: "Sautéed with butter and dill" },
          price: 4.4, weight: "300 г", allergens: ["М"]
        },
        {
          name: { bg: "Калмари на скара", en: "Grilled calamari" },
          desc: { bg: "С лимон и зехтин", en: "With lemon and olive oil" },
          price: 8.9, weight: "250 г", allergens: ["Р"], tags: ["fire"]
        }
      ]
    },
    {
      id: "rodopski",
      name: { bg: "Родопски ястия", en: "Rhodope dishes" },
      note: {
        bg: "Готвени бавно, по местни рецепти — това е кухнята, заради която се връщат гостите.",
        en: "Slow-cooked local recipes — the kitchen guests come back for."
      },
      items: [
        {
          name: { bg: "Дроб по Печински", en: "Pechinsko-style liver" },
          desc: { bg: "Специалитетът на къщата: крехък дроб с лук, гъби и билки, запечен в гювече", en: "The house specialty: tender liver with onions, mushrooms and herbs, baked in a clay pot" },
          price: 7.2, weight: "350 г", allergens: ["М"], tags: ["spec", "classic"], featured: true
        },
        {
          name: { bg: "Смилянски боб в гювече", en: "Smilyan beans in a clay pot" },
          desc: { bg: "Едър фасул от Смилян, задушен с чушки и джоджен", en: "Large Smilyan beans stewed with peppers and spearmint" },
          price: 5.4, weight: "400 г", allergens: [], tags: ["classic"], featured: true
        },
        {
          name: { bg: "Пататник", en: "Patatnik" },
          desc: { bg: "Настъргани картофи с лук и чубрица, изпечени на плоча", en: "Grated potatoes with onion and savory, baked on a hot plate" },
          price: 4.9, weight: "300 г", allergens: ["М", "Я"], tags: ["classic"]
        },
        {
          name: { bg: "Родопски клин", en: "Rhodope klin pie" },
          desc: { bg: "Точени кори с ориз, яйца и сирене", en: "Hand-rolled pastry with rice, eggs and white cheese" },
          price: 4.9, weight: "300 г", allergens: ["Г", "М", "Я"], tags: ["classic"]
        },
        {
          name: { bg: "Качамак със сирене и пръжки", en: "Kachamak with cheese and cracklings" },
          desc: { bg: "Царевичен качамак, разбъркан с масло", en: "Cornmeal porridge stirred with butter" },
          price: 4.6, weight: "350 г", allergens: ["М"], tags: ["classic"]
        }
      ]
    },
    {
      id: "skara",
      name: { bg: "Скара и ястия на жар", en: "Grill and live-fire dishes" },
      note: {
        bg: "Всичко от скарата се приготвя на жар от дърва.",
        en: "Everything from the grill is cooked over a wood-ember fire."
      },
      items: [
        {
          name: { bg: "Кебапче", en: "Kebapche" },
          desc: { bg: "Свинско, ръчно оформено", en: "Hand-formed pork" },
          price: 1.8, weight: "60 г / бр.", allergens: [], tags: ["fire"]
        },
        {
          name: { bg: "Кюфте", en: "Kyufte" },
          desc: { bg: "Свинско с лук и кимион", en: "Pork with onion and cumin" },
          price: 1.9, weight: "60 г / бр.", allergens: [], tags: ["fire"]
        },
        {
          name: { bg: "Телешко шишче", en: "Veal skewer" },
          desc: { bg: "Маринован телешки джолан на жар", en: "Marinated veal cooked over embers" },
          price: 8.9, weight: "200 г", allergens: [], tags: ["fire"]
        },
        {
          name: { bg: "Свинска вешалица", en: "Pork veshalitsa" },
          desc: { bg: "Каре без кост, с билкова марината", en: "Boneless pork loin in an herb marinade" },
          price: 7.4, weight: "250 г", allergens: [], tags: ["fire"]
        },
        {
          name: { bg: "Пилешко филе на жар", en: "Grilled chicken fillet" },
          desc: { bg: "С лимон и розмарин", en: "With lemon and rosemary" },
          price: 6.9, weight: "250 г", allergens: [], tags: ["fire"]
        },
        {
          name: { bg: "Мешана скара „Печинско“", en: "Pechinsko mixed grill" },
          desc: { bg: "Кебапче, кюфте, вешалица, пилешко и шишче — за двама", en: "Kebapche, kyufte, veshalitsa, chicken and a skewer — for two" },
          price: 16.9, weight: "600 г", allergens: [], tags: ["fire", "share"]
        }
      ]
    },
    {
      id: "osnovni",
      name: { bg: "Основни ястия", en: "Mains" },
      items: [
        {
          name: { bg: "Агнешко чеверме", en: "Lamb cheverme" },
          desc: { bg: "Цяло агне, печено бавно на жив огън. За компании и празници — с предварителна заявка", en: "Whole lamb slow-roasted on a spit over live fire. For groups and occasions — advance order required" },
          priceNote: { bg: "по заявка", en: "advance order" },
          weight: "на килограм", allergens: [], tags: ["fire", "share", "order"], featured: true
        },
        {
          name: { bg: "Лаврак на скара", en: "Grilled sea bass" },
          desc: { bg: "Цяла риба, с лимон и билково масло", en: "Whole fish with lemon and herb butter" },
          price: 11.9, weight: "400 г", allergens: ["Р"], tags: ["fire"]
        },
        {
          name: { bg: "Свински джолан с гарнитура", en: "Pork knuckle with sides" },
          desc: { bg: "Бавно печен, с картофи и зеле", en: "Slow-roasted, with potatoes and cabbage" },
          price: 10.9, weight: "600 г", allergens: [], tags: ["share"]
        },
        {
          name: { bg: "Пиле на плоча", en: "Chicken on a hot plate" },
          desc: { bg: "С манатарки, лук и кашкавал", en: "With porcini, onions and yellow cheese" },
          price: 8.4, weight: "400 г", allergens: ["М"]
        }
      ]
    },
    {
      id: "peshta",
      name: { bg: "Хляб и от пещта", en: "Bread and from the oven" },
      items: [
        {
          name: { bg: "Пърленка с масло", en: "Parlenka with butter" },
          desc: { bg: "Топла, направо от пещта", en: "Warm, straight from the oven" },
          price: 1.9, weight: "180 г", allergens: ["Г", "М"], tags: ["fire"]
        },
        {
          name: { bg: "Пърленка със сирене и кашкавал", en: "Parlenka with two cheeses" },
          desc: { bg: "Най-поръчваната на масата", en: "The most ordered thing on the table" },
          price: 3.2, weight: "250 г", allergens: ["Г", "М"], tags: ["fire", "share"]
        },
        {
          name: { bg: "Чеснова пърленка", en: "Garlic parlenka" },
          desc: { bg: "С чесново масло и магданоз", en: "With garlic butter and parsley" },
          price: 2.4, weight: "200 г", allergens: ["Г", "М"], tags: ["fire"]
        },
        {
          name: { bg: "Калцоне от пещта", en: "Oven-baked calzone" },
          desc: { bg: "Затворена пица с шунка, гъби и кашкавал", en: "Folded pizza with ham, mushrooms and cheese" },
          price: 7.4, weight: "450 г", allergens: ["Г", "М"]
        }
      ]
    },
    {
      id: "deserti",
      name: { bg: "Десерти", en: "Desserts" },
      items: [
        {
          name: { bg: "Тирамису на къщата", en: "House tiramisu" },
          desc: { bg: "По рецепта на кухнята", en: "Made in-house" },
          price: 3.9, weight: "180 г", allergens: ["Г", "М", "Я"]
        },
        {
          name: { bg: "Палачинки с боровинково сладко", en: "Pancakes with blueberry preserve" },
          desc: { bg: "С домашно сладко от планински боровинки", en: "With preserve from mountain blueberries" },
          price: 2.9, weight: "2 бр.", allergens: ["Г", "М", "Я"]
        },
        {
          name: { bg: "Десерт на деня", en: "Dessert of the day" },
          desc: { bg: "Попитайте сервитьора какво е приготвила кухнята", en: "Ask your waiter what the kitchen has prepared" },
          priceNote: { bg: "попитайте", en: "ask us" },
          weight: "", allergens: []
        }
      ]
    },
    {
      id: "bezalkoholni",
      name: { bg: "Безалкохолни напитки", en: "Soft drinks" },
      items: [
        {
          name: { bg: "Айрян", en: "Ayran" },
          desc: { bg: "", en: "" },
          price: 1.2, weight: "300 мл", allergens: ["М"]
        },
        {
          name: { bg: "Минерална вода", en: "Mineral water" },
          desc: { bg: "", en: "" },
          price: 1.0, weight: "500 мл", allergens: []
        },
        {
          name: { bg: "Натурален сок", en: "Fruit juice" },
          desc: { bg: "", en: "" },
          price: 1.6, weight: "250 мл", allergens: []
        },
        {
          name: { bg: "Кафе еспресо", en: "Espresso" },
          desc: { bg: "", en: "" },
          price: 1.5, weight: "60 мл", allergens: []
        },
        {
          name: { bg: "Билков чай", en: "Herbal tea" },
          desc: { bg: "Планински билки", en: "Mountain herbs" },
          price: 1.8, weight: "250 мл", allergens: []
        }
      ]
    },
    {
      id: "alkohol",
      name: { bg: "Вино, ракия и бира", en: "Wine, rakia and beer" },
      items: [
        {
          name: { bg: "Гроздова ракия", en: "Grape rakia" },
          desc: { bg: "", en: "" },
          price: 2.2, weight: "50 мл", allergens: []
        },
        {
          name: { bg: "Сливова ракия", en: "Plum rakia" },
          desc: { bg: "", en: "" },
          price: 2.2, weight: "50 мл", allergens: []
        },
        {
          name: { bg: "Бира „Пиринско“", en: "Pirinsko beer" },
          desc: { bg: "Светло пиво", en: "Pale lager" },
          price: 2.4, weight: "500 мл", allergens: ["Г"]
        },
        {
          name: { bg: "„Будвайзер Будвар“", en: "Budweiser Budvar" },
          desc: { bg: "Чешки лагер", en: "Czech lager" },
          price: 2.6, weight: "330 мл", allergens: ["Г"]
        },
        {
          name: { bg: "Вино от региона — чаша", en: "Regional wine — glass" },
          desc: { bg: "Червено или бяло; попитайте за селекцията", en: "Red or white; ask about the selection" },
          price: 2.8, weight: "150 мл", allergens: []
        },
        {
          name: { bg: "Вино от региона — бутилка", en: "Regional wine — bottle" },
          desc: { bg: "", en: "" },
          price: 12.0, weight: "750 мл", allergens: []
        }
      ]
    }
  ]
};
