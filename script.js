
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://fbvhigcgcmyhznclukov.supabase.co";
const SUPABASE_KEY = "sb_publishable_BVGY1F_M8eYyADwebBtiSw_5Kud29yK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const translations = {
  en: {
    navExperience:"The Experience",navProducts:"Products",navVideos:"Videos",navGallery:"Gallery",navAbout:"About Mohamed",navContact:"Contact",book:"Book now",
    heroEyebrow:"FES · MOROCCO",heroTitle:"Discover the art of Moroccan cooking",heroText:"Cook, taste and experience Morocco with Mohamed — your cooking class, your choice.",bookExperience:"Book your experience",discover:"Discover the experience",heroNote:"Authentic food · Local culture · Personal experience",
    caption:"A shared moment in the kitchen",welcome:"WELCOME TO MY KITCHEN",introTitle:"A taste of Morocco, made together",introText:"Join Mohamed in Fes for a warm, hands-on introduction to Moroccan cuisine. Choose the dishes you would love to learn, discover local ingredients and enjoy the pleasure of cooking together.",talkMohamed:"Talk to Mohamed",
    yourExperience:"YOUR EXPERIENCE",experienceTitle:"More than a cooking class",experienceIntro:"A personal Moroccan food experience, shaped around your interests and your time.",feature1Title:"Choose your dishes",feature1Text:"Learn to prepare Moroccan dishes of your choice, from traditional favourites to recipes you are curious about.",feature2Title:"Explore the local market",feature2Text:"If you wish, join Mohamed to shop for ingredients and discover the sights, smells and flavours of a Moroccan souk.",optional:"Optional activity",feature3Title:"Cook side by side",feature3Text:"Get involved, learn practical techniques and discover the stories behind Moroccan food.",
    productsEyebrow:"OUR SELECTION",productsTitle:"Our Products",productsIntro:"Discover our selection of Moroccan products.",productsLoading:"Loading products...",productsEmpty:"No products available at the moment.",productsError:"Unable to load products.",productContact:"Contact us",
    videosEyebrow:"WATCH & DISCOVER",videosTitle:"Our Videos",videosIntro:"Discover Moroccan cooking through our videos.",videosLoading:"Loading videos...",videosEmpty:"No videos available at the moment.",videosError:"Unable to load videos.",
    quote:"“The best way to discover a culture is through its food.”",moments:"MOMENTS TO SHARE",galleryTitle:"Inside the Moroccan kitchen",madeForYou:"MADE FOR YOU",personalTitle:"Your time. Your menu. Your experience.",personalText:"The class duration is flexible and arranged according to your request. The price depends on the duration and is personally set by Mohamed. Contact him to discuss your ideal experience and receive a quote.",askPrice:"Ask Mohamed for a quote",letsPlan:"LET'S PLAN YOUR EXPERIENCE",contactTitle:"Ready to cook in Fes?",contactText:"Tell Mohamed what you would like to cook, how much time you have, and whether you would like to visit the market.",whatsapp:"Contact on WhatsApp"
  },
  fr: {
    navExperience:"L’expérience",navProducts:"Produits",navVideos:"Vidéos",navGallery:"Galerie",navAbout:"À propos de Mohamed",navContact:"Contact",book:"Réserver",
    heroEyebrow:"FÈS · MAROC",heroTitle:"Découvrez l’art de la cuisine marocaine",heroText:"Cuisinez, dégustez et découvrez le Maroc avec Mohamed — un cours de cuisine selon vos envies.",bookExperience:"Réserver votre expérience",discover:"Découvrir l’expérience",heroNote:"Cuisine authentique · Culture locale · Expérience personnelle",
    caption:"Un moment de partage en cuisine",welcome:"BIENVENUE DANS MA CUISINE",introTitle:"Un goût du Maroc, à partager",introText:"Rejoignez Mohamed à Fès pour découvrir la cuisine marocaine de façon conviviale et pratique. Choisissez les plats que vous souhaitez apprendre, découvrez les ingrédients locaux et prenez plaisir à cuisiner ensemble.",talkMohamed:"Contacter Mohamed",
    yourExperience:"VOTRE EXPÉRIENCE",experienceTitle:"Bien plus qu’un cours de cuisine",experienceIntro:"Une expérience culinaire marocaine personnalisée selon vos envies et votre disponibilité.",feature1Title:"Choisissez vos plats",feature1Text:"Apprenez à préparer les plats marocains de votre choix, des grands classiques aux recettes qui vous intriguent.",feature2Title:"Découvrez le marché local",feature2Text:"Si vous le souhaitez, accompagnez Mohamed pour acheter les ingrédients et découvrir les couleurs, les parfums et les saveurs d’un souk marocain.",optional:"Activité facultative",feature3Title:"Cuisinez ensemble",feature3Text:"Participez, apprenez des techniques pratiques et découvrez les histoires de la cuisine marocaine.",
    productsEyebrow:"NOTRE SÉLECTION",productsTitle:"Nos produits",productsIntro:"Découvrez notre sélection de produits marocains.",productsLoading:"Chargement des produits...",productsEmpty:"Aucun produit disponible pour le moment.",productsError:"Impossible de charger les produits.",productContact:"Nous contacter",
    videosEyebrow:"REGARDEZ ET DÉCOUVREZ",videosTitle:"Nos vidéos",videosIntro:"Découvrez la cuisine marocaine à travers nos vidéos.",videosLoading:"Chargement des vidéos...",videosEmpty:"Aucune vidéo disponible pour le moment.",videosError:"Impossible de charger les vidéos.",
    quote:"« La meilleure façon de découvrir une culture, c’est par sa cuisine. »",moments:"DES MOMENTS À PARTAGER",galleryTitle:"Au cœur de la cuisine marocaine",madeForYou:"UNE EXPÉRIENCE SUR MESURE",personalTitle:"Votre temps. Votre menu. Votre expérience.",personalText:"La durée du cours est flexible et définie selon votre demande. Le tarif dépend de la durée et est fixé personnellement par Mohamed. Contactez-le pour discuter de votre expérience idéale et recevoir un devis.",askPrice:"Demander un devis à Mohamed",letsPlan:"PRÉPARONS VOTRE EXPÉRIENCE",contactTitle:"Prêt à cuisiner à Fès ?",contactText:"Dites à Mohamed ce que vous souhaitez cuisiner, le temps dont vous disposez et si vous souhaitez visiter le marché.",whatsapp:"Contacter sur WhatsApp"
  },
  ar: {
    navExperience:"التجربة",navProducts:"منتجاتنا",navVideos:"الفيديوهات",navGallery:"معرض الصور",navAbout:"عن محمد",navContact:"اتصل بنا",book:"احجز الآن",
    heroEyebrow:"فاس · المغرب",heroTitle:"اكتشفوا فن الطبخ المغربي",heroText:"تعلموا الطبخ واكتشفوا نكهات وثقافة المغرب مع محمد، في تجربة على حسب اختياركم.",bookExperience:"احجزوا تجربتكم",discover:"اكتشفوا التجربة",heroNote:"مطبخ أصيل · ثقافة محلية · تجربة شخصية",
    caption:"لحظة جميلة في المطبخ",welcome:"مرحبا بكم في مطبخي",introTitle:"نكهة المغرب، نحضروها مع بعضنا",introText:"مرحبا بكم مع محمد في فاس لاكتشاف المطبخ المغربي بطريقة عملية وممتعة. اختاروا الأطباق اللي بغيتو تتعلمو، واكتشفوا المكونات المحلية ومتعة الطبخ مع بعضنا.",talkMohamed:"تواصلوا مع محمد",
    yourExperience:"تجربتكم",experienceTitle:"أكثر من مجرد درس في الطبخ",experienceIntro:"تجربة مغربية خاصة، كتتنظم حسب رغباتكم والوقت اللي مناسب ليكم.",feature1Title:"اختاروا الأطباق ديالكم",feature1Text:"تعلموا تحضير الأكلات المغربية اللي كتختاروها، من الأطباق التقليدية حتى للوصفات اللي باغين تكتاشفوها.",feature2Title:"اكتشفوا السوق المغربي",feature2Text:"إلا بغيتو، تقدروا تخرجو مع محمد تشريو المكونات وتكتاشفو أجواء وروائح ونكهات السوق المغربي.",optional:"نشاط اختياري",feature3Title:"طيبو مع بعضكم",feature3Text:"شاركو فعملية الطبخ، تعلمو تقنيات عملية واكتاشفو الحكايات اللي ورا المطبخ المغربي.",
    productsEyebrow:"اختياراتنا",productsTitle:"منتجاتنا",productsIntro:"اكتشفوا مجموعة من المنتجات المغربية.",productsLoading:"كنحملو المنتجات...",productsEmpty:"ما كايناش منتجات متوفرة حاليا.",productsError:"ما قدرناش نحملو المنتجات.",productContact:"تواصل معنا",
    videosEyebrow:"شوفوا واكتشفوا",videosTitle:"الفيديوهات ديالنا",videosIntro:"اكتشفوا المطبخ المغربي من خلال الفيديوهات.",videosLoading:"كنحملو الفيديوهات...",videosEmpty:"ما كايناش فيديوهات متوفرة حاليا.",videosError:"ما قدرناش نحملو الفيديوهات.",
    quote:"« أحسن طريقة لاكتشاف ثقافة هي من خلال الماكلة ديالها. »",moments:"لحظات للمشاركة",galleryTitle:"داخل المطبخ المغربي",madeForYou:"تجربة على حساب رغبتكم",personalTitle:"وقتكم. المينيو ديالكم. تجربتكم.",personalText:"مدة حصة الطبخ مرنة وكتكون حسب طلبكم. الثمن كيتحدد حسب المدة، والشاف محمد هو اللي كيحددو بنفسو. تواصلو معاه باش تناقشو التجربة اللي بغيتو وتاخدو الثمن.",askPrice:"طلب الثمن من محمد",letsPlan:"نوجدو التجربة ديالكم",contactTitle:"واجدين تطيبو ففاس؟",contactText:"قولو لمحمد شنو بغيتو تطيبو، شحال من الوقت عندكم، وواش باغين تزورو السوق المغربي.",whatsapp:"تواصلوا عبر واتساب"
  }
};

const language = document.getElementById("language");
const productsContainer = document.getElementById("products-list");
const videosContainer = document.getElementById("videos-list");

let currentLanguage = localStorage.getItem("darMohamedLanguage") || "en";

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function setLanguage(lang) {
  const t = translations[lang] || translations.en;
  currentLanguage = translations[lang] ? lang : "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  document.title =
    currentLanguage === "ar" ? "كوكينغ كلاس مع دار محمد | فاس، المغرب" :
    currentLanguage === "fr" ? "Cours de cuisine avec Dar Mohamed | Fès, Maroc" :
    "Cooking Class with Dar Mohamed | Fes, Morocco";

  localStorage.setItem("darMohamedLanguage", currentLanguage);

  loadProducts();
  loadVideos();
}

async function loadProducts() {
  if (!productsContainer) return;

  const t = translations[currentLanguage] || translations.en;
  productsContainer.innerHTML = `<p>${t.productsLoading}</p>`;

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,name,description,price,image_url,category,stock,is_active,created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Products error:", error);
      productsContainer.innerHTML = `<p>Products error: ${escapeHTML(error.message)}</p>`;
      return;
    }

    if (!data || data.length === 0) {
      productsContainer.innerHTML = `<p>${t.productsEmpty}</p>`;
      return;
    }

    productsContainer.innerHTML = data.map(product => {
      const name = escapeHTML(product.name);
      const description = escapeHTML(product.description);
      const category = escapeHTML(product.category);
      const image = product.image_url
        ? `<img src="${escapeHTML(product.image_url)}" alt="${name}" loading="lazy">`
        : "";

      const price = Number(product.price).toLocaleString(
        currentLanguage === "ar" ? "ar-MA" :
        currentLanguage === "fr" ? "fr-FR" : "en"
      );

      const message = encodeURIComponent(
        currentLanguage === "ar"
          ? `السلام عليكم، بغيت معلومات على: ${product.name}`
          : currentLanguage === "fr"
          ? `Bonjour, je souhaite des informations sur : ${product.name}`
          : `Hello, I would like information about: ${product.name}`
      );

      return `
        <article class="product-card">
          <div class="product-image">${image}</div>
          <div class="product-info">
            ${category ? `<span class="product-category">${category}</span>` : ""}
            <h3>${name}</h3>
            ${description ? `<p>${description}</p>` : ""}
            <div class="product-bottom">
              <strong>${price} MAD</strong>
              <a class="button button-small" href="https://wa.me/212639384644?text=${message}" target="_blank" rel="noopener">${t.productContact}</a>
            </div>
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error("Products exception:", error);
    productsContainer.innerHTML = `<p>Products error: ${escapeHTML(error.message || error)}</p>`;
  }
}

function getVideoEmbed(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;

      if (parsed.pathname.startsWith("/embed/")) {
        return `https://www.youtube-nocookie.com${parsed.pathname}`;
      }
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      if (id) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) {
        return `https://player.vimeo.com/video/${id}`;
      }
    }
  } catch (error) {
    console.error("Video URL error:", error);
    return null;
  }

  return null;
}

async function loadVideos() {
  if (!videosContainer) return;

  const t = translations[currentLanguage] || translations.en;
  videosContainer.innerHTML = `<p>${t.videosLoading}</p>`;

  try {
    const { data, error } = await supabase
      .from("videos")
      .select("id,title,description,video_url,thumbnail_url,language,is_active,created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Videos error:", error);
      videosContainer.innerHTML = `<p>Videos error: ${escapeHTML(error.message)}</p>`;
      return;
    }

    if (!data || data.length === 0) {
      videosContainer.innerHTML = `<p>${t.videosEmpty}</p>`;
      return;
    }

    videosContainer.innerHTML = data.map(video => {
      const title = escapeHTML(video.title);
      const description = escapeHTML(video.description);
      const thumbnail = escapeHTML(video.thumbnail_url || "");
      const videoUrl = escapeHTML(video.video_url || "");
      const embedUrl = getVideoEmbed(video.video_url || "");

      let player = "";

      if (embedUrl) {
        player = `
          <iframe
            src="${escapeHTML(embedUrl)}"
            title="${title}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>`;
      } else if (videoUrl) {
        player = `
          <video controls preload="metadata" ${thumbnail ? `poster="${thumbnail}"` : ""}>
            <source src="${videoUrl}">
          </video>`;
      }

      const languageLabel = video.language
        ? `<span class="video-language">${escapeHTML(video.language.toUpperCase())}</span>`
        : "";

      return `
        <article class="video-card">
          <div class="video-player">
            ${player || (thumbnail ? `<img src="${thumbnail}" alt="${title}" loading="lazy">` : "")}
          </div>
          <div class="video-info">
            ${languageLabel}
            <h3>${title}</h3>
            ${description ? `<p>${description}</p>` : ""}
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error("Videos exception:", error);
    videosContainer.innerHTML = `<p>Videos error: ${escapeHTML(error.message || error)}</p>`;
  }
}

if (language) {
  language.addEventListener("change", event => {
    setLanguage(event.target.value);
  });

  language.value = currentLanguage;
}

setLanguage(currentLanguage);

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
