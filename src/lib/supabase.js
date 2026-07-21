const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://qpchobrjdybxeoruford.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwY2hvYnJqZHlieGVvcnVmb3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDQ5MjIsImV4cCI6MjA4NzQ4MDkyMn0.6u5IGJKMBO3cnvNPBbFMYn7yenV7Vtz-YObehRMGNIc";

/**
 * Fetch a form by title or form ID along with its fields for customer ID 189
 */
export async function fetchCustomerForm(formIdOrTitle) {
  try {
    let url = `${SUPABASE_URL}/rest/v1/forms?select=*,form_fields(*)&customer_id=eq.189`;
    if (formIdOrTitle.includes('-')) {
      url += `&id=eq.${formIdOrTitle}`;
    } else {
      url += `&title=ilike.${encodeURIComponent(formIdOrTitle)}`;
    }

    const res = await fetch(url, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!res.ok) throw new Error(`Failed to fetch form: ${res.statusText}`);
    const data = await res.json();
    if (data && data.length > 0) {
      const form = data[0];
      if (form.form_fields && Array.isArray(form.form_fields)) {
        form.form_fields.sort((a, b) => (a.field_order ?? 999) - (b.field_order ?? 999));
      }
      return form;
    }
    return null;
  } catch (err) {
    console.error("Error fetching form:", err);
    return null;
  }
}

/**
 * Submit dynamic form data into form_submissions table
 */
export async function submitFormData(formId, submittedData) {
  try {
    const payload = {
      form_id: formId,
      submitted_data: submittedData,
      submitted_at: new Date().toISOString()
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Submission failed (${res.status}): ${errText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error submitting form:", err);
    throw err;
  }
}
