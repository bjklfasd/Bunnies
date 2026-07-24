const form = document.getElementById("uv-form");
      const input = document.getElementById("uv-address");
      const overlay = document.getElementById("gameOverlay");
      const frame = document.getElementById("gameFrame");

      form.addEventListener("submit", async (e) => {
          e.preventDefault();

          await registerSW();

          const url = search(
              input.value,
              document.getElementById("uv-search-engine").value
          );

          frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
          overlay.classList.add("active");
      });

      document.getElementById("closeFrame").onclick = () => {
          overlay.classList.remove("active");
          frame.src = "about:blank";
      };

      document.getElementById("reloadFrame").onclick = () => {
          frame.contentWindow.location.reload();
      };