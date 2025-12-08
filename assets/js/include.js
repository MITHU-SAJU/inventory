function includeHTML(callback) {
    const elements = document.querySelectorAll("[include-html]");
    let loadedCount = 0;

    elements.forEach(el => {
        const file = el.getAttribute("include-html");

        fetch(file)
            .then(res => res.text())
            .then(data => {
                el.innerHTML = data;
                loadedCount++;

                if (loadedCount === elements.length && typeof callback === "function") {
                    callback(); // run JS after sidebar loads
                }
            })
            .catch(err => console.log("Error loading component:", err));
    });
}
