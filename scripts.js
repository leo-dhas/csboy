document.addEventListener("DOMContentLoaded", loadFiles);

function uploadFile() {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const fileUrl = event.target.result;
    saveFile(file.name, fileUrl);
  };
  reader.readAsDataURL(file);
}

function saveFile(fileName, fileUrl) {
  let files = JSON.parse(localStorage.getItem("pdfFiles")) || [];
  files.unshift({ name: fileName, url: fileUrl }); // Add new file at the top
  localStorage.setItem("pdfFiles", JSON.stringify(files));
  loadFiles();
}

function loadFiles() {
  const pdfList = document.getElementById("pdf-list");
  pdfList.innerHTML = "";

  let files = JSON.parse(localStorage.getItem("pdfFiles")) || [];

  // Load PDFs from uploads folder (Requires a local server)
  const manualFiles = [
    { name: "G & M, Lab", url: "uploads/G & M, Lab.pdf" },
    { name: "Software Testing Lab manual", url: "uploads/Software Testing Lab manual.pdf" }
    { name: "Dot Net Lab.pdf", url: "uploads/Dot Net Lab.pdf" }
  ];

  files = [...manualFiles, ...files]; // Merge manually uploaded files

  if (files.length === 0) {
    pdfList.innerHTML = "<p>No files uploaded yet.</p>";
    return;
  }

  files.forEach(file => {
    const listItem = document.createElement("div");
    listItem.className = "pdf-item";
    listItem.innerHTML = `
      <strong>${file.name}</strong>
      <a href="view.html?file=${encodeURIComponent(file.url)}&name=${encodeURIComponent(file.name)}" class="btn">View</a>
      <a href="${file.url}" download="${file.name}" class="btn">Download</a>
    `;
    pdfList.appendChild(listItem);
  });
}
