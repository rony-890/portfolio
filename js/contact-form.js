/* Contact form: submit without leaving the page, keep a real POST fallback. */
(function () {
  var form = document.getElementById("contact-form");
  if (!form || !window.fetch) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  function setStatus(text, state) {
    if (!status) return;
    status.textContent = text || "";
    if (state) status.setAttribute("data-state", state);
    else status.removeAttribute("data-state");
  }

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) return;
    event.preventDefault();
    var data = new FormData(form);
    var label = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending";
    }
    setStatus("", null);
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        setStatus("Message sent. Thank you.", "ok");
      })
      .catch(function () {
        setStatus("Could not send. Email instead?", "err");
      })
      .then(function () {
        if (button) {
          button.disabled = false;
          button.textContent = label;
        }
      });
  });
})();
