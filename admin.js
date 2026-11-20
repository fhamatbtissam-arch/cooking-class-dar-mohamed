
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://fbvhigcgcmyhznclukov.supabase.co";
const SUPABASE_KEY = "sb_publishable_BVGY1F_M8eYyADwebBtiSw_5Kud29yK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "جاري تسجيل الدخول...";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value
    });

    if (error) throw error;

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError) throw adminError;

    if (!admin) {
      await supabase.auth.signOut();
      message.textContent = "ليس لديك صلاحية الإدارة.";
      return;
    }

    showDashboard();
  } catch (error) {
    message.textContent = "خطأ: " + error.message;
  }
});

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

/* لوحة الإدارة */

function showDashboard() {
  document.querySelector(".container").innerHTML = `
    <h1>لوحة إدارة Dar Mohamed</h1>
    <button id="bookingsTab">الحجوزات</button>
    <button id="productsTab">المنتجات</button>
    <button id="videosTab">الفيديوهات</button>
    <button id="logoutButton">تسجيل الخروج</button>
    <div id="dashboardContent"></div>
  `;

  document.getElementById("bookingsTab").onclick = loadBookings;
  document.getElementById("productsTab").onclick = loadProducts;
  document.getElementById("videosTab").onclick = loadVideos;

  document.getElementById("logoutButton").onclick = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  loadBookings();
}

/* الحجوزات */

async function loadBookings() {
  const area = document.getElementById("dashboardContent");
  area.innerHTML = "<h2>الحجوزات</h2><p>جاري التحميل...</p>";

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    area.textContent = "خطأ: " + error.message;
    return;
  }

  if (!data.length) {
    area.innerHTML = "<h2>الحجوزات</h2><p>لا توجد حجوزات حاليا.</p>";
    return;
  }

  area.innerHTML = `
    <h2>الحجوزات (${data.length})</h2>
    <div style="overflow-x:auto">
      <table style="width:100%;min-width:650px;border-collapse:collapse">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الهاتف</th>
            <th>التاريخ</th>
            <th>الأشخاص</th>
            <th>الرسالة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(b => `
            <tr>
              <td>${safe(b.customer_name)}</td>
              <td>${safe(b.email)}</td>
              <td>${safe(b.phone)}</td>
              <td>${safe(b.booking_date)}</td>
              <td>${safe(b.guests)}</td>
              <td>${safe(b.message)}</td>
              <td>
                <select data-booking="${safe(b.id)}">
                  <option value="pending" ${b.status === "pending" ? "selected" : ""}>قيد الانتظار</option>
                  <option value="confirmed" ${b.status === "confirmed" ? "selected" : ""}>مقبول</option>
                  <option value="cancelled" ${b.status === "cancelled" ? "selected" : ""}>ملغى</option>
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  area.querySelectorAll("[data-booking]").forEach(select => {
    select.onchange = async () => {
      const { error } = await supabase
        .from("bookings")
        .update({ status: select.value })
        .eq("id", select.dataset.booking);

      if (error) alert("خطأ: " + error.message);
      else alert("تم تحديث حالة الحجز.");
    };
  });
}

/* المنتجات */

async function loadProducts() {
  const area = document.getElementById("dashboardContent");

  area.innerHTML = `
    <h2>إدارة المنتجات</h2>
    <button id="addProduct">إضافة منتج جديد</button>
    <div id="productFormArea"></div>
    <div id="productsList">جاري تحميل المنتجات...</div>
  `;

  document.getElementById("addProduct").onclick = () => productForm();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const list = document.getElementById("productsList");

  if (error) {
    list.textContent = "خطأ: " + error.message;
    return;
  }

  if (!data.length) {
    list.textContent = "لا توجد منتجات حاليا.";
    return;
  }

  list.innerHTML = data.map(p => `
    <div style="background:white;padding:15px;margin:12px 0;border-radius:10px">
      ${p.image_url ? `
        <img src="${safe(p.image_url)}"
          style="width:100px;height:100px;object-fit:cover;border-radius:8px">
      ` : ""}
      <h3>${safe(p.name)}</h3>
      <p>${safe(p.description)}</p>
      <p>الثمن: ${safe(p.price)} | المخزون: ${safe(p.stock)}</p>
      <p>الصنف: ${safe(p.category)} | ${p.is_active ? "نشط" : "غير نشط"}</p>
      <button data-edit="${safe(p.id)}">تعديل</button>
      <button data-delete="${safe(p.id)}">حذف</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-edit]").forEach(button => {
    button.onclick = () => {
      const product = data.find(p => String(p.id) === button.dataset.edit);
      productForm(product);
    };
  });

  list.querySelectorAll("[data-delete]").forEach(button => {
    button.onclick = async () => {
      if (!confirm("واش متأكد بغيتي تحذف هاد المنتج؟")) return;

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", button.dataset.delete);

      if (error) {
        alert("خطأ: " + error.message);
      } else {
        alert("تم حذف المنتج.");
        loadProducts();
      }
    };
  });
}

function productForm(product = null) {
  const area = document.getElementById("productFormArea");

  area.innerHTML = `
    <h3>${product ? "تعديل المنتج" : "إضافة منتج جديد"}</h3>

    <form id="productEditor">
      <label>اسم المنتج</label>
      <input name="name" required value="${safe(product?.name)}">

      <label>الوصف</label>
      <textarea name="description">${safe(product?.description)}</textarea>

      <label>الثمن</label>
      <input name="price" type="number" min="0" step="0.01"
        required value="${safe(product?.price)}">

      <label>اختيار صورة من الهاتف</label>
      <input name="photo" type="file" accept="image/*">

      <p id="photoMessage">اختار صورة للمنتج</p>

      ${product?.image_url ? `
        <img src="${safe(product.image_url)}"
          style="width:110px;border-radius:8px">
      ` : ""}

      <label>الصنف</label>
      <input name="category" value="${safe(product?.category)}">

      <label>المخزون</label>
      <input name="stock" type="number" min="0"
        value="${safe(product?.stock ?? 0)}">

      <label>
        <input name="is_active" type="checkbox"
          ${product?.is_active !== false ? "checked" : ""}>
        منتج نشط
      </label>

      <button type="submit">حفظ المنتج</button>
      <button type="button" id="cancelProduct">إلغاء</button>
    </form>
  `;

  const editor = document.getElementById("productEditor");
  const photoInput = editor.elements.photo;

  photoInput.onchange = () => {
    const file = photoInput.files[0];
    document.getElementById("photoMessage").textContent =
      file ? "الصورة المختارة: " + file.name : "اختار صورة للمنتج";
  };

  document.getElementById("cancelProduct").onclick = () => {
    area.innerHTML = "";
  };

  editor.onsubmit = async event => {
    event.preventDefault();

    const button = editor.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = "جاري الحفظ...";

    try {
      const f = new FormData(editor);
      let imageUrl = product?.image_url || "";
      const photo = photoInput.files[0];

      if (photo) {
        if (!photo.type.startsWith("image/")) {
          throw new Error("اختار ملف صورة فقط.");
        }

        if (photo.size > 5 * 1024 * 1024) {
          throw new Error("حجم الصورة خاصو يكون أقل من 5 ميغابايت.");
        }

        const extension = photo.name.split(".").pop().toLowerCase();
        const path = "products/" + crypto.randomUUID() + "." + extension;

        const { error: uploadError } = await supabase.storage
          .from("site-images")
          .upload(path, photo, {
            contentType: photo.type,
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: imageData } = supabase.storage
          .from("site-images")
          .getPublicUrl(path);

        imageUrl = imageData.publicUrl;
      }

      const item = {
        name: f.get("name").trim(),
        description: f.get("description"),
        price: Number(f.get("price")),
        image_url: imageUrl,
        category: f.get("category"),
        stock: Number(f.get("stock") || 0),
        is_active: f.get("is_active") === "on"
      };

      const result = product
        ? await supabase.from("products").update(item).eq("id", product.id)
        : await supabase.from("products").insert(item);

      if (result.error) throw result.error;

      alert("تم حفظ المنتج بنجاح.");
      area.innerHTML = "";
      loadProducts();

    } catch (error) {
      alert("وقع خطأ: " + error.message);
      button.disabled = false;
      button.textContent = "حفظ المنتج";
    }
  };
}

/* الفيديوهات */

async function loadVideos() {
  const area = document.getElementById("dashboardContent");

  area.innerHTML = `
    <h2>إدارة الفيديوهات</h2>
    <button id="addVideo">إضافة فيديو جديد</button>
    <div id="videoFormArea"></div>
    <div id="videosList">جاري تحميل الفيديوهات...</div>
  `;

  document.getElementById("addVideo").onclick = () => videoForm();

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  const list = document.getElementById("videosList");

  if (error) {
    list.textContent = "خطأ: " + error.message;
    return;
  }

  if (!data.length) {
    list.textContent = "لا توجد فيديوهات حاليا.";
    return;
  }

  list.innerHTML = data.map(v => `
    <div style="background:white;padding:15px;margin:12px 0;border-radius:10px">
      ${v.thumbnail_url ? `
        <img src="${safe(v.thumbnail_url)}"
          style="width:180px;max-width:100%;border-radius:8px">
      ` : ""}
      <h3>${safe(v.title)}</h3>
      <p>${safe(v.description)}</p>
      <p>اللغة: ${safe(v.language)}</p>
      <p>الحالة: ${v.is_active ? "ظاهر في الموقع" : "مخفي"}</p>
      <button data-video-edit="${safe(v.id)}">تعديل</button>
      <button data-video-delete="${safe(v.id)}">حذف</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-video-edit]").forEach(button => {
    button.onclick = () => {
      const video = data.find(v => String(v.id) === button.dataset.videoEdit);
      videoForm(video);
    };
  });

  list.querySelectorAll("[data-video-delete]").forEach(button => {
    button.onclick = async () => {
      if (!confirm("واش متأكد بغيتي تحذف هاد الفيديو؟")) return;

      const { error } = await supabase
        .from("videos")
        .delete()
        .eq("id", button.dataset.videoDelete);

      if (error) {
        alert("خطأ: " + error.message);
      } else {
        alert("تم حذف الفيديو.");
        loadVideos();
      }
    };
  });
}

function videoForm(video = null) {
  const area = document.getElementById("videoFormArea");

  area.innerHTML = `
    <h3>${video ? "تعديل الفيديو" : "إضافة فيديو جديد"}</h3>

    <form id="videoEditor">
      <label>عنوان الفيديو</label>
      <input name="title" required value="${safe(video?.title)}">

      <label>الوصف</label>
      <textarea name="description">${safe(video?.description)}</textarea>

      <label>اختيار فيديو من الهاتف</label>
      <input name="video_file" type="file" accept="video/*">

      <p id="videoFileMessage">
        ${video?.video_url ? "يوجد فيديو محفوظ. اختار فيديو جديد إذا أردت تغييره." : "اختار الفيديو من الهاتف"}
      </p>

      <label>أو رابط الفيديو (اختياري)</label>
      <input
        name="video_url"
        type="url"
        placeholder="https://..."
        value="${safe(video?.video_url)}"
      >

      <label>رابط الصورة المصغرة (اختياري)</label>
      <input
        name="thumbnail_url"
        type="url"
        placeholder="https://..."
        value="${safe(video?.thumbnail_url)}"
      >

      <label>اللغة</label>
      <select name="language">
        <option value="en" ${video?.language === "en" ? "selected" : ""}>English</option>
        <option value="fr" ${video?.language === "fr" ? "selected" : ""}>Français</option>
        <option value="ar" ${video?.language === "ar" ? "selected" : ""}>العربية</option>
      </select>

      <label>
        <input name="is_active" type="checkbox"
          ${video?.is_active !== false ? "checked" : ""}>
        إظهار الفيديو في الموقع
      </label>

      <button type="submit">حفظ الفيديو</button>
      <button type="button" id="cancelVideo">إلغاء</button>
    </form>
  `;

  const editor = document.getElementById("videoEditor");
  const videoInput = editor.elements.video_file;

  videoInput.onchange = () => {
    const file = videoInput.files[0];
    document.getElementById("videoFileMessage").textContent =
      file ? "الفيديو المختار: " + file.name : "اختار الفيديو من الهاتف";
  };

  document.getElementById("cancelVideo").onclick = () => {
    area.innerHTML = "";
  };

  editor.onsubmit = async event => {
    event.preventDefault();

    const button = editor.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = "جاري الحفظ...";

    try {
      const f = new FormData(editor);
      const videoFile = videoInput.files[0];

      let videoUrl = video?.video_url || f.get("video_url").trim();

      if (videoFile) {
        if (!videoFile.type.startsWith("video/")) {
          throw new Error("اختار ملف فيديو فقط.");
        }

        if (videoFile.size > 50 * 1024 * 1024) {
          throw new Error("حجم الفيديو خاصو يكون أقل من 50 ميغابايت.");
        }

        button.textContent = "جاري رفع الفيديو...";

        const extension = videoFile.name.split(".").pop().toLowerCase();
        const path = "videos/" + crypto.randomUUID() + "." + extension;

        const { error: uploadError } = await supabase.storage
          .from("site-videos")
          .upload(path, videoFile, {
            contentType: videoFile.type,
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: videoData } = supabase.storage
          .from("site-videos")
          .getPublicUrl(path);

        videoUrl = videoData.publicUrl;
      }

      if (!videoUrl) {
        throw new Error("اختار فيديو من الهاتف أو أدخل رابط الفيديو.");
      }

      const item = {
        title: f.get("title").trim(),
        description: f.get("description"),
        video_url: videoUrl,
        thumbnail_url: f.get("thumbnail_url").trim(),
        language: f.get("language"),
        is_active: f.get("is_active") === "on"
      };

      button.textContent = "جاري حفظ البيانات...";

      const result = video
        ? await supabase.from("videos").update(item).eq("id", video.id)
        : await supabase.from("videos").insert(item);

      if (result.error) throw result.error;

      alert("تم حفظ الفيديو بنجاح.");
      area.innerHTML = "";
      loadVideos();

    } catch (error) {
      alert("وقع خطأ: " + error.message);
      button.disabled = false;
      button.textContent = "حفظ الفيديو";
    }
  };
}
