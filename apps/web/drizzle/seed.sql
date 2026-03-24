-- seed.sql – 30 Texas berry farms
-- Run against the D1 database after migrations.

-- ============================================================
-- LOCATIONS
-- ============================================================

-- Austin (6)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (1, 'Sweet Berry Farm', 'sweet-berry-farm-austin', 'farm', '1801 FM 1980', 'Marble Falls', 'TX', '78654', 30.5783, -98.2730, 'https://www.sweetberryfarm.com', '(830) 798-1462', 'Family-owned u-pick berry farm near Austin with strawberries, blackberries, and seasonal peaches. Beautiful Hill Country setting with picnic areas and a country store.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (2, 'Barton Creek Berry Patch', 'barton-creek-berry-patch-austin', 'garden', '9400 Barton Creek Blvd', 'Austin', 'TX', '78735', 30.2950, -97.8530, NULL, '(512) 555-0142', 'Charming pick-your-own berry garden tucked into the hills of southwest Austin. Known for sweet strawberries and a relaxed atmosphere.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (3, 'Lone Star Berry Ranch', 'lone-star-berry-ranch-austin', 'ranch', '14200 N IH-35', 'Pflugerville', 'TX', '78660', 30.4654, -97.6200, 'https://www.lonestarberryranch.com', '(512) 555-0278', 'Large berry ranch north of Austin offering u-pick strawberries, blueberries, and dewberries across 40 acres of rolling farmland.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (4, 'Hill Country Blueberry Farm', 'hill-country-blueberry-farm-austin', 'farm', '2250 CR 204', 'Liberty Hill', 'TX', '78642', 30.6642, -97.9200, NULL, '(512) 555-0391', 'Scenic blueberry farm nestled in the Hill Country. Opens each summer for pick-your-own blueberries with hayrides and a farm stand.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (5, 'Travis County Berry Garden', 'travis-county-berry-garden-austin', 'garden', '6800 Decker Ln', 'Austin', 'TX', '78724', 30.3200, -97.6350, NULL, '(512) 555-0455', 'Community-style berry garden in east Austin growing strawberries and blackberries. Offers educational tours for school groups.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (6, 'Bee Cave Berry Orchard', 'bee-cave-berry-orchard-austin', 'orchard', '13800 Bee Cave Pkwy', 'Bee Cave', 'TX', '78738', 30.3084, -97.9470, 'https://www.beecaveberries.com', '(512) 555-0519', 'Boutique berry orchard in Bee Cave with a focus on organic blueberries and raspberries. Includes a shaded picnic grove and farm-to-table café.', datetime('now'), datetime('now'));

-- Dallas (5)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (7, 'North Texas Berry Farm', 'north-texas-berry-farm-dallas', 'farm', '3200 Belt Line Rd', 'Lancaster', 'TX', '75146', 32.5920, -96.7560, 'https://www.northtexasberryfarm.com', '(972) 555-0137', 'Popular u-pick farm south of Dallas growing strawberries, blackberries, and seasonal vegetables. Features a farm store and weekend food trucks.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (8, 'Prairie Berry Homestead', 'prairie-berry-homestead-dallas', 'farm', '7800 Wintergreen Rd', 'Hutchins', 'TX', '75141', 32.5180, -96.7130, NULL, '(972) 555-0264', 'Small family homestead specializing in blackberries and dewberries. Quiet farm setting with shaded picnic tables and a playground.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (9, 'Cedar Hill Berry Orchard', 'cedar-hill-berry-orchard-dallas', 'orchard', '1580 FM 1382', 'Cedar Hill', 'TX', '75104', 32.5884, -96.9560, NULL, '(214) 555-0328', 'Hilltop berry orchard overlooking Joe Pool Lake. Offers blueberries, blackberries, and a gorgeous sunset picnic spot.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (10, 'Dallas Heritage Berry Garden', 'dallas-heritage-berry-garden-dallas', 'garden', '3015 Oak Lawn Ave', 'Dallas', 'TX', '75219', 32.8070, -96.8060, NULL, '(214) 555-0475', 'Urban berry garden in the heart of Dallas. Grows strawberries and raspberries using raised-bed organic methods.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (11, 'Whiterock Berry Ranch', 'whiterock-berry-ranch-dallas', 'ranch', '10200 Garland Rd', 'Dallas', 'TX', '75218', 32.8250, -96.7000, 'https://www.whiterockberries.com', '(972) 555-0583', 'Berry ranch near White Rock Lake featuring u-pick strawberries in spring and blueberries in summer. Live music on weekends.', datetime('now'), datetime('now'));

-- Houston (5)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (12, 'Froberg Farm', 'froberg-farm-houston', 'farm', '3601 Hwy 6', 'Alvin', 'TX', '77511', 29.3890, -95.2440, 'https://www.frobergfarm.com', '(281) 585-3531', 'Beloved Houston-area farm with u-pick strawberries, blackberries, and a famous country store stocked with homemade jams and pies.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (13, 'Bayou Berry Farm', 'bayou-berry-farm-houston', 'farm', '22500 Highland Knolls Dr', 'Katy', 'TX', '77450', 29.7560, -95.7580, NULL, '(281) 555-0198', 'Pick-your-own berry farm west of Houston offering strawberries and blueberries. Surrounded by pecan groves with a peaceful bayou path.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (14, 'Magnolia Berry Ranch', 'magnolia-berry-ranch-houston', 'ranch', '31400 Nichols Sawmill Rd', 'Magnolia', 'TX', '77355', 30.2090, -95.7510, 'https://www.magnoliaberryranch.com', '(832) 555-0342', 'Sprawling ranch north of Houston known for its blueberry fields and dewberry patches. Hayrides, a petting zoo, and fresh berry lemonade.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (15, 'Gulf Coast Berry Garden', 'gulf-coast-berry-garden-houston', 'garden', '4200 NASA Rd 1', 'Seabrook', 'TX', '77586', 29.5640, -95.0280, NULL, '(281) 555-0457', 'Coastal berry garden near Galveston Bay with strawberry rows and blackberry hedges. Cool sea breezes and a small café on site.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (16, 'Spring Creek Berry Orchard', 'spring-creek-berry-orchard-houston', 'orchard', '8500 Louetta Rd', 'Spring', 'TX', '77379', 30.0780, -95.5200, NULL, '(832) 555-0521', 'Family orchard in Spring featuring organic blueberries and raspberries. Covered picking areas and a farm-to-table smoothie bar.', datetime('now'), datetime('now'));

-- San Antonio (4)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (17, 'Alamo Berry Farm', 'alamo-berry-farm-san-antonio', 'farm', '15600 Nacogdoches Rd', 'San Antonio', 'TX', '78247', 29.5670, -98.3930, 'https://www.alamoberryfarm.com', '(210) 555-0165', 'Popular San Antonio berry farm with u-pick strawberries and blackberries. Shaded gathering areas and a well-stocked farm store.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (18, 'Mission Berry Garden', 'mission-berry-garden-san-antonio', 'garden', '6030 Padre Dr', 'San Antonio', 'TX', '78228', 29.4010, -98.5720, NULL, '(210) 555-0289', 'Historic garden near the San Antonio Missions growing heirloom strawberries and dewberries. Guided tours available on Saturdays.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (19, 'Helotes Berry Orchard', 'helotes-berry-orchard-san-antonio', 'orchard', '12250 Bandera Rd', 'Helotes', 'TX', '78023', 29.5780, -98.6890, NULL, '(210) 555-0376', 'Peaceful orchard in the hills west of San Antonio specializing in blueberries and raspberries. Great views and a weekend farmers market.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (20, 'Medina Valley Berry Ranch', 'medina-valley-berry-ranch-san-antonio', 'ranch', '22800 FM 471', 'Natalia', 'TX', '78059', 29.1900, -98.8630, 'https://www.medinvalleyberries.com', '(830) 555-0443', 'Expansive ranch in the Medina Valley offering u-pick strawberries, blackberries, and peaches. Tractor rides and a country kitchen.', datetime('now'), datetime('now'));

-- Fort Worth (3)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (21, 'Stockyards Berry Farm', 'stockyards-berry-farm-fort-worth', 'farm', '2501 Rodeo Plaza', 'Fort Worth', 'TX', '76164', 32.7870, -97.3470, NULL, '(817) 555-0132', 'Western-themed berry farm near the Fort Worth Stockyards. U-pick strawberries in spring, blueberries in summer, and live country music.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (22, 'Benbrook Berry Garden', 'benbrook-berry-garden-fort-worth', 'garden', '9600 Dirks Rd', 'Benbrook', 'TX', '76126', 32.6520, -97.4610, 'https://www.benbrookberries.com', '(817) 555-0268', 'Lakeside berry garden near Benbrook Lake. Grows strawberries, blackberries, and dewberries with a scenic walking trail.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (23, 'Eagle Mountain Berry Ranch', 'eagle-mountain-berry-ranch-fort-worth', 'ranch', '7800 Eagle Mtn Cir', 'Fort Worth', 'TX', '76135', 32.8840, -97.4580, NULL, '(817) 555-0395', 'Rustic ranch near Eagle Mountain Lake with blueberry bushes and raspberry patches. Family-friendly atmosphere with pony rides.', datetime('now'), datetime('now'));

-- Waco (2)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (24, 'Brazos Berry Farm', 'brazos-berry-farm-waco', 'farm', '4500 Lake Shore Dr', 'Waco', 'TX', '76710', 31.5680, -97.1960, 'https://www.brazosberryfarm.com', '(254) 555-0184', 'Beloved Waco berry farm along the Brazos River. U-pick strawberries and blackberries with a picnic pavilion, playground, and ice cream stand.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (25, 'Heart of Texas Berry Garden', 'heart-of-texas-berry-garden-waco', 'garden', '7200 Bosque Blvd', 'Waco', 'TX', '76712', 31.5100, -97.2100, NULL, '(254) 555-0257', 'Organic berry garden in south Waco with strawberries, dewberries, and seasonal flowers. Educational programs for kids.', datetime('now'), datetime('now'));

-- Fredericksburg (2)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (26, 'Fredericksburg Berry Farm', 'fredericksburg-berry-farm', 'farm', '8820 US-290 E', 'Fredericksburg', 'TX', '78624', 30.2650, -98.8100, 'https://www.fredberryfarm.com', '(830) 555-0148', 'Quaint Hill Country berry farm outside Fredericksburg. Pick your own strawberries and peaches surrounded by wildflower fields.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (27, 'Peach & Berry Orchard at Luckenbach', 'peach-berry-orchard-luckenbach-fredericksburg', 'orchard', '412 Luckenbach Town Loop', 'Fredericksburg', 'TX', '78624', 30.1770, -98.7250, NULL, '(830) 555-0276', 'Rustic orchard near the legendary Luckenbach dance hall. Blueberries, blackberries, and peaches with Hill Country charm.', datetime('now'), datetime('now'));

-- Tyler (2)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (28, 'East Texas Blueberry Farm', 'east-texas-blueberry-farm-tyler', 'farm', '16800 CR 285', 'Tyler', 'TX', '75707', 32.3510, -95.2560, 'https://www.easttxblueberries.com', '(903) 555-0192', 'Premier blueberry destination in the Piney Woods. Acres of highbush blueberries with a farm store, fresh cobbler, and shaded rest areas.', datetime('now'), datetime('now'));

INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (29, 'Rose City Berry Patch', 'rose-city-berry-patch-tyler', 'garden', '2200 Troup Hwy', 'Tyler', 'TX', '75701', 32.3280, -95.2780, NULL, '(903) 555-0318', 'Charming roadside berry patch on the south side of Tyler. Strawberries, blackberries, and dewberries amid the rose capital of Texas.', datetime('now'), datetime('now'));

-- College Station (1)
INSERT INTO locations (id, name, slug, type, address, city, state, postal_code, lat, lng, website, phone, description, created_at, updated_at)
VALUES (30, 'Aggieland Berry Farm', 'aggieland-berry-farm-college-station', 'farm', '4100 Raymond Stotzer Pkwy', 'College Station', 'TX', '77845', 30.6120, -96.3260, 'https://www.aggielandberries.com', '(979) 555-0156', 'Research-inspired berry farm near Texas A&M. Strawberries, blueberries, and blackberries grown with sustainable agriculture practices.', datetime('now'), datetime('now'));


-- ============================================================
-- SEASONAL OFFERINGS
-- ============================================================

-- Location 1 – Sweet Berry Farm (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (1, 'berry', 'strawberry', '03', '05', 'open', 'Peak season in April. Buckets provided at the gate.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (1, 'berry', 'blackberry', '05', '06', 'upcoming', 'Thornless varieties. Opens late May.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (1, 'fruit', 'peach', '05', '08', 'upcoming', 'Hill Country peaches available by the basket.', datetime('now'));

-- Location 2 – Barton Creek Berry Patch (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (2, 'berry', 'strawberry', '03', '05', 'open', 'Organic Chandler variety. Limited supply on weekdays.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (2, 'berry', 'blueberry', '05', '07', 'upcoming', 'Rabbiteye blueberries ripen in late May.', datetime('now'));

-- Location 3 – Lone Star Berry Ranch (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (3, 'berry', 'strawberry', '03', '05', 'open', 'Over 5 acres of strawberry rows.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (3, 'berry', 'blueberry', '05', '07', 'upcoming', 'Multiple blueberry varieties available.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (3, 'berry', 'dewberry', '04', '05', 'upcoming', 'Wild dewberries along the fence line. Bring long sleeves.', datetime('now'));

-- Location 4 – Hill Country Blueberry Farm (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (4, 'berry', 'blueberry', '05', '07', 'upcoming', 'Premier highbush blueberries. Opens Memorial Day weekend.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (4, 'berry', 'blackberry', '05', '06', 'upcoming', 'Small blackberry section near the barn.', datetime('now'));

-- Location 5 – Travis County Berry Garden (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (5, 'berry', 'strawberry', '03', '05', 'open', 'Raised beds with Albion strawberries.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (5, 'berry', 'blackberry', '05', '06', 'upcoming', 'Blackberry hedgerow along east side.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (5, 'berry', 'dewberry', '04', '05', 'upcoming', 'Limited dewberry patch, first come first served.', datetime('now'));

-- Location 6 – Bee Cave Berry Orchard (Austin)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (6, 'berry', 'blueberry', '05', '07', 'upcoming', 'Certified organic blueberries. Reservations recommended.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (6, 'berry', 'raspberry', '06', '07', 'upcoming', 'Heritage raspberries in limited quantities.', datetime('now'));

-- Location 7 – North Texas Berry Farm (Dallas)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (7, 'berry', 'strawberry', '03', '05', 'open', 'Chandler and Camarosa varieties. Containers available for purchase.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (7, 'berry', 'blackberry', '05', '06', 'upcoming', 'Apache thornless blackberries starting late May.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (7, 'berry', 'blueberry', '05', '07', 'upcoming', 'New blueberry section opening this year.', datetime('now'));

-- Location 8 – Prairie Berry Homestead (Dallas)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (8, 'berry', 'blackberry', '05', '06', 'upcoming', 'Heritage blackberry varieties. Cash only.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (8, 'berry', 'dewberry', '04', '05', 'upcoming', 'Wild dewberry trail along the creek.', datetime('now'));

-- Location 9 – Cedar Hill Berry Orchard (Dallas)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (9, 'berry', 'blueberry', '05', '07', 'upcoming', 'Climax and Tifblue varieties with lake views.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (9, 'berry', 'blackberry', '05', '06', 'upcoming', 'Thornless blackberries in raised rows.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (9, 'berry', 'raspberry', '06', '07', 'upcoming', 'Red and golden raspberry canes.', datetime('now'));

-- Location 10 – Dallas Heritage Berry Garden (Dallas)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (10, 'berry', 'strawberry', '03', '05', 'open', 'Urban rooftop strawberry beds. Reservation only.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (10, 'berry', 'raspberry', '06', '07', 'upcoming', 'Small raspberry section added this season.', datetime('now'));

-- Location 11 – Whiterock Berry Ranch (Dallas)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (11, 'berry', 'strawberry', '03', '05', 'open', 'Pick strawberries overlooking White Rock Lake.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (11, 'berry', 'blueberry', '05', '07', 'upcoming', 'Southern highbush blueberries opening in June.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (11, 'berry', 'dewberry', '04', '05', 'upcoming', 'Dewberry vines along the ranch perimeter.', datetime('now'));

-- Location 12 – Froberg Farm (Houston)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (12, 'berry', 'strawberry', '03', '05', 'open', 'Famous Alvin strawberries. Arrive early for best selection.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (12, 'berry', 'blackberry', '05', '06', 'upcoming', 'Large blackberry fields behind the market building.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (12, 'fruit', 'peach', '05', '08', 'upcoming', 'Texas freestone peaches by the bushel.', datetime('now'));

-- Location 13 – Bayou Berry Farm (Houston)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (13, 'berry', 'strawberry', '03', '05', 'open', 'Sweet strawberries in raised beds. Kid-friendly rows.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (13, 'berry', 'blueberry', '05', '07', 'upcoming', 'Blueberry bushes along the bayou trail.', datetime('now'));

-- Location 14 – Magnolia Berry Ranch (Houston)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (14, 'berry', 'blueberry', '05', '07', 'upcoming', 'Over 3000 blueberry bushes across 10 acres.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (14, 'berry', 'dewberry', '04', '05', 'upcoming', 'Dewberry patches open in mid-April.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (14, 'berry', 'blackberry', '05', '06', 'upcoming', 'Thornless Navaho blackberries.', datetime('now'));

-- Location 15 – Gulf Coast Berry Garden (Houston)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (15, 'berry', 'strawberry', '03', '05', 'open', 'Coastal strawberries with a sea breeze. Containers provided.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (15, 'berry', 'blackberry', '05', '06', 'upcoming', 'Compact blackberry bushes near the café.', datetime('now'));

-- Location 16 – Spring Creek Berry Orchard (Houston)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (16, 'berry', 'blueberry', '05', '07', 'upcoming', 'Organic rabbiteye blueberries under shade cloth.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (16, 'berry', 'raspberry', '06', '07', 'upcoming', 'Red raspberry tunnels. Opens mid-June.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (16, 'berry', 'strawberry', '03', '05', 'closed', 'Strawberry season ended early this year.', datetime('now'));

-- Location 17 – Alamo Berry Farm (San Antonio)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (17, 'berry', 'strawberry', '03', '05', 'open', 'Sweet San Antonio strawberries. Open daily 8am-5pm.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (17, 'berry', 'blackberry', '05', '06', 'upcoming', 'Triple Crown blackberries opening late May.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (17, 'berry', 'dewberry', '04', '05', 'upcoming', 'Wild Texas dewberries by the fence rows.', datetime('now'));

-- Location 18 – Mission Berry Garden (San Antonio)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (18, 'berry', 'strawberry', '03', '05', 'open', 'Heirloom Sequoia strawberries. Limited harvest.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (18, 'berry', 'dewberry', '04', '05', 'upcoming', 'Heritage dewberry vines near the mission walls.', datetime('now'));

-- Location 19 – Helotes Berry Orchard (San Antonio)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (19, 'berry', 'blueberry', '05', '07', 'upcoming', 'Hillside blueberry terraces with panoramic views.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (19, 'berry', 'raspberry', '06', '07', 'upcoming', 'Caroline raspberries in shaded tunnels.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (19, 'berry', 'blackberry', '05', '06', 'upcoming', 'Ouachita blackberry cultivar.', datetime('now'));

-- Location 20 – Medina Valley Berry Ranch (San Antonio)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (20, 'berry', 'strawberry', '03', '05', 'upcoming', 'Chandler strawberries. Opening mid-March.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (20, 'berry', 'blackberry', '05', '06', 'upcoming', 'Large thornless blackberry field.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (20, 'fruit', 'peach', '05', '08', 'upcoming', 'Fredericksburg-style peaches from grafted trees.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (20, 'berry', 'dewberry', '04', '05', 'upcoming', 'Wild dewberry foraging trail.', datetime('now'));

-- Location 21 – Stockyards Berry Farm (Fort Worth)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (21, 'berry', 'strawberry', '03', '05', 'open', 'Cowboy-themed strawberry rows. Hats encouraged.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (21, 'berry', 'blueberry', '05', '07', 'upcoming', 'New blueberry patch behind the barn.', datetime('now'));

-- Location 22 – Benbrook Berry Garden (Fort Worth)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (22, 'berry', 'strawberry', '03', '05', 'open', 'Lakeside strawberry picking with scenic views.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (22, 'berry', 'blackberry', '05', '06', 'upcoming', 'Blackberry brambles along the lake trail.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (22, 'berry', 'dewberry', '04', '05', 'upcoming', 'Dewberries near the walking path.', datetime('now'));

-- Location 23 – Eagle Mountain Berry Ranch (Fort Worth)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (23, 'berry', 'blueberry', '05', '07', 'upcoming', 'Large blueberry field with drip irrigation.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (23, 'berry', 'raspberry', '06', '07', 'upcoming', 'Heritage red raspberries. Short season.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (23, 'berry', 'strawberry', '03', '05', 'closed', 'Strawberry season ended due to late frost damage.', datetime('now'));

-- Location 24 – Brazos Berry Farm (Waco)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (24, 'berry', 'strawberry', '03', '05', 'open', 'Waco''s favorite strawberry patch. Family pricing available.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (24, 'berry', 'blackberry', '05', '06', 'upcoming', 'Kiowa blackberries opening June 1st.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (24, 'berry', 'blueberry', '05', '07', 'upcoming', 'Blueberry bushes near the river pavilion.', datetime('now'));

-- Location 25 – Heart of Texas Berry Garden (Waco)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (25, 'berry', 'strawberry', '03', '05', 'open', 'Organic strawberries in raised beds. No pesticides.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (25, 'berry', 'dewberry', '04', '05', 'upcoming', 'Dewberry brambles along the garden border.', datetime('now'));

-- Location 26 – Fredericksburg Berry Farm
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (26, 'berry', 'strawberry', '03', '05', 'open', 'Hill Country strawberries amid wildflower fields.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (26, 'fruit', 'peach', '05', '08', 'upcoming', 'Famous Fredericksburg peaches from 200 trees.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (26, 'berry', 'blackberry', '05', '06', 'upcoming', 'Thornless blackberries near the old barn.', datetime('now'));

-- Location 27 – Peach & Berry Orchard at Luckenbach
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (27, 'berry', 'blueberry', '05', '07', 'upcoming', 'Southern highbush blueberries on the hilltop.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (27, 'berry', 'blackberry', '05', '06', 'upcoming', 'Wild-style blackberry rows.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (27, 'fruit', 'peach', '05', '08', 'upcoming', 'Heirloom peach varieties grafted on-site.', datetime('now'));

-- Location 28 – East Texas Blueberry Farm (Tyler)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (28, 'berry', 'blueberry', '05', '07', 'upcoming', 'Premier East Texas blueberries. Opens June 1st.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (28, 'berry', 'blackberry', '05', '06', 'upcoming', 'Blackberry section near the pine tree line.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (28, 'berry', 'strawberry', '03', '05', 'unknown', 'Strawberry field under renovation this season.', datetime('now'));

-- Location 29 – Rose City Berry Patch (Tyler)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (29, 'berry', 'strawberry', '03', '05', 'open', 'Fresh Tyler strawberries. Call ahead for availability.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (29, 'berry', 'blackberry', '05', '06', 'upcoming', 'Blackberry brambles along Troup Highway.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (29, 'berry', 'dewberry', '04', '05', 'upcoming', 'Native dewberry vines in the meadow area.', datetime('now'));

-- Location 30 – Aggieland Berry Farm (College Station)
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (30, 'berry', 'strawberry', '03', '05', 'open', 'Sustainable strawberry rows near campus. Student discounts.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (30, 'berry', 'blueberry', '05', '07', 'upcoming', 'Research-developed blueberry cultivars.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (30, 'berry', 'blackberry', '05', '06', 'upcoming', 'Brazos blackberry variety bred by Texas A&M.', datetime('now'));
INSERT INTO seasonal_offerings (location_id, category, item, season_start, season_end, status, notes, created_at) VALUES (30, 'berry', 'dewberry', '04', '05', 'upcoming', 'Experimental dewberry plot. Limited picking hours.', datetime('now'));


-- ============================================================
-- LOCATION METADATA
-- ============================================================

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (1, '["restrooms","picnic_area","playground","farm_store","parking","hayrides"]', 1, 0, 'Strawberries $3.50/lb, blackberries $4.00/lb. Cash and card accepted.', 'Free gravel parking lot with 80+ spaces.', datetime('now'), 'https://www.sweetberryfarm.com', 0.95);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (2, '["restrooms","picnic_area","shaded_areas","parking"]', 1, 0, 'Strawberries $4.00/lb. Blueberries $5.00/lb.', 'Small gravel lot. Street parking available.', datetime('now'), NULL, 0.80);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (3, '["restrooms","picnic_area","farm_store","parking","hayrides","petting_zoo"]', 1, 0, 'Berries priced by the pound. Group discounts for 10+.', 'Large paved lot with accessible parking.', datetime('now'), 'https://www.lonestarberryranch.com', 0.90);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (4, '["restrooms","farm_store","parking","shaded_areas"]', 1, 1, 'Blueberries $5.50/lb. Pre-picked available at store.', 'Dirt lot off CR 204. Follow signs from Liberty Hill.', datetime('now'), NULL, 0.75);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (5, '["restrooms","picnic_area","parking"]', 1, 0, 'Strawberries $3.00/lb. School group rates available.', 'Shared lot with community garden. Limited spaces.', datetime('now'), NULL, 0.70);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (6, '["restrooms","picnic_area","food_stand","parking","shaded_areas"]', 1, 1, 'Blueberries $6.00/lb organic. Café menu separate.', 'Paved lot behind the orchard. 40 spaces.', datetime('now'), 'https://www.beecaveberries.com', 0.85);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (7, '["restrooms","picnic_area","farm_store","parking","food_stand"]', 1, 0, 'Strawberries $3.50/lb, blackberries $4.50/lb. Card preferred.', 'Large lot on Belt Line Rd. Weekend overflow parking in field.', datetime('now'), 'https://www.northtexasberryfarm.com', 0.92);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (8, '["picnic_area","playground","parking","shaded_areas"]', 1, 0, 'Blackberries $4.00/lb, dewberries $5.00/lb. Cash only.', 'Grass lot beside the homestead. 20 spots.', datetime('now'), NULL, 0.70);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (9, '["restrooms","picnic_area","parking","shaded_areas"]', 1, 0, 'Blueberries $5.00/lb. Sunset picnic basket add-on $15.', 'Hilltop lot with lake views. 30 spaces.', datetime('now'), NULL, 0.78);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (10, '["restrooms","parking"]', 0, 1, 'Strawberries $5.00/lb. Members get 15% off.', 'Street parking on Oak Lawn Ave. Metered.', datetime('now'), NULL, 0.65);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (11, '["restrooms","picnic_area","parking","food_stand","shaded_areas"]', 1, 0, 'Strawberries $4.00/lb, blueberries $5.50/lb. Live music free with purchase.', 'Paved lot off Garland Rd. 50 spaces. Bike rack available.', datetime('now'), 'https://www.whiterockberries.com', 0.88);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (12, '["restrooms","picnic_area","farm_store","parking","food_stand","playground"]', 1, 0, 'Strawberries $2.75/lb (u-pick), $4.50/qt (pre-picked). Cash and card.', 'Large paved lot on Hwy 6. Overflow field parking on busy days.', datetime('now'), 'https://www.frobergfarm.com', 0.97);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (13, '["restrooms","picnic_area","parking","shaded_areas"]', 1, 0, 'Strawberries $3.50/lb, blueberries $5.00/lb.', 'Gravel lot with bayou-side parking.', datetime('now'), NULL, 0.76);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (14, '["restrooms","picnic_area","farm_store","parking","hayrides","petting_zoo","food_stand"]', 1, 0, 'Blueberries $4.50/lb. Berry lemonade $3. Hayride $5/person.', 'Two paved lots with 100+ combined spaces.', datetime('now'), 'https://www.magnoliaberryranch.com', 0.91);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (15, '["restrooms","food_stand","parking","shaded_areas"]', 1, 0, 'Strawberries $4.00/lb. Café smoothies $5-7.', 'Small paved lot on NASA Rd 1. 25 spaces.', datetime('now'), NULL, 0.72);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (16, '["restrooms","picnic_area","food_stand","parking","shaded_areas"]', 1, 1, 'Blueberries $5.50/lb organic. Smoothie bar separate menu.', 'Lot behind orchard off Louetta Rd.', datetime('now'), NULL, 0.80);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (17, '["restrooms","picnic_area","farm_store","parking","shaded_areas"]', 1, 0, 'Strawberries $3.50/lb, blackberries $4.50/lb. Jams and preserves in store.', 'Free paved lot on Nacogdoches Rd. 60 spaces.', datetime('now'), 'https://www.alamoberryfarm.com', 0.90);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (18, '["restrooms","picnic_area","parking"]', 1, 0, 'Strawberries $4.50/lb heirloom. Guided tours $8/person.', 'Street parking on Padre Dr. Small lot for 15 cars.', datetime('now'), NULL, 0.68);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (19, '["restrooms","picnic_area","parking","shaded_areas"]', 1, 0, 'Blueberries $5.00/lb. Weekend farmers market prices vary.', 'Gravel lot off Bandera Rd with hill views.', datetime('now'), NULL, 0.77);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (20, '["restrooms","picnic_area","farm_store","parking","hayrides","food_stand"]', 1, 0, 'Strawberries $3.00/lb, peaches $2.50/lb. Tractor rides $4.', 'Large dirt lot off FM 471. Plenty of room.', datetime('now'), 'https://www.medinvalleyberries.com', 0.86);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (21, '["restrooms","picnic_area","parking","food_stand"]', 1, 0, 'Strawberries $4.00/lb. Weekend BBQ plates $12.', 'Lot shared with Stockyards visitors. Arrive early.', datetime('now'), NULL, 0.74);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (22, '["restrooms","picnic_area","parking","shaded_areas"]', 1, 0, 'Strawberries $3.50/lb, blackberries $4.50/lb, dewberries $5.00/lb.', 'Lakeside lot off Dirks Rd. 35 spaces.', datetime('now'), 'https://www.benbrookberries.com', 0.82);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (23, '["restrooms","picnic_area","playground","parking","petting_zoo"]', 1, 0, 'Blueberries $5.00/lb. Pony rides $6 on weekends.', 'Ranch parking area. Follow dirt road to lot.', datetime('now'), NULL, 0.73);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (24, '["restrooms","picnic_area","playground","farm_store","parking","food_stand"]', 1, 0, 'Strawberries $3.00/lb, blackberries $4.00/lb. Ice cream $3.', 'Paved lot on Lake Shore Dr. Overflow grass lot.', datetime('now'), 'https://www.brazosberryfarm.com', 0.93);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (25, '["restrooms","picnic_area","parking","shaded_areas"]', 1, 0, 'Strawberries $4.00/lb organic. Dewberries $5.50/lb. Educational programs free.', 'Small lot on Bosque Blvd. 20 spaces.', datetime('now'), NULL, 0.75);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (26, '["restrooms","picnic_area","farm_store","parking","shaded_areas"]', 1, 0, 'Strawberries $4.00/lb. Peaches $3.00/lb. Jams and pies in store.', 'Gravel lot on US-290 E. 40 spaces.', datetime('now'), 'https://www.fredberryfarm.com', 0.88);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (27, '["restrooms","picnic_area","parking"]', 1, 0, 'Blueberries $5.00/lb, peaches $3.50/lb. Cash preferred.', 'Small lot at Luckenbach. Walk 5 min to orchard.', datetime('now'), NULL, 0.72);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (28, '["restrooms","picnic_area","farm_store","parking","shaded_areas","food_stand"]', 1, 0, 'Blueberries $4.50/lb. Fresh cobbler $5 at the stand. Pre-picked gallons available.', 'Large paved lot off CR 285. 60+ spaces.', datetime('now'), 'https://www.easttxblueberries.com', 0.94);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (29, '["restrooms","parking","shaded_areas"]', 1, 0, 'Strawberries $3.50/lb, blackberries $4.00/lb, dewberries $4.50/lb.', 'Roadside gravel lot on Troup Hwy.', datetime('now'), NULL, 0.70);

INSERT INTO location_metadata (location_id, amenities, family_friendly, reservations_required, pricing_notes, parking_notes, last_verified_at, source_url, confidence_score) VALUES (30, '["restrooms","picnic_area","farm_store","parking","shaded_areas"]', 1, 0, 'Strawberries $3.00/lb, blueberries $4.50/lb. Student discount 10% with ID.', 'Lot on Raymond Stotzer Pkwy near RELLIS Campus.', datetime('now'), 'https://www.aggielandberries.com', 0.87);
