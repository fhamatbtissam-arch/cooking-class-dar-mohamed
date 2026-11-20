
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://fbvhigcgcmyhznclukov.supabase.co";
const SUPABASE_KEY = "sb_publishable_BVGY1F_M8eYyADwebBtiSw_5Kud29yK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  message.textContent = "جاري تسجيل الدخول...";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
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
    <p>إدارة الحجوزات</p>

    <button id="refreshBookings">تحديث الحجوزات</button>
    <button id="logoutButton">تسجيل الخروج</button>

    <p id="bookingMessage">جاري تحميل الحجوزات...</p>

    <div style="overflow-x:auto">
      <table id="bookingsTable" style="width:100%;border-collapse:collapse;min-width:650px">
        <thead>
          <tr>
            <th>رقم</th>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الهاتف</th>
            <th>التاريخ</th>
            <th>الأشخاص</th>
            <th>الرسالة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

  document.getElementById("refreshBookings")
    .addEventListener("click", loadBookings);

  document.getElementById("logoutButton")
    .addEventListener("click", async () => {
      await supabase.auth.signOut();
      location.reload();
    });

  loadBookings();
}

async function loadBookings() {
  const info = document.getElementById("bookingMessage");
  const tbody = document.querySelector("#bookingsTable tbody");

  info.textContent = "جاري تحميل الحجوزات...";
  tbody.innerHTML = "";

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    info.textContent = "تعذر تحميل الحجوزات: " + error.message;
    return;
  }

  if (!data || data.length === 0) {
    info.textContent = "لا توجد حجوزات حاليا.";
    return;
  }

  info.textContent = "عدد الحجوزات: " + data.length;

  data.forEach((booking) => {
    const tr = document.createElement("tr");

    const values = [
      booking.id,
      booking.customer_name,
      booking.email,
      booking.phone,
      booking.booking_date,
      booking.guests,
      booking.message
    ];

    values.forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value ?? "-";
      td.style.padding = "10px";
      td.style.borderBottom = "1px solid #ddd";
      tr.appendChild(td);
    });

    const statusCell = document.createElement("td");
    const select = document.createElement("select");

    const statuses = [
      ["pending", "قيد الانتظار"],
      ["confirmed", "مقبول"],
      ["cancelled", "ملغى"]
    ];

    statuses.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });

    select.value = statuses.some(([value]) => value === booking.status)
      ? booking.status
      : "pending";

    select.addEventListener("change", async () => {
      select.disabled = true;

      const { error } = await supabase
        .from("bookings")
        .update({ status: select.value })
        .eq("id", booking.id);

      if (error) {
        alert("وقع خطأ: " + error.message);
        select.value = booking.status || "pending";
      } else {
        booking.status = select.value;
        alert("تم تحديث حالة الحجز بنجاح.");
      }

      select.disabled = false;
    });

    statusCell.appendChild(select);
    statusCell.style.padding = "10px";
    tr.appendChild(statusCell);

    tbody.appendChild(tr);
  });
}
