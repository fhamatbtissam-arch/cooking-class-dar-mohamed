
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
      email: email,
      password: password
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
      message.textContent = "هذا الحساب ليس لديه صلاحية الإدارة.";
      return;
    }

    message.textContent = "تم تسجيل الدخول بنجاح!";
    form.innerHTML = "<h2>مرحبا بك في لوحة الإدارة</h2>";

  } catch (error) {
    message.textContent = "خطأ في تسجيل الدخول: " + error.message;
  }
});
