<?php
$items_en = ['🌾 Imported Rice','🍅 Tomato Paste','☕ Coffee Beans','🧀 Cheese & Dairy','🍯 Premium Honey','🐟 Frozen Fish','🫒 Olives','🥛 Milk Powder','🍓 Jam','🤝 Troina — Dubai','🌍 York Agro — Turkey','🏭 Canon Dairy — Iraq','🏢 Oxide Co — Iraq'];
?>
<div class="ticker-wrap">
  <div class="ticker-track">
    <?php for ($r = 0; $r < 2; $r++): foreach ($items_en as $item): ?>
      <span class="ticker-item"><?php echo esc_html($item); ?><span class="ticker-sep">◆</span></span>
    <?php endforeach; endfor; ?>
  </div>
</div>
