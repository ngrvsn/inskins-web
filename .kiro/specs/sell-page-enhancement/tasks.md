# План реализации доработки страницы продажи скинов

- [x] 1. Создать компонент SteamLinkInput для ввода ссылки на обмен Steam

  - Создать компонент с валидацией ссылки через react-hook-form
  - Реализовать автокоррекцию протокола https://
  - Добавить валидацию формата steamcommunity.com
  - Стилизовать согласно дизайну с выделением слова "ссылку" зеленым цветом
  - _Требования: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Создать компонент SkinsManager с фильтрами и сеткой скинов

  - Создать основной компонент с внутренним состоянием для фильтров и выбора скинов
  - Реализовать панель фильтров с выпадающим списком игр, поиском, сортировкой, чекбоксом "Выбрать все" и кнопкой обновления
  - Добавить анимацию поворота стрелки для выпадающих списков
  - Реализовать сетку скинов используя существующий SkinCard компонент
  - Добавить логику множественного выбора скинов с обновлением состояния
  - Стилизовать панель фильтров и сетку согласно дизайну
  - _Требования: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4_

- [ ] 3. Создать компонент PaymentSidebar для блока оплаты

  - Создать боковую панель с отображением выбранных скинов и общей суммы
  - Интегрировать селектор валюты с dropdown аналогично BalanceModal
  - Добавить отображение всех способов оплаты используя PaymentCard компоненты
  - Реализовать информационный блок о Steam Trade Protection
  - Добавить кнопку "ПРОДОЛЖИТЬ" с динамической суммой
  - Стилизовать компонент в стиле BalanceModal
  - _Требования: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 4. Создать компонент InfoSection с информационным текстом

  - Создать простой компонент с текстом о преимуществах сервиса INSKINS
  - Стилизовать текст согласно дизайну (белый цвет, SF Pro Text, 14px)
  - _Требования: 6.1, 6.2, 6.3_

  - [ ] 4.5. Все таки вытащить из СкинсМенеджер в единый файл юай компонента выбор игры, поиск, сортировку и тд

  - Единый файл с константными экспортами компонентов
  - SkinsManager переименовать в SkinsGrid папку и файлы
  - интегрировать юай компоненты, ну там пропсы вся хуйня, сохранив верстку в скинс грид как ранее была когда был скинс манагер единый

- [x] 5. Обновить страницу /sell с новыми компонентами

- Страница уже существует, просто сейчас какая то хуйня с маршрутизацией. Когда я нажимаю на маркет и "Продать", должна она открываться, а ща мы так и висим на странице маркета

  - Добавить Breadcrumbs с путем "Главная > Продать скины"
  - Добавить PageTitle с заголовком "Продать скины"
  - Интегрировать SteamLinkInput компонент
  - Создать двухколоночный макет с SkinsGrid и PaymentSidebar
  - Добавить InfoSection в конец страницы
  - Реализовать передачу данных между компонентами через состояние страницы
  - _Требования: 1.1, 1.2, 1.3_

- [ ] 6. Добавить мок данные для скинов

  - Расширить существующие мок данные из RecentDeals
  - Добавить поля game, status для фильтрации
  - Создать больше тестовых данных для демонстрации функционала
  - _Требования: 4.1, 4.2_

- [ ] 7. Создать стили для всех новых компонентов

  - SteamLinkInput, SkinsGrid, PaymentSidebar, InfoSection, юай компоненты использующиеся в гриде
  - Сверить все стили согласно детальным спецификациям из дизайна
  - Левому контейнеру мы макс ширину 1200 задаем
  - Пеймент сайдбар вообще не соответсткует. Бэк должен быть border-radius: 16px;
    background: var(--inskins-bg-panel, rgba(19, 20, 25, 0.60));
    сверху Выбрано 0 (зеленый факт количепство) на сумму, отделительная вертикальная полоска, border-right: 1px solid var(--inskins-border, #2B2B2B);, справа переключатель валюты
    Ниже сумма
    color: var(--Colors-Neutral-colorWhite, #FFF);
    text-align: center;
    font-family: "SF Pro Text";
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 34px; /_ 141.667% _/
    И под ней
    border-bottom: 1px solid var(--inskins-border, #2B2B2B);

Дальше Выберите способ оплаты: color: #FFF;
font-family: "SF Pro Text";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; /_ 157.143% _/
Дальше предупреждение с зеленым варнингом
Из-за новых правил Steam Trade Protection, выплата за скины будет произведена через 8 дней (после 5.08.2025 14:00)
color: var(--Colors-Neutral-colorWhite, #FFF);
font-family: var(--Typography-Font-Family-fontFamily, "SF Pro Text");
font-size: 12px;
font-style: normal;
font-weight: var(--Typography-Font-Weight-fontWeightNormal, 400);
line-height: 18px; /_ 150% _/
"Steam Trad..."
color: var(--inskins-green, #49AA19);
font-family: var(--Typography-Font-Family-fontFamily, "SF Pro Text");
font-size: 12px;
font-style: normal;
font-weight: var(--Typography-Font-Weight-fontWeightNormal, 400);
line-height: 18px;
text-decoration-line: underline;
text-decoration-style: solid;
text-decoration-skip-ink: none;
text-decoration-thickness: auto;
text-underline-offset: auto;
text-underline-position: from-font;

Дальше карточки методов в 3 колонки
Снизу К выплате: color: #FFF;
font-family: "SF Pro Text";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 22px; /_ 137.5% _/
₽ сумма color: var(--inskins-green, #49AA19);
font-family: "SF Pro Text";
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 22px; /_ 137.5% _/
Белая инфо иконка
И кнопка зеленая Продолжить

- _Требования: все требования по стилизации_

- [ ] 7. доработки

- SteamLinkInput должен тянуться на всю доступную ширину, для той части где он находится это 1200пикс. Тоесть, можешь его убрать в LeftColumn, и сделать так, чтоб он тянулся как и другие элементы. Также он работает сейчас багано, я стираю часть хттпс, а он поверх лепит https://https:/, нужно обработать эти моменты, либо вообще перестать хттпс подставлять впринципе, что оптимально
- Неверная анимация селекта карточки в SkinsGrid. Сейчас зеленая рамка и галочка маленькая, а должно быть green-check иконка размером 42х42 по центру фотографии, возьми ее из иконок
- Поправить кривое отображение Breadcrumbs. Сейчас на странице /sell у нас домик\главная\продать скины. Нам не надо "Главная" писать, у нас иконка домика выполняет эту опцию
- Из Header вытащить зеленую кнопку Войти в стим в ui (авторизацию мокнутую думаю там же в юае можно кидать), в хэдере же использовать. Далее проверь как замокана авторизация в проекте. Если пользователь не авторизован, то по странице /sell мы затемняем не сильно все содержимое, стимтрейда, списка итемов, методов оплаты, делаем него некликабельным, а в гриде скинов выводим вместо карточек в столбик по центру грида такое содержание:
  Иконка варнинга information-warning 40x40
  Авторизируйтесь через Steam
  color: #FFF;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px /_ 109.091% _/
  Для того, чтобы обменять вещи на деньги.
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px
  Та самая зеленая кнопка Войти через стим

- [ ] . Добавить мок данные для скинов
- [x] 8. Дополнить структуру в проджект рулс новыми компонентами

  - Изучи все что мы добавили нового, и дополни структуру в рулсах

In HTML, <p> cannot be a descendant of <p>.
This will cause a hydration error.

See more info here: https://nextjs.org/docs/messages/react-hydration-error

- [-] 9. Исправить ошибку. <p className={styles.protectionLink}> Steam Trade Protection </p> должна быть Линк, и верстка не должна ломаться, сейчас текст прерывается, стим трейд протекшн пишется с новой строчки, и далее опять же с новой строки текст параграфа

      ...
      <RedirectBoundary>
      <RedirectErrorBoundary router={{...}}>
      <InnerLayoutRouter url="/sell" tree={[...]} cacheNode={{lazyData:null, ...}} segmentPath={[...]}>
      <ClientPageRoot Component={function SellPage} searchParams={{}} params={{}}>
      <SellPage params={Promise} searchParams={Promise}>
      <div className="container">
      <Breadcrumbs>
      <PageTitle>
      <div className="page_mainC...">
      <div>
      <div className="page_right...">
      <PaymentSidebar selectedSkins={[...]} selectedPaymentMethod="sbp" ...>
      <div className="PaymentSid...">
      <div>
      <div className={undefined}>
      <div>
      <div className="PaymentSid...">
      <img>
      <div className="PaymentSid...">
      >                             <p className="PaymentSidebar_protectionText__EL4y4">
      >                               <p className="PaymentSidebar_protectionLink__Jdgmh">
                                      ...
                                ...
                      ...
                ...
      src\components\Sell\PaymentSidebar\PaymentSidebar.tsx (121:34) @ PaymentSidebar

  119 | <div className={styles.protectionTextContainer}>
  120 | <p className={styles.protectionText}>

  > 121 | Из-за новых правил <p className={styles.protectionLink}> Steam Trade Protection </p>, выплата за скины будет произведена через 8 дней (после 5.08.2025 14:00)

        |                                  ^

  122 | </p>
  123 |
  124 | </div>
