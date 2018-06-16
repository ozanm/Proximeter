document.getElementById('get_started').onclick = function() {
  document.getElementById('title').classList.add("exit");
  console.log("added class");
  setTimeout(750, function() {
    document.getElementById('explanation').classList.add("exit");
  });
}
