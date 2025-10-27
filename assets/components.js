async function loadLayout() {
  try {
    const [h, f] = await Promise.all([
      fetch("/partials/header.html"),
      fetch("/partials/footer.html")
    ]);
    document.getElementById("header").innerHTML = await h.text();
    document.getElementById("footer").innerHTML = await f.text();
  } catch (e) {
    console.error("Layout load error:", e);
  }
}
document.addEventListener("DOMContentLoaded", loadLayout);
