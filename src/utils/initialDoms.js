
export default function toggleSidebar() {
    return (
        document
            .getElementById("handle_toggle_sidemenu")
            .addEventListener("change", function () {
                console.log(this);
                if (this.checked) {
                    document.querySelector(".mini_sidebar").classList.add("expanded");
                    document
                        .getElementById("content_section")
                        .classList.add("with_sidebar");
                } else {
                    document.querySelector(".mini_sidebar").classList.remove("expanded");
                    document
                        .getElementById("content_section")
                        .classList.remove("with_sidebar");
                }
            })
  )
}