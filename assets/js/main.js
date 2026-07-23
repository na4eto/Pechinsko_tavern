/* ============================================================
   Механа „Печинско“ — поведение на сайта
   (навигация, езици, меню, галерия, карта, резервации)
   ============================================================ */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var MENU = window.MENU || { categories: [] };
  var EN = window.I18N_EN || {};
  var RATE = 1.95583; // фиксиран курс лев/евро

  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page") || "";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Език ---------- */
  function getLang() {
    try { return localStorage.getItem("pechinsko-lang") === "en" ? "en" : "bg"; }
    catch (e) { return "bg"; }
  }
  function setLang(lang) {
    try { localStorage.setItem("pechinsko-lang", lang); } catch (e) { /* без запазване */ }
    applyLang(lang);
  }
  function t(obj) {
    // избира bg/en поле от обект в данните
    var lang = getLang();
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] != null ? obj[lang] : (obj.bg || "");
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.dataset.bgText == null) el.dataset.bgText = el.textContent;
      var key = el.getAttribute("data-i18n");
      if (lang === "en" && EN[key]) el.textContent = EN[key];
      else el.textContent = el.dataset.bgText;
    }
    var ariaNodes = document.querySelectorAll("[data-i18n-aria]");
    for (var j = 0; j < ariaNodes.length; j++) {
      var a = ariaNodes[j];
      if (a.dataset.bgAria == null) a.dataset.bgAria = a.getAttribute("aria-label") || "";
      var ak = a.getAttribute("data-i18n-aria");
      a.setAttribute("aria-label", lang === "en" && EN[ak] ? EN[ak] : a.dataset.bgAria);
    }
    var phNodes = document.querySelectorAll("[data-i18n-placeholder]");
    for (var k = 0; k < phNodes.length; k++) {
      var p = phNodes[k];
      if (p.dataset.bgPh == null) p.dataset.bgPh = p.getAttribute("placeholder") || "";
      var pk = p.getAttribute("data-i18n-placeholder");
      p.setAttribute("placeholder", lang === "en" && EN[pk] ? EN[pk] : p.dataset.bgPh);
    }

    var btns = document.querySelectorAll(".lang-switch button");
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute("aria-pressed", btns[b].getAttribute("data-lang") === lang ? "true" : "false");
    }

    // прерисува динамичните части
    renderNotice();
    renderFeatured();
    renderMenuPage();
    renderGalleries();
    renderReviews();
    renderHours();
    renderAddress();
  }

  /* ---------- Цени: евро + лева ---------- */
  function nf(val) {
    var lang = getLang();
    try {
      return new Intl.NumberFormat(lang === "en" ? "en-GB" : "bg-BG", {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(val);
    } catch (e) { return val.toFixed(2); }
  }
  function priceHtml(item, compact) {
    var lang = getLang();
    if (item.priceNote) {
      return '<span class="price-note">' + esc(t(item.priceNote)) + "</span>";
    }
    if (typeof item.price !== "number") return "";
    var eur = nf(item.price) + " €";
    var lv = nf(item.price * RATE) + (lang === "en" ? " lv." : " лв.");
    return esc(eur) + (compact ? "" : "<small>" + esc(lv) + "</small>");
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Лента за съобщения ---------- */
  function renderNotice() {
    var bar = document.querySelector(".js-notice");
    if (!bar) return;
    var n = SITE.notice || {};
    var dismissed = false;
    try { dismissed = sessionStorage.getItem("pechinsko-notice") === "off"; } catch (e) { /* – */ }
    if (!n.active || dismissed) { bar.hidden = true; return; }
    bar.hidden = false;
    bar.querySelector("p").textContent = t(n);
  }

  /* ---------- Акценти от кухнята (начална) ---------- */
  var TAG_LABELS = {
    fire: { bg: "На жив огън", en: "Over live fire", cls: "tag--fire" },
    classic: { bg: "Родопска класика", en: "Rhodope classic", cls: "tag--classic" },
    share: { bg: "За споделяне", en: "For sharing", cls: "tag--share" },
    order: { bg: "По заявка", en: "Advance order", cls: "tag--fire" },
    spec: { bg: "Специалитет на къщата", en: "House specialty", cls: "tag--classic" }
  };
  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    var out = "";
    for (var i = 0; i < tags.length; i++) {
      var td = TAG_LABELS[tags[i]];
      if (td) out += '<span class="tag ' + td.cls + '">' + esc(t(td)) + "</span>";
    }
    return out ? '<div class="tag-row">' + out + "</div>" : "";
  }

  function renderFeatured() {
    var wrap = document.querySelector(".js-featured");
    if (!wrap) return;
    var cards = "";
    MENU.categories.forEach(function (cat) {
      (cat.items || []).forEach(function (item) {
        if (!item.featured) return;
        cards +=
          '<article class="dish-card reveal">' +
            '<div class="dish-card__band" aria-hidden="true"></div>' +
            '<div class="dish-card__body">' +
              tagsHtml(item.tags) +
              "<h3>" + esc(t(item.name)) + "</h3>" +
              "<p>" + esc(t(item.desc)) + "</p>" +
              '<div class="dish-card__meta">' +
                '<span class="dish-card__price">' + priceHtml(item) + "</span>" +
                (item.weight ? '<span class="menu-item__weight">' + esc(item.weight) + "</span>" : "") +
              "</div>" +
            "</div>" +
          "</article>";
      });
    });
    wrap.innerHTML = cards;
    observeReveals(wrap);
  }

  function renderCatChips() {
    var wrap = document.querySelector(".js-cat-chips");
    if (!wrap) return;
    var html = "";
    MENU.categories.forEach(function (cat) {
      html += '<a class="chip" href="' + root + 'menu/#cat-' + cat.id + '">' + esc(t(cat.name)) + "</a>";
    });
    wrap.innerHTML = html;
  }

  /* ---------- Страница „Меню“ ---------- */
  function renderMenuPage() {
    var host = document.querySelector(".js-menu");
    if (!host) return;
    var navHost = document.querySelector(".js-menu-nav");
    var lang = getLang();
    var navHtml = "";
    var html = "";

    MENU.categories.forEach(function (cat, idx) {
      navHtml += '<a href="#cat-' + cat.id + '"' + (idx === 0 ? ' class="is-active"' : "") + ">" + esc(t(cat.name)) + "</a>";

      var items = "";
      (cat.items || []).forEach(function (item) {
        var unavailable = item.available === false;
        items +=
          '<div class="menu-item' + (unavailable ? " is-unavailable" : "") + '">' +
            '<div class="menu-item__name">' + esc(t(item.name)) +
              (item.allergens && item.allergens.length
                ? ' <span class="allergens" title="' + (lang === "en" ? "Allergens" : "Алергени") + '">' + esc(item.allergens.join(" ")) + "</span>"
                : "") +
              (unavailable
                ? ' <span class="unavail-badge">' + (lang === "en" ? (EN["menupage.unavailable"] || "out for now") : "изчерпано за момента") + "</span>"
                : "") +
            "</div>" +
            '<div class="menu-item__price">' + priceHtml(item) + "</div>" +
            (t(item.desc) ? '<p class="menu-item__desc">' + esc(t(item.desc)) + "</p>" : "") +
            (item.weight ? '<span class="menu-item__weight">' + esc(item.weight) + "</span>" : "") +
            (item.tags && item.tags.length ? '<div class="menu-item__tags">' + tagsHtml(item.tags).replace('<div class="tag-row">', "").replace("</div>", "") + "</div>" : "") +
          "</div>";
      });

      html +=
        '<section class="menu-cat" id="cat-' + cat.id + '" aria-labelledby="cat-' + cat.id + '-h">' +
          '<div class="menu-cat__head">' +
            "<div>" +
              '<h2 id="cat-' + cat.id + '-h">' + esc(t(cat.name)) + "</h2>" +
              (cat.note ? '<p class="menu-cat__note">' + esc(t(cat.note)) + "</p>" : "") +
            "</div>" +
            '<button class="menu-cat__toggle" type="button" aria-expanded="true" aria-controls="cat-' + cat.id + '-items" aria-label="' +
              (lang === "en" ? "Collapse category" : "Свиване на категорията") + '">' +
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            "</button>" +
          "</div>" +
          '<div class="menu-items" id="cat-' + cat.id + '-items">' + items + "</div>" +
        "</section>";
    });

    host.innerHTML = html;
    if (navHost) navHost.innerHTML = navHtml;

    // свиване на категории (мобилно)
    host.querySelectorAll(".menu-cat__toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.closest(".menu-cat");
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        cat.classList.toggle("is-collapsed", open);
      });
    });

    // навигация: маркиране на активната категория при скрол
    if (navHost && "IntersectionObserver" in window) {
      var links = navHost.querySelectorAll("a");
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          links.forEach(function (l) {
            var active = l.getAttribute("href") === id;
            l.classList.toggle("is-active", active);
            if (active) {
              // активната категория остава видима в лентата
              var bar = l.parentElement;
              var target = l.offsetLeft - (bar.clientWidth - l.offsetWidth) / 2;
              bar.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
            }
          });
        });
      }, { rootMargin: "-25% 0px -65% 0px" });
      host.querySelectorAll(".menu-cat").forEach(function (s) { spy.observe(s); });

      links.forEach(function (l) {
        l.addEventListener("click", function () {
          // ако категорията е свита на мобилно — отваря се
          var target = host.querySelector(l.getAttribute("href"));
          if (target && target.classList.contains("is-collapsed")) {
            target.classList.remove("is-collapsed");
            var b = target.querySelector(".menu-cat__toggle");
            if (b) b.setAttribute("aria-expanded", "true");
          }
        });
      });
    }
  }

  /* ---------- Галерия ---------- */
  var galleryList = [];
  function galleryItemHtml(item, i, sizeClass) {
    return (
      '<figure class="mosaic__item ' + (sizeClass || item.size || "m-c") + '">' +
        '<button type="button" class="js-lightbox-open" data-index="' + i + '" aria-label="' +
          esc(t(item.alt)) + '" style="position:absolute;inset:0;width:100%;height:100%;background:none;border:0;cursor:pointer;z-index:3;"></button>' +
        '<img src="' + root + esc(item.src) + '" alt="' + esc(t(item.alt)) + '" loading="lazy" width="800" height="600"' +
        (item.pos ? ' style="object-position:' + esc(item.pos) + ';"' : "") + ">" +
        "<figcaption>" + esc(groupLabel(item.group)) + "</figcaption>" +
      "</figure>"
    );
  }
  function groupLabel(id) {
    var g = (SITE.galleryGroups || []).filter(function (x) { return x.id === id; })[0];
    return g ? t(g) : "";
  }

  function renderGalleries() {
    galleryList = SITE.gallery || [];

    var preview = document.querySelector(".js-gallery-preview");
    if (preview) {
      var html = "";
      galleryList.forEach(function (item, i) { html += galleryItemHtml(item, i); });
      preview.innerHTML = html;
    }

    var full = document.querySelector(".js-gallery-full");
    if (full) {
      var out = "";
      (SITE.galleryGroups || []).forEach(function (g) {
        var items = [];
        galleryList.forEach(function (item, i) { if (item.group === g.id) items.push({ item: item, i: i }); });
        if (!items.length) return;
        var sizes = ["m-f", "m-g", "m-a", "m-c", "m-d", "m-e"];
        var cells = "";
        items.forEach(function (pair, k) { cells += galleryItemHtml(pair.item, pair.i, sizes[k % sizes.length]); });
        out +=
          '<section class="gallery-group" aria-labelledby="g-' + g.id + '">' +
            '<div class="gallery-group__head">' +
              '<h2 id="g-' + g.id + '">' + esc(t(g)) + "</h2>" +
              '<span class="count">' + items.length + "</span>" +
            "</div>" +
            '<div class="mosaic">' + cells + "</div>" +
          "</section>";
      });
      full.innerHTML = out;
    }

    bindLightbox();
  }

  /* ---------- Лайтбокс ---------- */
  var lbIndex = 0;
  function bindLightbox() {
    var dlg = document.querySelector(".js-lightbox");
    if (!dlg) return;
    document.querySelectorAll(".js-lightbox-open").forEach(function (btn) {
      btn.addEventListener("click", function () {
        lbIndex = parseInt(btn.getAttribute("data-index"), 10) || 0;
        showLightbox();
        if (typeof dlg.showModal === "function") dlg.showModal();
      });
    });
    dlg.querySelector(".js-lb-close").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".js-lb-prev").addEventListener("click", function () { step(-1); });
    dlg.querySelector(".js-lb-next").addEventListener("click", function () { step(1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) dlg.close(); // клик върху фона
    });
    function step(dir) {
      lbIndex = (lbIndex + dir + galleryList.length) % galleryList.length;
      showLightbox();
    }
  }
  function showLightbox() {
    var dlg = document.querySelector(".js-lightbox");
    var item = galleryList[lbIndex];
    if (!dlg || !item) return;
    var img = dlg.querySelector("img");
    img.src = root + item.src;
    img.alt = t(item.alt);
    dlg.querySelector(".lightbox__caption").textContent = t(item.alt);
  }

  /* ---------- Отзиви ---------- */
  function renderReviews() {
    var wrap = document.querySelector(".js-reviews");
    if (!wrap) return;
    var html = "";
    (SITE.reviews || []).forEach(function (r) {
      html +=
        '<figure class="review reveal">' +
          '<div class="review__mark" aria-hidden="true">„</div>' +
          "<blockquote>" + esc(t(r)) + "</blockquote>" +
          "<figcaption>" + esc(r.author) + " · " + esc(t(r.source)) + "</figcaption>" +
        "</figure>";
    });
    wrap.innerHTML = html;
    observeReveals(wrap);
  }

  /* ---------- Работно време ---------- */
  function renderHours() {
    document.querySelectorAll(".js-hours").forEach(function (host) {
      if (!SITE.hours || !SITE.hours.length) {
        var lang = getLang();
        host.innerHTML = "<p>" + esc(lang === "en"
          ? (EN["reserve.hoursUnknown"] || "Call us for the current opening hours.")
          : "Обадете ни се за актуалното работно време — скоро ще го потвърдим и тук.") + "</p>";
        return;
      }
      var rows = "";
      SITE.hours.forEach(function (h) {
        rows += "<tr><td>" + esc(t(h.d)) + "</td><td>" + esc(t(h.t)) + "</td></tr>";
      });
      host.innerHTML = "<table>" + rows + "</table>";
    });
  }

  function renderAddress() {
    document.querySelectorAll(".js-address").forEach(function (el) {
      el.textContent = t(SITE.address);
    });
  }

  /* ---------- Карта (зарежда се при поискване) ---------- */
  function bindMap() {
    document.querySelectorAll(".js-map").forEach(function (facade) {
      var btn = facade.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var iframe = document.createElement("iframe");
        iframe.src = SITE.mapsEmbed;
        iframe.title = getLang() === "en" ? (EN["map.aria"] || "Map") : "Карта с местоположението на механа „Печинско“";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.allowFullscreen = true;
        facade.appendChild(iframe);
        var cta = facade.querySelector(".map-facade__cta");
        if (cta) cta.remove();
      });
    });
  }

  /* ---------- Форма за резервация ---------- */
  function bindForms() {
    document.querySelectorAll(".js-reserve-form").forEach(function (form) {
      var dateInput = form.querySelector('input[type="date"]');
      if (dateInput) {
        var today = new Date();
        var iso = today.getFullYear() + "-" +
          String(today.getMonth() + 1).padStart(2, "0") + "-" +
          String(today.getDate()).padStart(2, "0");
        dateInput.min = iso;
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var err = form.querySelector(".form__error");
        var ok = form.querySelector(".form__success");
        err.classList.remove("is-visible");

        if (!form.checkValidity()) {
          err.classList.add("is-visible");
          var firstInvalid = form.querySelector(":invalid");
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        var endpoint = (SITE.reservation && SITE.reservation.endpoint) || "";
        var finish = function (demoMode) {
          ok.classList.add("is-visible");
          var demoTag = ok.querySelector(".form__demo-tag");
          if (demoTag) demoTag.hidden = !demoMode;
          form.reset();
          ok.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
        };

        if (!endpoint) {
          console.warn("Резервации: няма настроен endpoint (assets/js/data.js) — формата е в демо режим.");
          finish(true);
          return;
        }

        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        }).then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          finish(false);
        }).catch(function () {
          err.classList.add("is-visible");
        }).finally(function () {
          btn.disabled = false;
        });
      });
    });
  }

  /* ---------- Навигация ---------- */
  function bindNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }

    var notice = document.querySelector(".js-notice .notice__close");
    if (notice) {
      notice.addEventListener("click", function () {
        try { sessionStorage.setItem("pechinsko-notice", "off"); } catch (e) { /* – */ }
        document.querySelector(".js-notice").hidden = true;
      });
    }

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });

    // активна страница в навигацията
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.setAttribute("aria-current", "page");
    });
  }

  /* ---------- Разкриване при скрол ---------- */
  var revealObserver = null;
  function observeReveals(scope) {
    if (reduceMotion) {
      (scope || document).querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      (scope || document).querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    (scope || document).querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Ромбче след курсора ----------
     Килимният мотив, съвсем дискретно: малък ромб следва
     показалеца с леко закъснение и се уголемява над връзки
     и бутони. Само при фин показалец (мишка/тракпад) и само
     ако потребителят не е поискал намалено движение.        */
  function initCursor() {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var dot = document.createElement("div");
    dot.className = "cursor-diamond";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    var tx = -100, ty = -100;      // цел (позиция на показалеца)
    var x = -100, y = -100;        // текуща позиция на ромбчето
    var scale = 1, targetScale = 1;
    var shown = false;
    var raf = null;

    function tick() {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      scale += (targetScale - scale) * 0.2;
      dot.style.transform =
        "translate3d(" + (x - 4.5) + "px," + (y - 4.5) + "px,0) rotate(45deg) scale(" + scale.toFixed(3) + ")";
      raf = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        x = tx; y = ty;
        dot.classList.add("is-visible");
        raf = requestAnimationFrame(tick);
      }
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      // над текстови полета ромбчето се скрива, за да не пречи на I-курсора
      var typing = t.closest && t.closest("input, textarea, select");
      dot.classList.toggle("is-quiet", !!typing);
      // уголемяване над интерактивни елементи
      var interactive = t.closest && t.closest("a, button, [role=\"button\"], summary, label");
      targetScale = interactive && !typing ? 1.7 : 1;
      dot.classList.toggle("is-active", !!interactive && !typing);
      // месингов цвят върху тъмните секции, за да се вижда
      var dark = t.closest && t.closest(".section--dark, .site-footer, .action-bar, .reserve__phone-card, .cta-band, .notice");
      dot.classList.toggle("is-brass", !!dark);
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", function () {
      dot.classList.remove("is-visible");
    });
    document.documentElement.addEventListener("mouseenter", function () {
      if (shown) dot.classList.add("is-visible");
    });

    // пестим ресурси, когато табът не е на екран
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      } else if (shown && !raf) {
        raf = requestAnimationFrame(tick);
      }
    });
  }

  /* ---------- Демо бележки ---------- */
  function applyDemo() {
    if (!SITE.demo) return;
    document.querySelectorAll(".js-demo-note").forEach(function (el) { el.hidden = false; });
  }

  /* ---------- Стартиране ---------- */
  function init() {
    bindNav();
    renderCatChips();
    applyLang(getLang());
    bindMap();
    bindForms();
    applyDemo();
    initCursor();
    observeReveals(document);

    // линии, които се „чертаят“ при показване
    document.querySelectorAll(".js-draw").forEach(function (el) {
      if (reduceMotion) { el.classList.add("is-in"); return; }
      if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
        });
      }, { threshold: 0.3 });
      io.observe(el);
    });

    var year = document.querySelector(".js-year");
    if (year) year.textContent = String(new Date().getFullYear());

    // контакти от данните
    document.querySelectorAll(".js-tel").forEach(function (a) {
      a.href = "tel:" + (SITE.phoneIntl || "");
      if (a.classList.contains("js-tel-text")) a.textContent = SITE.phone || "";
    });
    document.querySelectorAll(".js-mail").forEach(function (a) {
      a.href = "mailto:" + (SITE.email || "");
      if (a.classList.contains("js-mail-text")) a.textContent = SITE.email || "";
    });
    document.querySelectorAll(".js-maps-link").forEach(function (a) { a.href = SITE.mapsUrl || "#"; });
    document.querySelectorAll(".js-fb-link").forEach(function (a) { a.href = SITE.facebook || "#"; });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
