document.addEventListener("DOMContentLoaded", function () {
    fetch("../models/about-us.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("about-us-container");
            data["about-us"].forEach(item => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = item.link;
                a.textContent = item.name;
                if (item.new_tab) {
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                }
                li.appendChild(a);
                container.appendChild(li);
            });
            const policyContainer = document.getElementById("policy-container");
            data.policy.forEach(item => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = item.link;
                a.textContent = item.name;
                if (item.new_tab) {
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                }
                li.appendChild(a);
                policyContainer.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
