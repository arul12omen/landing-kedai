  // ====== PENGATURAN ======
  var WA = '62XXXXXXXXXX';      // nomor WhatsApp tanpa + dan tanpa 0 di depan
  var NAME = 'Nama Kedai';
  var MENU = {
    kopi: [
      { n: 'Espresso', d: 'Shot pekat dengan crema tebal.', p: 'Rp [harga]' },
      { n: 'Americano', d: 'Espresso dan air panas, bersih dan ringan.', p: 'Rp [harga]' },
      { n: 'Flat White', d: 'Espresso dengan susu velvety.', p: 'Rp [harga]' },
      { n: 'Kopi Susu Gula Aren', d: 'Manis legit, favorit semua orang.', p: 'Rp [harga]' },
      { n: 'V60 Manual Brew', d: 'Seduh tangan, pilih biji sesuai selera.', p: 'Rp [harga]' },
      { n: 'Cold Brew', d: 'Diseduh dingin berjam-jam, halus dan segar.', p: 'Rp [harga]' }
    ],
    nonkopi: [
      { n: 'Matcha Latte', d: 'Matcha creamy dengan susu pilihan.', p: 'Rp [harga]' },
      { n: 'Cokelat Panas', d: 'Cokelat pekat yang menghangatkan.', p: 'Rp [harga]' },
      { n: 'Lemon Tea', d: 'Teh segar dengan perasan lemon.', p: 'Rp [harga]' },
      { n: 'Fresh Juice', d: 'Buah segar tanpa pemanis tambahan.', p: 'Rp [harga]' }
    ],
    makanan: [
      { n: 'Croissant', d: 'Renyah di luar, lembut di dalam.', p: 'Rp [harga]' },
      { n: 'Roti Bakar', d: 'Pilihan topping manis atau gurih.', p: 'Rp [harga]' },
      { n: 'Kentang Goreng', d: 'Teman ngobrol yang sempurna.', p: 'Rp [harga]' },
      { n: 'Cookies', d: 'Dipanggang setiap hari.', p: 'Rp [harga]' }
    ]
  };
  // ========================

  var cat = 'kopi', cart = {};
  var rows = document.getElementById('rows');
  var tabs = document.querySelectorAll('.tab');

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function render(){
    rows.innerHTML = MENU[cat].map(function(i){
      var q = cart[i.n] || 0, n = esc(i.n);
      return '<div class="row"><div class="mi"><div class="nm">' + n + '</div><div class="ds">' + esc(i.d) + '</div></div>' +
  '<div class="lead"></div><div class="pr">' + esc(i.p) + '</div><div class="ctl">' +
  (q ? '<button class="cb" data-act="sub" data-n="' + n + '" aria-label="Kurangi ' + n + '">−</button><span class="qty">' + q + '</span>' : '') +
  '</div></div>';
    }).join('');
    tabs.forEach(function(t){
      var on = t.dataset.cat === cat;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    updateBar();
  }

  function updateBar(){
    var names = Object.keys(cart).filter(function(k){ return cart[k] > 0; });
    var total = names.reduce(function(s,k){ return s + cart[k]; }, 0);
    var text, cta, msg;
    if (total) {
      msg = 'Halo ' + NAME + ', saya mau pesan:\n' + names.map(function(k){ return '- ' + cart[k] + 'x ' + k; }).join('\n') + '\n\nTerima kasih!';
      text = total + ' item dipilih'; cta = 'Kirim pesanan';
    } else {
      msg = 'Halo ' + NAME + ', saya mau tanya.';
      text = 'Ada pertanyaan?'; cta = 'Chat WhatsApp';
    }
    document.getElementById('bar-text').textContent = text;
    document.getElementById('bar-cta').textContent = cta;
    document.getElementById('bar-link').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  rows.addEventListener('click', function(e){
    var b = e.target.closest('button[data-act]');
    if (!b) return;
    var n = b.dataset.n;
    cart[n] = Math.max(0, (cart[n] || 0) + (b.dataset.act === 'add' ? 1 : -1));
    render();
  });
  tabs.forEach(function(t){ t.addEventListener('click', function(){ cat = t.dataset.cat; render(); }); });

  document.getElementById('year').textContent = new Date().getFullYear();
  render();