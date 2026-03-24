-- App schema: berry picking finder tables
CREATE TABLE `locations` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `type` text NOT NULL DEFAULT 'farm',
  `address` text,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `postal_code` text,
  `lat` real,
  `lng` real,
  `website` text,
  `phone` text,
  `description` text,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_slug_unique` ON `locations` (`slug`);
--> statement-breakpoint
CREATE TABLE `seasonal_offerings` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `location_id` integer NOT NULL REFERENCES `locations`(`id`) ON DELETE CASCADE,
  `category` text NOT NULL DEFAULT 'berry',
  `item` text NOT NULL,
  `season_start` text,
  `season_end` text,
  `status` text NOT NULL DEFAULT 'unknown',
  `notes` text,
  `created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `location_metadata` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `location_id` integer NOT NULL REFERENCES `locations`(`id`) ON DELETE CASCADE,
  `amenities` text,
  `family_friendly` integer DEFAULT true,
  `reservations_required` integer DEFAULT false,
  `pricing_notes` text,
  `parking_notes` text,
  `last_verified_at` text,
  `source_url` text,
  `confidence_score` integer DEFAULT 50
);
--> statement-breakpoint
CREATE UNIQUE INDEX `location_metadata_location_id_unique` ON `location_metadata` (`location_id`);
--> statement-breakpoint
CREATE TABLE `datasets` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL DEFAULT 'pending',
  `row_count` integer DEFAULT 0,
  `created_at` text NOT NULL,
  `processed_at` text
);
--> statement-breakpoint
CREATE TABLE `dataset_rows` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `raw_json` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `canonical_rows` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `normalized_json` text NOT NULL,
  `quality_score` integer DEFAULT 0,
  `missing_fields` text
);
--> statement-breakpoint
CREATE TABLE `analysis_results` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `type` text NOT NULL,
  `result_json` text NOT NULL,
  `created_at` text NOT NULL
);
