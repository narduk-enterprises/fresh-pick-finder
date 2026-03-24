-- Fresh Pick Finder: App-owned tables
-- Generated from apps/web/server/database/app-schema.ts

CREATE TABLE IF NOT EXISTS `locations` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `type` text NOT NULL,
  `address` text,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `postal_code` text,
  `lat` real,
  `lng` real,
  `website` text,
  `phone` text,
  `description` text,
  `created_at` text NOT NULL DEFAULT (datetime('now')),
  `updated_at` text NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS `locations_slug_unique` ON `locations` (`slug`);

CREATE TABLE IF NOT EXISTS `seasonal_offerings` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `location_id` integer NOT NULL REFERENCES `locations`(`id`) ON DELETE CASCADE,
  `category` text NOT NULL,
  `item` text NOT NULL,
  `season_start` text,
  `season_end` text,
  `status` text NOT NULL,
  `notes` text,
  `created_at` text NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS `location_metadata` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `location_id` integer NOT NULL REFERENCES `locations`(`id`) ON DELETE CASCADE,
  `amenities` text,
  `family_friendly` integer DEFAULT 0,
  `reservations_required` integer DEFAULT 0,
  `pricing_notes` text,
  `parking_notes` text,
  `last_verified_at` text,
  `source_url` text,
  `confidence_score` real
);

CREATE UNIQUE INDEX IF NOT EXISTS `location_metadata_location_id_unique` ON `location_metadata` (`location_id`);

CREATE TABLE IF NOT EXISTS `datasets` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` text NOT NULL,
  `status` text NOT NULL,
  `row_count` integer DEFAULT 0,
  `created_at` text NOT NULL DEFAULT (datetime('now')),
  `processed_at` text
);

CREATE TABLE IF NOT EXISTS `dataset_rows` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `raw_json` text NOT NULL,
  `created_at` text NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS `canonical_rows` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `normalized_json` text NOT NULL,
  `quality_score` real,
  `missing_fields` text,
  `created_at` text NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS `analysis_results` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `dataset_id` integer NOT NULL REFERENCES `datasets`(`id`) ON DELETE CASCADE,
  `type` text NOT NULL,
  `result_json` text NOT NULL,
  `created_at` text NOT NULL DEFAULT (datetime('now'))
);
