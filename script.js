document.getElementById('get_started').onclick = function() {
  document.getElementById('title').classList.add("exit");
  setTimeout(750, function() {
    document.getElementById('explanation').classList.add("exit");
  });
}
