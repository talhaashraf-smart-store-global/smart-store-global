// Load header & footer partials into #site-header and #site-footer
async function loadPartials(opts = {}) {
  const headerPath = opts.header || "/partials/header.html";
  const footerPath = opts.footer || "/partials/footer.html";

  try {
    const [h, f] = await Promise.all([
      fetch(headerPath, { cache: "no-cache" }),
      fetch(footerPath, { cache: "no-cache" }),
    ]);

    if (!h.ok || !f.ok) {
      throw new Error(
        `Missing partials:\nheader => ${h.status} ${h.url}\nfooter => ${f.status} ${f.url}`
      );
    }

    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    if (!headerEl || !footerEl) {
      throw new Error(
        "Add <div id='site-header'></div> and <div id='site-footer'></div> to the page."
      );
    }

    headerEl.innerHTML = await h.text();
    footerEl.innerHTML = await f.text();
  } catch (e) {
    console.error("Layout load error:", e);
  }
}

// Auto-load if someone forgets to call loadPartials()
document.addEventListener("DOMContentLoaded", () =>
  loadPartials().catch(console.error)
);
