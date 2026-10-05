// Offers the visitor's own language once, in that language. It never redirects:
// every page stays reachable (and indexable) at its own address.
(() => {
  const LANGS = [{"c": "zh-Hant", "p": "/", "d": "ltr", "v": "以繁體中文瀏覽本頁", "x": "關閉"}, {"c": "en", "p": "/en/", "d": "ltr", "v": "View this page in English", "x": "Close"}, {"c": "zh-Hans", "p": "/zh-hans/", "d": "ltr", "v": "以简体中文浏览本页", "x": "关闭"}, {"c": "ja", "p": "/ja/", "d": "ltr", "v": "このページを日本語で見る", "x": "閉じる"}, {"c": "ko", "p": "/ko/", "d": "ltr", "v": "이 페이지를 한국어로 보기", "x": "닫기"}, {"c": "de", "p": "/de/", "d": "ltr", "v": "Diese Seite auf Deutsch ansehen", "x": "Schließen"}, {"c": "fr", "p": "/fr/", "d": "ltr", "v": "Voir cette page en français", "x": "Fermer"}, {"c": "it", "p": "/it/", "d": "ltr", "v": "Visualizza questa pagina in italiano", "x": "Chiudi"}, {"c": "es", "p": "/es/", "d": "ltr", "v": "Ver esta página en español", "x": "Cerrar"}, {"c": "es-419", "p": "/es-419/", "d": "ltr", "v": "Ver esta página en español de Latinoamérica", "x": "Cerrar"}, {"c": "ca", "p": "/ca/", "d": "ltr", "v": "Mostra aquesta pàgina en català", "x": "Tanca"}, {"c": "pt-BR", "p": "/pt-br/", "d": "ltr", "v": "Ver esta página em português do Brasil", "x": "Fechar"}, {"c": "pt-PT", "p": "/pt-pt/", "d": "ltr", "v": "Ver esta página em português europeu", "x": "Fechar"}, {"c": "nl", "p": "/nl/", "d": "ltr", "v": "Bekijk deze pagina in het Nederlands", "x": "Sluit"}, {"c": "da", "p": "/da/", "d": "ltr", "v": "Se denne side på dansk", "x": "Luk"}, {"c": "sv", "p": "/sv/", "d": "ltr", "v": "Visa sidan på svenska", "x": "Stäng"}, {"c": "nb", "p": "/nb/", "d": "ltr", "v": "Vis denne siden på norsk", "x": "Lukk"}, {"c": "fi", "p": "/fi/", "d": "ltr", "v": "Näytä tämä sivu suomeksi", "x": "Sulje"}, {"c": "pl", "p": "/pl/", "d": "ltr", "v": "Wyświetl tę stronę po polsku", "x": "Zamknij"}, {"c": "cs", "p": "/cs/", "d": "ltr", "v": "Zobrazit tuto stránku v češtině", "x": "Zavřít"}, {"c": "sk", "p": "/sk/", "d": "ltr", "v": "Zobraziť túto stránku v slovenčine", "x": "Zavrieť"}, {"c": "hr", "p": "/hr/", "d": "ltr", "v": "Prikaži ovu stranicu na hrvatskom", "x": "Zatvori"}, {"c": "sl", "p": "/sl/", "d": "ltr", "v": "Prikaži to stran v slovenščini", "x": "Zapri"}, {"c": "hu", "p": "/hu/", "d": "ltr", "v": "Az oldal megtekintése magyarul", "x": "Bezárás"}, {"c": "ro", "p": "/ro/", "d": "ltr", "v": "Vedeți această pagină în română", "x": "Închideți"}, {"c": "tr", "p": "/tr/", "d": "ltr", "v": "Bu sayfayı Türkçe görüntüleyin", "x": "Kapat"}, {"c": "el", "p": "/el/", "d": "ltr", "v": "Δείτε αυτή τη σελίδα στα ελληνικά", "x": "Κλείσιμο"}, {"c": "ru", "p": "/ru/", "d": "ltr", "v": "Открыть эту страницу на русском", "x": "Закрыть"}, {"c": "uk", "p": "/uk/", "d": "ltr", "v": "Відкрити цю сторінку українською", "x": "Закрити"}, {"c": "ar", "p": "/ar/", "d": "rtl", "v": "عرض هذه الصفحة بالعربية", "x": "إغلاق"}, {"c": "he", "p": "/he/", "d": "rtl", "v": "הצגת הדף בעברית", "x": "סגירה"}, {"c": "ur", "p": "/ur/", "d": "rtl", "v": "یہ صفحہ اردو میں دیکھیں", "x": "بند کریں"}, {"c": "hi", "p": "/hi/", "d": "ltr", "v": "यह पेज हिन्दी में देखें", "x": "बंद करें"}, {"c": "mr", "p": "/mr/", "d": "ltr", "v": "हे पेज मराठीत पाहा", "x": "बंद करा"}, {"c": "bn", "p": "/bn/", "d": "ltr", "v": "এই পেজটি বাংলায় দেখুন", "x": "বন্ধ করুন"}, {"c": "gu", "p": "/gu/", "d": "ltr", "v": "આ પેજ ગુજરાતીમાં જુઓ", "x": "બંધ કરો"}, {"c": "pa", "p": "/pa/", "d": "ltr", "v": "ਇਹ ਪੰਨਾ ਪੰਜਾਬੀ ਵਿੱਚ ਦੇਖੋ", "x": "ਬੰਦ ਕਰੋ"}, {"c": "or", "p": "/or/", "d": "ltr", "v": "ଏହି ପୃଷ୍ଠା ଓଡ଼ିଆରେ ଦେଖନ୍ତୁ", "x": "ବନ୍ଦ କରନ୍ତୁ"}, {"c": "ta", "p": "/ta/", "d": "ltr", "v": "இந்தப் பக்கத்தைத் தமிழில் பாருங்கள்", "x": "மூடு"}, {"c": "te", "p": "/te/", "d": "ltr", "v": "ఈ పేజీని తెలుగులో చూడండి", "x": "మూసివేయండి"}, {"c": "kn", "p": "/kn/", "d": "ltr", "v": "ಈ ಪುಟವನ್ನು ಕನ್ನಡದಲ್ಲಿ ನೋಡಿ", "x": "ಮುಚ್ಚಿ"}, {"c": "ml", "p": "/ml/", "d": "ltr", "v": "ഈ പേജ് മലയാളത്തിൽ കാണുക", "x": "അടയ്ക്കുക"}, {"c": "th", "p": "/th/", "d": "ltr", "v": "ดูหน้านี้เป็นภาษาไทย", "x": "ปิด"}, {"c": "vi", "p": "/vi/", "d": "ltr", "v": "Xem trang này bằng tiếng Việt", "x": "Đóng"}, {"c": "id", "p": "/id/", "d": "ltr", "v": "Lihat halaman ini dalam bahasa Indonesia", "x": "Tutup"}, {"c": "ms", "p": "/ms/", "d": "ltr", "v": "Lihat halaman ini dalam bahasa Melayu", "x": "Tutup"}];
  const KEY = "swaylia.lang";
  const current = document.documentElement.lang;

  const remember = (code) => {
    try { localStorage.setItem(KEY, code); } catch (_) { /* private mode */ }
  };

  // Picking a language from the list counts as a choice; stop suggesting.
  document.addEventListener("click", (event) => {
    const link = event.target.closest && event.target.closest("a[hreflang]");
    if (link) remember(link.getAttribute("hreflang"));
  });

  let chosen = null;
  try { chosen = localStorage.getItem(KEY); } catch (_) { /* private mode */ }
  if (chosen) return;

  const codes = new Set(LANGS.map((lang) => lang.c));
  const match = (tag) => {
    const lower = String(tag || "").toLowerCase();
    const base = lower.split("-")[0];
    if (base === "zh") return /hant|-tw|-hk|-mo/.test(lower) ? "zh-Hant" : "zh-Hans";
    if (base === "pt") return /-(pt|ao|mz|cv|gw|st|tl)$/.test(lower) ? "pt-PT" : "pt-BR";
    if (base === "es") return lower === "es" || lower === "es-es" ? "es" : "es-419";
    if (base === "no" || base === "nn" || base === "nb") return "nb";
    if (base === "iw") return "he";
    if (base === "in") return "id";
    return codes.has(base) ? base : null;
  };

  const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  let best = null;
  for (const tag of preferred) {
    best = match(tag);
    if (best) break;
  }
  if (!best || best === current) return;
  const target = LANGS.find((lang) => lang.c === best);
  if (!target) return;

  const bar = document.createElement("div");
  bar.className = "lang-banner";
  bar.lang = target.c;
  bar.dir = target.d;
  const wrap = document.createElement("div");
  wrap.className = "wrap";
  const link = document.createElement("a");
  link.href = target.p + location.hash;
  link.hreflang = target.c;
  link.textContent = target.v;
  const close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", target.x);
  close.textContent = "×";
  close.addEventListener("click", () => {
    remember(current);
    bar.remove();
  });
  wrap.append(link, close);
  bar.append(wrap);
  const skip = document.querySelector(".skip");
  if (skip) skip.after(bar);
  else document.body.prepend(bar);
})();