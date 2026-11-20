
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

function showDashboard() {
  document.querySelector(".container").innerHTML = `
    <h1>لوحة إدارة Dar Mohamed</h1>
    <button id="bookingsTab">الحجوزات</button>
    <button id="productsTab">المنتجات</button>
    <button id="logoutButton">تسجيل الخروج</button>
    <div id="dashboardContent"></div>
  `;

  document.getElementById("bookingsTab").onclick = loadBookings;
  document.getElementById("productsTab").onclick = loadProducts;
  document.getElementById("logoutButton").onclick = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  loadBookings();
}

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

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
        <thead><tr>
          <th>الاسم</th><th>البريد</th><th>الهاتف</th>
          <th>التاريخ</th><th>الأشخاص</th><th>الرسالة</th><th>الحالة</th>
        </tr></thead>
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
            </tr>`).join("")}
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

async function loadProducts() {
  const area = document.getElementById("dashboardContent");
  area.innerHTML = `
    <h2>إدارة المنتجات</h2>
    <button id="addProduct">إضافة منتج جديد</button>
    <div id="productFormArea"></div>
    <p>جاري تحميل المنتجات...</p>
    <div id="productsList"></div>
  `;

  document.getElementById("addProduct").onclick = () => productForm();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    area.querySelector("#productsList").textContent = "خطأ: " + error.message;
    return;
  }

  const list = document.getElementById("productsList");

  if (!data.length) {
    list.textContent = "لا توجد منتجات حاليا.";
    return;
  }

  list.innerHTML = data.map(p => `
    <div style="background:#fff;padding:15px;margin:12px 0;border-radius:10px">
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

      if (error) alert("خطأ: " + error.message);
      else {
        alert("تم حذف المنتج.");
        loadProducts();
      }
    };
  });
}

function productForm(product = null) {
  const area = document.getElementById("productFormArea");

  area.innerHTML = `
    <h3>${product ? "تعديل المنتج" : "إضافة منتج"}</h3>
    <form id="productEditor">
      <label>اسم المنتج</label>
      <input name="name" required value="${safe(product?.name)}">

      <label>الوصف</label>
      <textarea name="description">${safe(product?.description)}</textarea>

      <label>الثمن</label>
      <input name="price" type="number" min="0" step="0.01" required value="${safe(product?.price)}">

      <label>رابط الصورة</label>
      <input name="image_url" type="url" value="${safe(product?.image_url)}">

      <label>الصنف</label>
      <input name="category" value="${safe(product?.category)}">

      <label>المخزون</label>
      <input name="stock" type="number" min="0" value="${safe(product?.stock ?? 0)}">

      <label>
        <input name="is_active" type="checkbox" ${product?.is_active !== false ? "checked" : ""}>
        منتج نشط
      </label>

      <button type="submit">حفظ المنتج</button>
      <button type="button" id="cancelProduct">إلغاء</button>
    </form>
  `;

  document.getElementById("cancelProduct").onclick = () => {
    area.innerHTML = "";
  };

  document.getElementById("productEditor").onsubmit = async event => {
    event.preventDefault();

    const f = new FormData(event.target);
    const item = {
      name: f.get("name").trim(),
      description: f.get("description"),
      price: Number(f.get("price")),
      image_url: f.get("image_url"),
      category: f.get("category"),
      stock: Number(f.get("stock") || 0),
      is_active: f.get("is_active") === "on"
    };

    const result = product
      ? await supabase.from("products").update(item).eq("id", product.id)
      : await supabase.from("products").insert(item);

    if (result.error) {
      alert("خطأ في الحفظ: " + result.error.message);
      return;
    }

    alert("تم حفظ المنتج بنجاح.");
    area.innerHTML = "";
    loadProducts();
  };
}
