USE samurai_db;

-- ─── CATEGORIES ─────────────────────────────────────────────────────────────
INSERT INTO categories (name, slug, description) VALUES
('Katanas', 'katanas', 'Authentic and display-grade Japanese katana swords'),
('Samurai Tees', 'samurai-tees', 'Premium heavyweight samurai-themed apparel'),
('Armor Sets', 'armor-sets', 'Samurai armor, helmets, and protective gear'),
('Accessories', 'accessories', 'Sword mounts, journals, and maintenance equipment'),
('Training Gear', 'training-gear', 'Bokken, shinai, dojo mats, and training equipment')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ─── ADMIN USER ─────────────────────────────────────────────────────────────
-- Password: bushido2026 (hashed with werkzeug pbkdf2:sha256)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@bushido.com',
 'pbkdf2:sha256:600000$bushidosalt$9e1b1c2d7f3a4e5b6c8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
 'admin')
ON DUPLICATE KEY UPDATE role = 'admin';

-- Note: The actual password hash will be set by the application seeder.
-- The backend app.py seeds the admin on first run with proper hash.

-- ─── PRODUCTS ────────────────────────────────────────────────────────────────

-- Katanas (category_id = 1)
INSERT INTO products (name, description, price, original_price, stock, category_id, image_key, rating, review_count) VALUES
('Oni Slayer',
 'The Oni Slayer is forged from T10 high-carbon steel with a traditional clay tempering process. The distinctive wavy hamon line tells the story of every fold. Its ornate oni-face tsuba and blood-red handle wrap make this a centerpiece for any serious collector.',
 299.99, NULL, 15, 1, 'oni-slayer', 4.80, 142),

('Shadow Reaper',
 'Matte black from tip to pommel. The Shadow Reaper absorbs light and reflects nothing. A weapon of absolute stealth philosophy, every component finished in flat black — blade, tsuba, handle. For the warrior who operates in darkness.',
 189.99, NULL, 22, 1, 'shadow-reaper', 4.60, 98),

("Dragon's Breath",
 "The Dragon's Breath is our most ornate blade. A golden temper line runs the full length of the blade like dragon fire. The sculpted dragon tsuba is cast in solid brass, with a gold silk-wrapped handle. A blade worthy of legends.",
 449.99, NULL, 8, 1, "dragon's-breath", 4.90, 67),

('Ghost Blade',
 'All white. All silence. The Ghost Blade is lacquered in pure white from blade to pommel, a haunting presence. Favored by the ghost warriors of feudal Japan who struck without warning and vanished without trace.',
 249.99, NULL, 12, 1, 'ghost-blade', 4.70, 115),

('Blood Moon Katana',
 'When the blood moon rises, warriors draw this blade. The circular tsuba features a crescent moon cutout, crimson handle wrap like dried blood, and a blade with a classic hamon that glows silver in moonlight.',
 379.99, NULL, 6, 1, 'blood-moon-katana', 4.80, 89);

-- Samurai Tees (category_id = 2)
INSERT INTO products (name, description, price, original_price, stock, category_id, image_key, rating, review_count) VALUES
('Ronin Silhouette Tee',
 'A lone samurai stands against the moon. This premium heavyweight cotton tee features a bold white silhouette print on a pure black base. The ronin walks alone — without master, without fear.',
 39.99, 49.99, 80, 2, 'ronin-silhouette-tee', 4.50, 234),

('Bushido Code Tee',
 'A full katana illustration runs the chest of this navy tee. The linework is precise and clean — a testament to the sword sacred place in Bushido philosophy. Simple. Powerful. Eternal.',
 34.99, NULL, 95, 2, 'bushido-code-tee', 4.40, 189),

('Cherry Blossom Warrior Tee',
 'A kabuto helmet surrounded by cherry blossoms — life and death in perfect balance. This charcoal tee captures the essence of mono no aware, the beauty of transience. Wear the philosophy.',
 44.99, NULL, 60, 2, 'cherry-blossom-warrior-tee', 4.70, 312),

('Void Swordsman Tee',
 'In the void between moments, the swordsman draws. This black tee features a single-stroke brushwork illustration of a warrior mid-iaijutsu draw, executed in blood red. Pure motion. Pure intent.',
 34.99, NULL, 100, 2, 'void-swordsman-tee', 4.30, 167),

('Dragon Temple Tee',
 'A coiling dragon wraps around a five-story pagoda in golden linework on a deep purple tee. This design draws from Edo-period woodblock prints, reimagined for the modern warrior.',
 49.99, NULL, 45, 2, 'dragon-temple-tee', 4.60, 203),

('Last Stand Tee',
 'Three samurai, back to back, outnumbered but unbroken. This black tee captures the legendary last stand of the Forty-Seven Ronin in pure white silhouette. Brotherhood. Honor. Sacrifice.',
 39.99, NULL, 70, 2, 'last-stand-tee', 4.50, 278);

-- Armor Sets (category_id = 3)
INSERT INTO products (name, description, price, original_price, stock, category_id, image_key, rating, review_count) VALUES
('Kage Chest Plate',
 'The Kage (Shadow) chest plate is constructed from high-grade steel with authentic lamellar construction. The family crest position features a removable mon holder. Each piece comes with a signed certificate of craftsmanship.',
 599.99, NULL, 4, 3, 'kage-chest-plate', 4.90, 28),

('Oni Mask Set',
 'Strike fear before the first blow. The Oni Mask Set includes a full iron mengu with detachable menpou, hand-painted in traditional oni red with gilt horns and real horsehair mustache.',
 149.99, NULL, 18, 3, 'oni-mask-set', 4.80, 94),

('Samurai Kabuto Helmet',
 'A display-grade Kabuto helmet based on Edo-period designs. Features multi-plate shikoro neck guard, ornamental maedate crest, and gold-lacquered fukigaeshi side plates. Arrives on a custom wooden stand.',
 299.99, NULL, 9, 3, 'samurai-kabuto-helmet', 4.70, 61);

-- Accessories (category_id = 4)
INSERT INTO products (name, description, price, original_price, stock, category_id, image_key, rating, review_count) VALUES
('Katana Wall Mount',
 'Honor your blade with a proper home. This solid oak wall mount features two padded golden hooks and comes pre-stained in ebony. Holds swords up to 42 inches. Mounting hardware included.',
 49.99, NULL, 35, 4, 'katana-wall-mount', 4.60, 187),

('Bushido Journal',
 'Record your path. This genuine leather-bound journal features gold-embossed Bushido kanji on the cover, 200 pages of archival paper, and a brass clasp closure. A warrior documents the journey.',
 29.99, NULL, 55, 4, 'bushido-journal', 4.50, 143),

('Sword Maintenance Kit',
 'A blade without care is a warrior without discipline. This complete kit includes camellia oil, uchiko powder ball, cleaning cloth, and brass cleaning rod. Everything needed to maintain a proper edge.',
 24.99, NULL, 40, 4, 'sword-maintenance-kit', 4.70, 219);

-- Training Gear (category_id = 5)
INSERT INTO products (name, description, price, original_price, stock, category_id, image_key, rating, review_count) VALUES
('Iaido Practice Bokken',
 'Cut without cutting. This red oak bokken is weighted and balanced to match a full katana for authentic iaido practice. Hand-finished with traditional linseed oil. For the serious student of the way.',
 59.99, NULL, 25, 5, 'iaido-practice-bokken', 4.60, 134),

('Dojo Training Mat',
 'The dojo mat is where discipline is forged. This 6x4 foot high-density foam mat features a woven tatami surface texture and non-slip base. Supports breakfall training, footwork drills, and kata practice.',
 89.99, NULL, 15, 5, 'dojo-training-mat', 4.50, 88),

('Sparring Shinai Set',
 'Two competition-grade bamboo shinai, each 38-inch (3.8 shaku). Includes all protective padding, leather tsukagawa grips, and a repair kit. Strike true. Train harder.',
 44.99, NULL, 30, 5, 'sparring-shinai-set', 4.40, 112);

-- ─── BUNDLES ─────────────────────────────────────────────────────────────────

INSERT INTO bundles (name, description, bundle_price, retail_price, savings) VALUES
("The Ronin's Arsenal",
 'Everything the lone warrior needs. Oni Slayer katana, wall mount, and full maintenance kit. Display your blade with honor, maintain it with discipline.',
 299.99, 373.97, 73.98),

("The Warrior's Identity",
 'The complete Bushido tee collection. All six signature designs — wear a different battle cry every day of the week.',
 179.99, 244.94, 64.95),

('The Dojo Master',
 'Ghost Blade paired with all the training essentials. Master the art before you display it.',
 349.99, 444.97, 94.98),

('The Shadow Collector',
 'The ultimate collector arsenal. Shadow Reaper blade, Kage Chest Plate, Oni Mask Set, and full maintenance kit.',
 849.99, 1063.97, 213.98);

-- ─── BUNDLE ITEMS ─────────────────────────────────────────────────────────────

-- Bundle 1: The Ronin's Arsenal (Oni Slayer + Wall Mount + Kit)
INSERT INTO bundle_items (bundle_id, product_id)
SELECT 1, id FROM products WHERE image_key IN ('oni-slayer', 'katana-wall-mount', 'sword-maintenance-kit');

-- Bundle 2: The Warrior's Identity (All 6 Tees)
INSERT INTO bundle_items (bundle_id, product_id)
SELECT 2, id FROM products WHERE image_key IN (
    'ronin-silhouette-tee', 'bushido-code-tee', 'cherry-blossom-warrior-tee',
    'void-swordsman-tee', 'dragon-temple-tee', 'last-stand-tee'
);

-- Bundle 3: The Dojo Master (Ghost Blade + Mat + Bokken + Shinai)
INSERT INTO bundle_items (bundle_id, product_id)
SELECT 3, id FROM products WHERE image_key IN (
    'ghost-blade', 'dojo-training-mat', 'iaido-practice-bokken', 'sparring-shinai-set'
);

-- Bundle 4: The Shadow Collector (Shadow Reaper + Kage + Oni Mask + Kit)
INSERT INTO bundle_items (bundle_id, product_id)
SELECT 4, id FROM products WHERE image_key IN (
    'shadow-reaper', 'kage-chest-plate', 'oni-mask-set', 'sword-maintenance-kit'
);
