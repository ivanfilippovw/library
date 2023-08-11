document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("hamburger__button").addEventListener("click", function() {
    document.querySelector("body").classList.toggle("open")
  })
})

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.querySelector(".page__body").classList.remove("open")
  }
});

document.getElementById("menu").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.getElementById("hamburger__button").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".page__body").classList.remove("open")
});

document.querySelectorAll('.header__navigation-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.page__body').classList.remove('open');
  });
});

console.log(`

  1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part1.md

  2. Deploy: https://rolling-scopes-school.github.io/ivanfilippovw-JSFEPRESCHOOL2023Q2/library/

  3. Done 26.07.2023 / deadline 31.07.2023

  4. Score: 100 / 100

  Итоговое количество баллов: 100. Выполнены все пункты ТЗ.

    Вёрстка валидная +10

    Вёрстка семантическая +16
      <header>, <main>, <footer> +2.
      шесть элементов <section> (по количеству секций) +2.
      только один заголовок <h1> +2. Если элементов <h1> на странице больше одного, считаем это ошибкой.
      пять заголовков <h2> (легко отличимы на верхних границах секций, имеют единый стиль) +2.
      один элемент <nav> (панель навигации в хедере) +2.
      два списка ul > li > a (панель навигации, ссылки на соцсети в футере) +2.
      семь кнопок <button> +2.
      два инпута <input> +2.

    Вёрстка соответствует макету +54
      блок <header> +8:
      секция Welcome +4.
      секция About +6:
      секция Favorites +8:
      секция CoffeShop +6.
      секция Contacts +6:
      секция LibraryCard +8:
      блок <footer> +8:

    Общие требования к верстке +20
      - для построения сетки используются флексы или гриды (display: flex... или display: grid...) +2.
      - при уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону +2. Для этого должна быть обертка вокруг всей страницы, которая выравнивается по центру. Фон за рамками страницы может быть черным, белым или любого оттенка серого.
      - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2.
      - изображения добавлены в формате .jpg (.jpeg) или .png +2.
      - есть favicon +2.
      - плавная прокрутка по якорям +2.
      - в футере название ссылки Username заменено и ведет на GitHub студента +2.
      - в футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/ +2.
      - интерактивность элементов согласно макету. Интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +2.
      - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы +2.

`);
