import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.execute(sql`
   CREATE TYPE "public"."enum_resources_type" AS ENUM('article', 'guide', 'how_to', 'primer', 'story_series', 'research', 'video', 'download', 'toolkit');
  CREATE TYPE "public"."enum_resources_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_resources_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__resources_v_version_type" AS ENUM('article', 'guide', 'how_to', 'primer', 'story_series', 'research', 'video', 'download', 'toolkit');
  CREATE TYPE "public"."enum__resources_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__resources_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_crops_color" AS ENUM('forest', 'clay', 'marigold', 'soil', 'leaf');
  CREATE TYPE "public"."enum_crops_season" AS ENUM('warm', 'cool', 'perennial');
  CREATE TYPE "public"."enum_crops_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_crops_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__crops_v_version_color" AS ENUM('forest', 'clay', 'marigold', 'soil', 'leaf');
  CREATE TYPE "public"."enum__crops_v_version_season" AS ENUM('warm', 'cool', 'perennial');
  CREATE TYPE "public"."enum__crops_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__crops_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_people_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__people_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_roadmap_status" AS ENUM('complete', 'underway', 'upcoming', 'future');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published', 'planning', 'in_development', 'active', 'seasonal', 'paused');
  CREATE TYPE "public"."enum__projects_v_version_roadmap_status" AS ENUM('complete', 'underway', 'upcoming', 'future');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published', 'planning', 'in_development', 'active', 'seasonal', 'paused');
  CREATE TYPE "public"."enum_stewardship_guides_practice" AS ENUM('soil', 'water', 'biodiversity', 'reciprocal_practice', 'other');
  CREATE TYPE "public"."enum_stewardship_guides_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_stewardship_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stewardship_guides_v_version_practice" AS ENUM('soil', 'water', 'biodiversity', 'reciprocal_practice', 'other');
  CREATE TYPE "public"."enum__stewardship_guides_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__stewardship_guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_recipes_consent_media_rights" AS ENUM('text', 'audio', 'photo', 'video');
  CREATE TYPE "public"."enum_recipes_consent_scope" AS ENUM('public', 'community', 'archive');
  CREATE TYPE "public"."enum_recipes_consent_attribution" AS ENUM('named', 'initials', 'anonymous');
  CREATE TYPE "public"."enum_recipes_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_recipes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipes_v_version_consent_media_rights" AS ENUM('text', 'audio', 'photo', 'video');
  CREATE TYPE "public"."enum__recipes_v_version_consent_scope" AS ENUM('public', 'community', 'archive');
  CREATE TYPE "public"."enum__recipes_v_version_consent_attribution" AS ENUM('named', 'initials', 'anonymous');
  CREATE TYPE "public"."enum__recipes_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__recipes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_stories_consent_media_rights" AS ENUM('text', 'audio', 'photo', 'video');
  CREATE TYPE "public"."enum_stories_consent_scope" AS ENUM('public', 'community', 'archive');
  CREATE TYPE "public"."enum_stories_consent_attribution" AS ENUM('named', 'initials', 'anonymous');
  CREATE TYPE "public"."enum_stories_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_v_version_consent_media_rights" AS ENUM('text', 'audio', 'photo', 'video');
  CREATE TYPE "public"."enum__stories_v_version_consent_scope" AS ENUM('public', 'community', 'archive');
  CREATE TYPE "public"."enum__stories_v_version_consent_attribution" AS ENUM('named', 'initials', 'anonymous');
  CREATE TYPE "public"."enum__stories_v_version_review_status" AS ENUM('draft', 'in_review', 'changes_requested', 'approved');
  CREATE TYPE "public"."enum__stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_category" AS ENUM('workshop', 'gathering', 'volunteer', 'youth', 'consultation');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published', 'scheduled', 'postponed', 'cancelled');
  CREATE TYPE "public"."enum__events_v_version_category" AS ENUM('workshop', 'gathering', 'volunteer', 'youth', 'consultation');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published', 'scheduled', 'postponed', 'cancelled');
  CREATE TYPE "public"."enum_subscribers_lists" AS ENUM('newsletter', 'marketplace');
  CREATE TYPE "public"."enum_volunteer_signups_status" AS ENUM('new', 'contacted', 'active', 'closed');
  CREATE TYPE "public"."enum_knowledge_submissions_kind" AS ENUM('recipe', 'story', 'growing', 'crop', 'other');
  CREATE TYPE "public"."enum_knowledge_submissions_scope" AS ENUM('public', 'community', 'archive');
  CREATE TYPE "public"."enum_knowledge_submissions_attribution" AS ENUM('named', 'anonymous');
  CREATE TYPE "public"."enum_knowledge_submissions_status" AS ENUM('new', 'in_conversation', 'converted', 'closed');
  CREATE TYPE "public"."enum_producer_interest_status" AS ENUM('new', 'contacted', 'added', 'closed');
  CREATE TYPE "public"."enum_event_registrations_status" AS ENUM('registered', 'waitlist', 'cancelled');
  CREATE TYPE "public"."enum_producers_status" AS ENUM('interested', 'onboarding', 'agreement', 'paused');
  CREATE TYPE "public"."enum_products_regulatory_flags" AS ENUM('food_safety', 'seed', 'allergens', 'import');
  CREATE TYPE "public"."enum_products_category" AS ENUM('seeds', 'food', 'supplies', 'merch', 'community');
  CREATE TYPE "public"."enum_products_tax_class" AS ENUM('zero_rated', 'taxable', 'tbd');
  CREATE TYPE "public"."enum_products_fulfillment" AS ENUM('pickup', 'shipping', 'both');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'reviewer', 'contributor');
  CREATE TYPE "public"."enum_home_page_headline" AS ENUM('culture', 'ancestral');
  CREATE TYPE "public"."enum_marketplace_settings_current_phase" AS ENUM('1', '2', '3', '4');
  CREATE TABLE "resources_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"type" "enum_resources_type" DEFAULT 'article',
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"summary" varchar,
  	"region" varchar,
  	"reading_time" varchar,
  	"hero_image_id" integer,
  	"historical_context" jsonb,
  	"body" jsonb,
  	"video_url" varchar,
  	"file_id" integer,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_resources_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_resources_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"topics_id" integer,
  	"crops_id" integer,
  	"resources_id" integer
  );
  
  CREATE TABLE "_resources_v_version_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_resources_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_type" "enum__resources_v_version_type" DEFAULT 'article',
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_summary" varchar,
  	"version_region" varchar,
  	"version_reading_time" varchar,
  	"version_hero_image_id" integer,
  	"version_historical_context" jsonb,
  	"version_body" jsonb,
  	"version_video_url" varchar,
  	"version_file_id" integer,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__resources_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__resources_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_resources_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"topics_id" integer,
  	"crops_id" integer,
  	"resources_id" integer
  );
  
  CREATE TABLE "crops_regional_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"language" varchar
  );
  
  CREATE TABLE "crops_planting_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "crops_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "crops" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"scientific_name" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"color" "enum_crops_color" DEFAULT 'forest',
  	"summary" varchar,
  	"origin" varchar,
  	"family" varchar,
  	"season" "enum_crops_season",
  	"hero_image_id" integer,
  	"cultural_context" jsonb,
  	"community_context" jsonb,
  	"culinary_uses" varchar,
  	"growing_zone" varchar DEFAULT 'Coastal BC (Vancouver)',
  	"growing_summary" varchar,
  	"seed_saving" varchar,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_crops_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_crops_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "crops_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resources_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "_crops_v_version_regional_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"language" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_crops_v_version_planting_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_crops_v_version_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_crops_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_scientific_name" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_color" "enum__crops_v_version_color" DEFAULT 'forest',
  	"version_summary" varchar,
  	"version_origin" varchar,
  	"version_family" varchar,
  	"version_season" "enum__crops_v_version_season",
  	"version_hero_image_id" integer,
  	"version_cultural_context" jsonb,
  	"version_community_context" jsonb,
  	"version_culinary_uses" varchar,
  	"version_growing_zone" varchar DEFAULT 'Coastal BC (Vancouver)',
  	"version_growing_summary" varchar,
  	"version_seed_saving" varchar,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__crops_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__crops_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_crops_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resources_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "topics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"years" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_people_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_people_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_people_v_version_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_years" varchar,
  	"version_role" varchar,
  	"version_bio" varchar,
  	"version_image_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__people_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__people_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"activity" varchar
  );
  
  CREATE TABLE "projects_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"status" "enum_projects_roadmap_status" DEFAULT 'upcoming'
  );
  
  CREATE TABLE "projects_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"title" varchar,
  	"body" varchar,
  	"verified" boolean DEFAULT false
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"confirmed" boolean DEFAULT false,
  	"status" "enum_projects_status" DEFAULT 'planning',
  	"order" numeric DEFAULT 0,
  	"location" varchar,
  	"neighbourhood" varchar,
  	"summary" varchar,
  	"site_description" jsonb,
  	"visit_info" varchar,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"activity" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"status" "enum__projects_v_version_roadmap_status" DEFAULT 'upcoming',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"title" varchar,
  	"body" varchar,
  	"verified" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_confirmed" boolean DEFAULT false,
  	"version_status" "enum__projects_v_version_status" DEFAULT 'planning',
  	"version_order" numeric DEFAULT 0,
  	"version_location" varchar,
  	"version_neighbourhood" varchar,
  	"version_summary" varchar,
  	"version_site_description" jsonb,
  	"version_visit_info" varchar,
  	"version_hero_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partners_id" integer
  );
  
  CREATE TABLE "stewardship_guides_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "stewardship_guides_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "stewardship_guides_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "stewardship_guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"practice" "enum_stewardship_guides_practice",
  	"summary" varchar,
  	"safety" varchar,
  	"ecological_impact" varchar,
  	"site_example_id" integer,
  	"protocol_note" varchar,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_stewardship_guides_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_stewardship_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_stewardship_guides_v_version_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stewardship_guides_v_version_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stewardship_guides_v_version_review_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"citation" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stewardship_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_practice" "enum__stewardship_guides_v_version_practice",
  	"version_summary" varchar,
  	"version_safety" varchar,
  	"version_ecological_impact" varchar,
  	"version_site_example_id" integer,
  	"version_protocol_note" varchar,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__stewardship_guides_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__stewardship_guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "recipes_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" varchar,
  	"item" varchar
  );
  
  CREATE TABLE "recipes_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "recipes_consent_media_rights" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_recipes_consent_media_rights",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "recipes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"region" varchar,
  	"serves" varchar,
  	"time" varchar,
  	"summary" varchar,
  	"image_id" integer,
  	"story_behind" jsonb,
  	"consent_contributor_name" varchar,
  	"consent_contributor_contact" varchar,
  	"consent_scope" "enum_recipes_consent_scope" DEFAULT 'archive',
  	"consent_documented" boolean DEFAULT false,
  	"consent_consent_date" timestamp(3) with time zone,
  	"consent_consent_reference" varchar,
  	"consent_attribution" "enum_recipes_consent_attribution" DEFAULT 'named',
  	"consent_attribution_text" varchar,
  	"consent_withdrawal_contact" varchar DEFAULT 'hello@farefarms.ca',
  	"consent_withdrawn" boolean DEFAULT false,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_recipes_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_recipes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "recipes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"crops_id" integer
  );
  
  CREATE TABLE "_recipes_v_version_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quantity" varchar,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recipes_v_version_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recipes_v_version_consent_media_rights" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__recipes_v_version_consent_media_rights",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_recipes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_region" varchar,
  	"version_serves" varchar,
  	"version_time" varchar,
  	"version_summary" varchar,
  	"version_image_id" integer,
  	"version_story_behind" jsonb,
  	"version_consent_contributor_name" varchar,
  	"version_consent_contributor_contact" varchar,
  	"version_consent_scope" "enum__recipes_v_version_consent_scope" DEFAULT 'archive',
  	"version_consent_documented" boolean DEFAULT false,
  	"version_consent_consent_date" timestamp(3) with time zone,
  	"version_consent_consent_reference" varchar,
  	"version_consent_attribution" "enum__recipes_v_version_consent_attribution" DEFAULT 'named',
  	"version_consent_attribution_text" varchar,
  	"version_consent_withdrawal_contact" varchar DEFAULT 'hello@farefarms.ca',
  	"version_consent_withdrawn" boolean DEFAULT false,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__recipes_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__recipes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_recipes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"crops_id" integer
  );
  
  CREATE TABLE "stories_consent_media_rights" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_stories_consent_media_rights",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"image_id" integer,
  	"body" jsonb,
  	"audio_id" integer,
  	"transcript" jsonb,
  	"consent_contributor_name" varchar,
  	"consent_contributor_contact" varchar,
  	"consent_scope" "enum_stories_consent_scope" DEFAULT 'archive',
  	"consent_documented" boolean DEFAULT false,
  	"consent_consent_date" timestamp(3) with time zone,
  	"consent_consent_reference" varchar,
  	"consent_attribution" "enum_stories_consent_attribution" DEFAULT 'named',
  	"consent_attribution_text" varchar,
  	"consent_withdrawal_contact" varchar DEFAULT 'hello@farefarms.ca',
  	"consent_withdrawn" boolean DEFAULT false,
  	"review_contributor" varchar,
  	"review_reviewer_name" varchar,
  	"review_status" "enum_stories_review_status" DEFAULT 'draft',
  	"review_last_reviewed" timestamp(3) with time zone,
  	"review_review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"crops_id" integer
  );
  
  CREATE TABLE "_stories_v_version_consent_media_rights" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__stories_v_version_consent_media_rights",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_image_id" integer,
  	"version_body" jsonb,
  	"version_audio_id" integer,
  	"version_transcript" jsonb,
  	"version_consent_contributor_name" varchar,
  	"version_consent_contributor_contact" varchar,
  	"version_consent_scope" "enum__stories_v_version_consent_scope" DEFAULT 'archive',
  	"version_consent_documented" boolean DEFAULT false,
  	"version_consent_consent_date" timestamp(3) with time zone,
  	"version_consent_consent_reference" varchar,
  	"version_consent_attribution" "enum__stories_v_version_consent_attribution" DEFAULT 'named',
  	"version_consent_attribution_text" varchar,
  	"version_consent_withdrawal_contact" varchar DEFAULT 'hello@farefarms.ca',
  	"version_consent_withdrawn" boolean DEFAULT false,
  	"version_review_contributor" varchar,
  	"version_review_reviewer_name" varchar,
  	"version_review_status" "enum__stories_v_version_review_status" DEFAULT 'draft',
  	"version_review_last_reviewed" timestamp(3) with time zone,
  	"version_review_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"crops_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"confirmed" boolean DEFAULT false,
  	"category" "enum_events_category",
  	"status" "enum_events_status" DEFAULT 'scheduled',
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"location" varchar,
  	"project_id" integer,
  	"summary" varchar,
  	"description" jsonb,
  	"accessibility" varchar,
  	"registration_enabled" boolean DEFAULT true,
  	"registration_capacity" numeric,
  	"registration_closes_at" timestamp(3) with time zone,
  	"registration_external_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_confirmed" boolean DEFAULT false,
  	"version_category" "enum__events_v_version_category",
  	"version_status" "enum__events_v_version_status" DEFAULT 'scheduled',
  	"version_starts_at" timestamp(3) with time zone,
  	"version_ends_at" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_project_id" integer,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_accessibility" varchar,
  	"version_registration_enabled" boolean DEFAULT true,
  	"version_registration_capacity" numeric,
  	"version_registration_closes_at" timestamp(3) with time zone,
  	"version_registration_external_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"confirmed" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"relationship" varchar,
  	"url" varchar,
  	"logo_id" integer,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subscribers_lists" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_subscribers_lists",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"unsubscribed" boolean DEFAULT false,
  	"consent_text" varchar,
  	"consented_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volunteer_signups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"role" varchar,
  	"message" varchar,
  	"status" "enum_volunteer_signups_status" DEFAULT 'new',
  	"consent_text" varchar,
  	"consented_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "knowledge_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"kind" "enum_knowledge_submissions_kind",
  	"description" varchar NOT NULL,
  	"scope" "enum_knowledge_submissions_scope",
  	"attribution" "enum_knowledge_submissions_attribution",
  	"status" "enum_knowledge_submissions_status" DEFAULT 'new',
  	"notes" varchar,
  	"consent_text" varchar,
  	"consented_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "producer_interest" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"business" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"location" varchar,
  	"category" varchar,
  	"description" varchar,
  	"status" "enum_producer_interest_status" DEFAULT 'new',
  	"consent_text" varchar,
  	"consented_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"accessibility_needs" varchar,
  	"status" "enum_event_registrations_status" DEFAULT 'registered',
  	"consent_text" varchar,
  	"consented_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "producers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"status" "enum_producers_status" DEFAULT 'interested',
  	"location" varchar,
  	"contact_email" varchar,
  	"story" varchar,
  	"agreement_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_regulatory_flags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_regulatory_flags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"sku" varchar,
  	"category" "enum_products_category",
  	"producer_id" integer,
  	"provenance" varchar,
  	"price" numeric,
  	"tax_class" "enum_products_tax_class",
  	"inventory" numeric,
  	"fulfillment" "enum_products_fulfillment",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"crops_id" integer,
  	"resources_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"caption" varchar,
  	"verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resources_id" integer,
  	"crops_id" integer,
  	"topics_id" integer,
  	"people_id" integer,
  	"projects_id" integer,
  	"stewardship_guides_id" integer,
  	"recipes_id" integer,
  	"stories_id" integer,
  	"events_id" integer,
  	"partners_id" integer,
  	"subscribers_id" integer,
  	"volunteer_signups_id" integer,
  	"knowledge_submissions_id" integer,
  	"producer_interest_id" integer,
  	"event_registrations_id" integer,
  	"producers_id" integer,
  	"products_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" "enum_home_page_headline" DEFAULT 'culture',
  	"hero_intro" varchar DEFAULT 'FARE Farms is an Afro-Indigenous-centred land and food initiative advancing agricultural knowledge, food sovereignty, cultural preservation, and community stewardship. Through community gardens, education, cultural exchange, and land-based learning, we create opportunities to reconnect with food, land, and ancestral knowledge.',
  	"hero_image_id" integer,
  	"roots_body" varchar DEFAULT 'Food is more than nourishment. It carries memory, identity, resilience, and knowledge passed between generations. FARE Farms creates space to explore, preserve, and share agricultural traditions while learning from the responsibilities of stewardship on Indigenous lands.',
  	"pillars_intro" varchar DEFAULT 'Discover agricultural heritage, learn culturally meaningful growing practices, care for the land, and build community.',
  	"seed_to_story_intro" varchar DEFAULT 'Every crop has a story. Explore the histories, growing practices, cultural significance, and food traditions connected to plants that nourish our communities.',
  	"gardens_intro" varchar DEFAULT 'Our growing spaces support hands-on education, intergenerational learning, ecological care, and cultural connection.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar DEFAULT 'hello@farefarms.ca' NOT NULL,
  	"garden_name" varchar DEFAULT 'Trillium Park Garden',
  	"garden_address" varchar DEFAULT 'False Creek Flats
  Vancouver, BC',
  	"garden_hours" varchar DEFAULT 'Saturdays 10 AM – 2 PM, and during events',
  	"land_acknowledgment" varchar DEFAULT 'We acknowledge that we grow on the unceded traditional territories of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and səlilwətaɬ (Tsleil-Waututh) Nations.' NOT NULL,
  	"privacy_contact" varchar DEFAULT 'hello@farefarms.ca',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "marketplace_settings_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketplace_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'We envision a community-rooted marketplace celebrating culturally meaningful foods, seeds, growing supplies, educational resources, and products created by local growers and makers.',
  	"current_phase" "enum_marketplace_settings_current_phase" DEFAULT '1',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "resources_review_sources" ADD CONSTRAINT "resources_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resources_v_version_review_sources" ADD CONSTRAINT "_resources_v_version_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_resources_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resources_v" ADD CONSTRAINT "_resources_v_parent_id_resources_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resources_v" ADD CONSTRAINT "_resources_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resources_v" ADD CONSTRAINT "_resources_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_resources_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_resources_v_rels" ADD CONSTRAINT "_resources_v_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops_regional_names" ADD CONSTRAINT "crops_regional_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops_planting_steps" ADD CONSTRAINT "crops_planting_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops_review_sources" ADD CONSTRAINT "crops_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops" ADD CONSTRAINT "crops_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "crops_rels" ADD CONSTRAINT "crops_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops_rels" ADD CONSTRAINT "crops_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crops_rels" ADD CONSTRAINT "crops_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v_version_regional_names" ADD CONSTRAINT "_crops_v_version_regional_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_crops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v_version_planting_steps" ADD CONSTRAINT "_crops_v_version_planting_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_crops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v_version_review_sources" ADD CONSTRAINT "_crops_v_version_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_crops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v" ADD CONSTRAINT "_crops_v_parent_id_crops_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."crops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_crops_v" ADD CONSTRAINT "_crops_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_crops_v_rels" ADD CONSTRAINT "_crops_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_crops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v_rels" ADD CONSTRAINT "_crops_v_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crops_v_rels" ADD CONSTRAINT "_crops_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_review_sources" ADD CONSTRAINT "people_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_version_review_sources" ADD CONSTRAINT "_people_v_version_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_activities" ADD CONSTRAINT "projects_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_roadmap" ADD CONSTRAINT "projects_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_updates" ADD CONSTRAINT "projects_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_activities" ADD CONSTRAINT "_projects_v_version_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_roadmap" ADD CONSTRAINT "_projects_v_version_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_updates" ADD CONSTRAINT "_projects_v_version_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stewardship_guides_materials" ADD CONSTRAINT "stewardship_guides_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stewardship_guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stewardship_guides_steps" ADD CONSTRAINT "stewardship_guides_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stewardship_guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stewardship_guides_review_sources" ADD CONSTRAINT "stewardship_guides_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stewardship_guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stewardship_guides" ADD CONSTRAINT "stewardship_guides_site_example_id_projects_id_fk" FOREIGN KEY ("site_example_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stewardship_guides_v_version_materials" ADD CONSTRAINT "_stewardship_guides_v_version_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stewardship_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stewardship_guides_v_version_steps" ADD CONSTRAINT "_stewardship_guides_v_version_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stewardship_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stewardship_guides_v_version_review_sources" ADD CONSTRAINT "_stewardship_guides_v_version_review_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stewardship_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stewardship_guides_v" ADD CONSTRAINT "_stewardship_guides_v_parent_id_stewardship_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stewardship_guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stewardship_guides_v" ADD CONSTRAINT "_stewardship_guides_v_version_site_example_id_projects_id_fk" FOREIGN KEY ("version_site_example_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_steps" ADD CONSTRAINT "recipes_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_consent_media_rights" ADD CONSTRAINT "recipes_consent_media_rights_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes" ADD CONSTRAINT "recipes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_steps" ADD CONSTRAINT "_recipes_v_version_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_version_consent_media_rights" ADD CONSTRAINT "_recipes_v_version_consent_media_rights_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_consent_media_rights" ADD CONSTRAINT "stories_consent_media_rights_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_version_consent_media_rights" ADD CONSTRAINT "_stories_v_version_consent_media_rights_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_parent_id_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_audio_id_media_id_fk" FOREIGN KEY ("version_audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stories_v_rels" ADD CONSTRAINT "_stories_v_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_project_id_projects_id_fk" FOREIGN KEY ("version_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subscribers_lists" ADD CONSTRAINT "subscribers_lists_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_regulatory_flags" ADD CONSTRAINT "products_regulatory_flags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_producer_id_producers_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."producers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_crops_fk" FOREIGN KEY ("crops_id") REFERENCES "public"."crops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stewardship_guides_fk" FOREIGN KEY ("stewardship_guides_id") REFERENCES "public"."stewardship_guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_signups_fk" FOREIGN KEY ("volunteer_signups_id") REFERENCES "public"."volunteer_signups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_knowledge_submissions_fk" FOREIGN KEY ("knowledge_submissions_id") REFERENCES "public"."knowledge_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_producer_interest_fk" FOREIGN KEY ("producer_interest_id") REFERENCES "public"."producer_interest"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_producers_fk" FOREIGN KEY ("producers_id") REFERENCES "public"."producers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketplace_settings_categories" ADD CONSTRAINT "marketplace_settings_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketplace_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resources_review_sources_order_idx" ON "resources_review_sources" USING btree ("_order");
  CREATE INDEX "resources_review_sources_parent_id_idx" ON "resources_review_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "resources_slug_idx" ON "resources" USING btree ("slug");
  CREATE INDEX "resources_hero_image_idx" ON "resources" USING btree ("hero_image_id");
  CREATE INDEX "resources_file_idx" ON "resources" USING btree ("file_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "resources__status_idx" ON "resources" USING btree ("_status");
  CREATE INDEX "resources_rels_order_idx" ON "resources_rels" USING btree ("order");
  CREATE INDEX "resources_rels_parent_idx" ON "resources_rels" USING btree ("parent_id");
  CREATE INDEX "resources_rels_path_idx" ON "resources_rels" USING btree ("path");
  CREATE INDEX "resources_rels_topics_id_idx" ON "resources_rels" USING btree ("topics_id");
  CREATE INDEX "resources_rels_crops_id_idx" ON "resources_rels" USING btree ("crops_id");
  CREATE INDEX "resources_rels_resources_id_idx" ON "resources_rels" USING btree ("resources_id");
  CREATE INDEX "_resources_v_version_review_sources_order_idx" ON "_resources_v_version_review_sources" USING btree ("_order");
  CREATE INDEX "_resources_v_version_review_sources_parent_id_idx" ON "_resources_v_version_review_sources" USING btree ("_parent_id");
  CREATE INDEX "_resources_v_parent_idx" ON "_resources_v" USING btree ("parent_id");
  CREATE INDEX "_resources_v_version_version_slug_idx" ON "_resources_v" USING btree ("version_slug");
  CREATE INDEX "_resources_v_version_version_hero_image_idx" ON "_resources_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_resources_v_version_version_file_idx" ON "_resources_v" USING btree ("version_file_id");
  CREATE INDEX "_resources_v_version_version_updated_at_idx" ON "_resources_v" USING btree ("version_updated_at");
  CREATE INDEX "_resources_v_version_version_created_at_idx" ON "_resources_v" USING btree ("version_created_at");
  CREATE INDEX "_resources_v_version_version__status_idx" ON "_resources_v" USING btree ("version__status");
  CREATE INDEX "_resources_v_created_at_idx" ON "_resources_v" USING btree ("created_at");
  CREATE INDEX "_resources_v_updated_at_idx" ON "_resources_v" USING btree ("updated_at");
  CREATE INDEX "_resources_v_latest_idx" ON "_resources_v" USING btree ("latest");
  CREATE INDEX "_resources_v_rels_order_idx" ON "_resources_v_rels" USING btree ("order");
  CREATE INDEX "_resources_v_rels_parent_idx" ON "_resources_v_rels" USING btree ("parent_id");
  CREATE INDEX "_resources_v_rels_path_idx" ON "_resources_v_rels" USING btree ("path");
  CREATE INDEX "_resources_v_rels_topics_id_idx" ON "_resources_v_rels" USING btree ("topics_id");
  CREATE INDEX "_resources_v_rels_crops_id_idx" ON "_resources_v_rels" USING btree ("crops_id");
  CREATE INDEX "_resources_v_rels_resources_id_idx" ON "_resources_v_rels" USING btree ("resources_id");
  CREATE INDEX "crops_regional_names_order_idx" ON "crops_regional_names" USING btree ("_order");
  CREATE INDEX "crops_regional_names_parent_id_idx" ON "crops_regional_names" USING btree ("_parent_id");
  CREATE INDEX "crops_planting_steps_order_idx" ON "crops_planting_steps" USING btree ("_order");
  CREATE INDEX "crops_planting_steps_parent_id_idx" ON "crops_planting_steps" USING btree ("_parent_id");
  CREATE INDEX "crops_review_sources_order_idx" ON "crops_review_sources" USING btree ("_order");
  CREATE INDEX "crops_review_sources_parent_id_idx" ON "crops_review_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "crops_slug_idx" ON "crops" USING btree ("slug");
  CREATE INDEX "crops_hero_image_idx" ON "crops" USING btree ("hero_image_id");
  CREATE INDEX "crops_updated_at_idx" ON "crops" USING btree ("updated_at");
  CREATE INDEX "crops_created_at_idx" ON "crops" USING btree ("created_at");
  CREATE INDEX "crops__status_idx" ON "crops" USING btree ("_status");
  CREATE INDEX "crops_rels_order_idx" ON "crops_rels" USING btree ("order");
  CREATE INDEX "crops_rels_parent_idx" ON "crops_rels" USING btree ("parent_id");
  CREATE INDEX "crops_rels_path_idx" ON "crops_rels" USING btree ("path");
  CREATE INDEX "crops_rels_resources_id_idx" ON "crops_rels" USING btree ("resources_id");
  CREATE INDEX "crops_rels_products_id_idx" ON "crops_rels" USING btree ("products_id");
  CREATE INDEX "_crops_v_version_regional_names_order_idx" ON "_crops_v_version_regional_names" USING btree ("_order");
  CREATE INDEX "_crops_v_version_regional_names_parent_id_idx" ON "_crops_v_version_regional_names" USING btree ("_parent_id");
  CREATE INDEX "_crops_v_version_planting_steps_order_idx" ON "_crops_v_version_planting_steps" USING btree ("_order");
  CREATE INDEX "_crops_v_version_planting_steps_parent_id_idx" ON "_crops_v_version_planting_steps" USING btree ("_parent_id");
  CREATE INDEX "_crops_v_version_review_sources_order_idx" ON "_crops_v_version_review_sources" USING btree ("_order");
  CREATE INDEX "_crops_v_version_review_sources_parent_id_idx" ON "_crops_v_version_review_sources" USING btree ("_parent_id");
  CREATE INDEX "_crops_v_parent_idx" ON "_crops_v" USING btree ("parent_id");
  CREATE INDEX "_crops_v_version_version_slug_idx" ON "_crops_v" USING btree ("version_slug");
  CREATE INDEX "_crops_v_version_version_hero_image_idx" ON "_crops_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_crops_v_version_version_updated_at_idx" ON "_crops_v" USING btree ("version_updated_at");
  CREATE INDEX "_crops_v_version_version_created_at_idx" ON "_crops_v" USING btree ("version_created_at");
  CREATE INDEX "_crops_v_version_version__status_idx" ON "_crops_v" USING btree ("version__status");
  CREATE INDEX "_crops_v_created_at_idx" ON "_crops_v" USING btree ("created_at");
  CREATE INDEX "_crops_v_updated_at_idx" ON "_crops_v" USING btree ("updated_at");
  CREATE INDEX "_crops_v_latest_idx" ON "_crops_v" USING btree ("latest");
  CREATE INDEX "_crops_v_rels_order_idx" ON "_crops_v_rels" USING btree ("order");
  CREATE INDEX "_crops_v_rels_parent_idx" ON "_crops_v_rels" USING btree ("parent_id");
  CREATE INDEX "_crops_v_rels_path_idx" ON "_crops_v_rels" USING btree ("path");
  CREATE INDEX "_crops_v_rels_resources_id_idx" ON "_crops_v_rels" USING btree ("resources_id");
  CREATE INDEX "_crops_v_rels_products_id_idx" ON "_crops_v_rels" USING btree ("products_id");
  CREATE UNIQUE INDEX "topics_slug_idx" ON "topics" USING btree ("slug");
  CREATE INDEX "topics_updated_at_idx" ON "topics" USING btree ("updated_at");
  CREATE INDEX "topics_created_at_idx" ON "topics" USING btree ("created_at");
  CREATE INDEX "people_review_sources_order_idx" ON "people_review_sources" USING btree ("_order");
  CREATE INDEX "people_review_sources_parent_id_idx" ON "people_review_sources" USING btree ("_parent_id");
  CREATE INDEX "people_image_idx" ON "people" USING btree ("image_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people__status_idx" ON "people" USING btree ("_status");
  CREATE INDEX "_people_v_version_review_sources_order_idx" ON "_people_v_version_review_sources" USING btree ("_order");
  CREATE INDEX "_people_v_version_review_sources_parent_id_idx" ON "_people_v_version_review_sources" USING btree ("_parent_id");
  CREATE INDEX "_people_v_parent_idx" ON "_people_v" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_version_image_idx" ON "_people_v" USING btree ("version_image_id");
  CREATE INDEX "_people_v_version_version_updated_at_idx" ON "_people_v" USING btree ("version_updated_at");
  CREATE INDEX "_people_v_version_version_created_at_idx" ON "_people_v" USING btree ("version_created_at");
  CREATE INDEX "_people_v_version_version__status_idx" ON "_people_v" USING btree ("version__status");
  CREATE INDEX "_people_v_created_at_idx" ON "_people_v" USING btree ("created_at");
  CREATE INDEX "_people_v_updated_at_idx" ON "_people_v" USING btree ("updated_at");
  CREATE INDEX "_people_v_latest_idx" ON "_people_v" USING btree ("latest");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE INDEX "projects_activities_order_idx" ON "projects_activities" USING btree ("_order");
  CREATE INDEX "projects_activities_parent_id_idx" ON "projects_activities" USING btree ("_parent_id");
  CREATE INDEX "projects_roadmap_order_idx" ON "projects_roadmap" USING btree ("_order");
  CREATE INDEX "projects_roadmap_parent_id_idx" ON "projects_roadmap" USING btree ("_parent_id");
  CREATE INDEX "projects_updates_order_idx" ON "projects_updates" USING btree ("_order");
  CREATE INDEX "projects_updates_parent_id_idx" ON "projects_updates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_activities_order_idx" ON "_projects_v_version_activities" USING btree ("_order");
  CREATE INDEX "_projects_v_version_activities_parent_id_idx" ON "_projects_v_version_activities" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_roadmap_order_idx" ON "_projects_v_version_roadmap" USING btree ("_order");
  CREATE INDEX "_projects_v_version_roadmap_parent_id_idx" ON "_projects_v_version_roadmap" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_updates_order_idx" ON "_projects_v_version_updates" USING btree ("_order");
  CREATE INDEX "_projects_v_version_updates_parent_id_idx" ON "_projects_v_version_updates" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id");
  CREATE INDEX "stewardship_guides_materials_order_idx" ON "stewardship_guides_materials" USING btree ("_order");
  CREATE INDEX "stewardship_guides_materials_parent_id_idx" ON "stewardship_guides_materials" USING btree ("_parent_id");
  CREATE INDEX "stewardship_guides_steps_order_idx" ON "stewardship_guides_steps" USING btree ("_order");
  CREATE INDEX "stewardship_guides_steps_parent_id_idx" ON "stewardship_guides_steps" USING btree ("_parent_id");
  CREATE INDEX "stewardship_guides_review_sources_order_idx" ON "stewardship_guides_review_sources" USING btree ("_order");
  CREATE INDEX "stewardship_guides_review_sources_parent_id_idx" ON "stewardship_guides_review_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stewardship_guides_slug_idx" ON "stewardship_guides" USING btree ("slug");
  CREATE INDEX "stewardship_guides_site_example_idx" ON "stewardship_guides" USING btree ("site_example_id");
  CREATE INDEX "stewardship_guides_updated_at_idx" ON "stewardship_guides" USING btree ("updated_at");
  CREATE INDEX "stewardship_guides_created_at_idx" ON "stewardship_guides" USING btree ("created_at");
  CREATE INDEX "stewardship_guides__status_idx" ON "stewardship_guides" USING btree ("_status");
  CREATE INDEX "_stewardship_guides_v_version_materials_order_idx" ON "_stewardship_guides_v_version_materials" USING btree ("_order");
  CREATE INDEX "_stewardship_guides_v_version_materials_parent_id_idx" ON "_stewardship_guides_v_version_materials" USING btree ("_parent_id");
  CREATE INDEX "_stewardship_guides_v_version_steps_order_idx" ON "_stewardship_guides_v_version_steps" USING btree ("_order");
  CREATE INDEX "_stewardship_guides_v_version_steps_parent_id_idx" ON "_stewardship_guides_v_version_steps" USING btree ("_parent_id");
  CREATE INDEX "_stewardship_guides_v_version_review_sources_order_idx" ON "_stewardship_guides_v_version_review_sources" USING btree ("_order");
  CREATE INDEX "_stewardship_guides_v_version_review_sources_parent_id_idx" ON "_stewardship_guides_v_version_review_sources" USING btree ("_parent_id");
  CREATE INDEX "_stewardship_guides_v_parent_idx" ON "_stewardship_guides_v" USING btree ("parent_id");
  CREATE INDEX "_stewardship_guides_v_version_version_slug_idx" ON "_stewardship_guides_v" USING btree ("version_slug");
  CREATE INDEX "_stewardship_guides_v_version_version_site_example_idx" ON "_stewardship_guides_v" USING btree ("version_site_example_id");
  CREATE INDEX "_stewardship_guides_v_version_version_updated_at_idx" ON "_stewardship_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_stewardship_guides_v_version_version_created_at_idx" ON "_stewardship_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_stewardship_guides_v_version_version__status_idx" ON "_stewardship_guides_v" USING btree ("version__status");
  CREATE INDEX "_stewardship_guides_v_created_at_idx" ON "_stewardship_guides_v" USING btree ("created_at");
  CREATE INDEX "_stewardship_guides_v_updated_at_idx" ON "_stewardship_guides_v" USING btree ("updated_at");
  CREATE INDEX "_stewardship_guides_v_latest_idx" ON "_stewardship_guides_v" USING btree ("latest");
  CREATE INDEX "recipes_ingredients_order_idx" ON "recipes_ingredients" USING btree ("_order");
  CREATE INDEX "recipes_ingredients_parent_id_idx" ON "recipes_ingredients" USING btree ("_parent_id");
  CREATE INDEX "recipes_steps_order_idx" ON "recipes_steps" USING btree ("_order");
  CREATE INDEX "recipes_steps_parent_id_idx" ON "recipes_steps" USING btree ("_parent_id");
  CREATE INDEX "recipes_consent_media_rights_order_idx" ON "recipes_consent_media_rights" USING btree ("order");
  CREATE INDEX "recipes_consent_media_rights_parent_idx" ON "recipes_consent_media_rights" USING btree ("parent_id");
  CREATE UNIQUE INDEX "recipes_slug_idx" ON "recipes" USING btree ("slug");
  CREATE INDEX "recipes_image_idx" ON "recipes" USING btree ("image_id");
  CREATE INDEX "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
  CREATE INDEX "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
  CREATE INDEX "recipes__status_idx" ON "recipes" USING btree ("_status");
  CREATE INDEX "recipes_rels_order_idx" ON "recipes_rels" USING btree ("order");
  CREATE INDEX "recipes_rels_parent_idx" ON "recipes_rels" USING btree ("parent_id");
  CREATE INDEX "recipes_rels_path_idx" ON "recipes_rels" USING btree ("path");
  CREATE INDEX "recipes_rels_crops_id_idx" ON "recipes_rels" USING btree ("crops_id");
  CREATE INDEX "_recipes_v_version_ingredients_order_idx" ON "_recipes_v_version_ingredients" USING btree ("_order");
  CREATE INDEX "_recipes_v_version_ingredients_parent_id_idx" ON "_recipes_v_version_ingredients" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_version_steps_order_idx" ON "_recipes_v_version_steps" USING btree ("_order");
  CREATE INDEX "_recipes_v_version_steps_parent_id_idx" ON "_recipes_v_version_steps" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_version_consent_media_rights_order_idx" ON "_recipes_v_version_consent_media_rights" USING btree ("order");
  CREATE INDEX "_recipes_v_version_consent_media_rights_parent_idx" ON "_recipes_v_version_consent_media_rights" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_parent_idx" ON "_recipes_v" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_version_version_slug_idx" ON "_recipes_v" USING btree ("version_slug");
  CREATE INDEX "_recipes_v_version_version_image_idx" ON "_recipes_v" USING btree ("version_image_id");
  CREATE INDEX "_recipes_v_version_version_updated_at_idx" ON "_recipes_v" USING btree ("version_updated_at");
  CREATE INDEX "_recipes_v_version_version_created_at_idx" ON "_recipes_v" USING btree ("version_created_at");
  CREATE INDEX "_recipes_v_version_version__status_idx" ON "_recipes_v" USING btree ("version__status");
  CREATE INDEX "_recipes_v_created_at_idx" ON "_recipes_v" USING btree ("created_at");
  CREATE INDEX "_recipes_v_updated_at_idx" ON "_recipes_v" USING btree ("updated_at");
  CREATE INDEX "_recipes_v_latest_idx" ON "_recipes_v" USING btree ("latest");
  CREATE INDEX "_recipes_v_rels_order_idx" ON "_recipes_v_rels" USING btree ("order");
  CREATE INDEX "_recipes_v_rels_parent_idx" ON "_recipes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_rels_path_idx" ON "_recipes_v_rels" USING btree ("path");
  CREATE INDEX "_recipes_v_rels_crops_id_idx" ON "_recipes_v_rels" USING btree ("crops_id");
  CREATE INDEX "stories_consent_media_rights_order_idx" ON "stories_consent_media_rights" USING btree ("order");
  CREATE INDEX "stories_consent_media_rights_parent_idx" ON "stories_consent_media_rights" USING btree ("parent_id");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_image_idx" ON "stories" USING btree ("image_id");
  CREATE INDEX "stories_audio_idx" ON "stories" USING btree ("audio_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE INDEX "stories__status_idx" ON "stories" USING btree ("_status");
  CREATE INDEX "stories_rels_order_idx" ON "stories_rels" USING btree ("order");
  CREATE INDEX "stories_rels_parent_idx" ON "stories_rels" USING btree ("parent_id");
  CREATE INDEX "stories_rels_path_idx" ON "stories_rels" USING btree ("path");
  CREATE INDEX "stories_rels_crops_id_idx" ON "stories_rels" USING btree ("crops_id");
  CREATE INDEX "_stories_v_version_consent_media_rights_order_idx" ON "_stories_v_version_consent_media_rights" USING btree ("order");
  CREATE INDEX "_stories_v_version_consent_media_rights_parent_idx" ON "_stories_v_version_consent_media_rights" USING btree ("parent_id");
  CREATE INDEX "_stories_v_parent_idx" ON "_stories_v" USING btree ("parent_id");
  CREATE INDEX "_stories_v_version_version_slug_idx" ON "_stories_v" USING btree ("version_slug");
  CREATE INDEX "_stories_v_version_version_image_idx" ON "_stories_v" USING btree ("version_image_id");
  CREATE INDEX "_stories_v_version_version_audio_idx" ON "_stories_v" USING btree ("version_audio_id");
  CREATE INDEX "_stories_v_version_version_updated_at_idx" ON "_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_stories_v_version_version_created_at_idx" ON "_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_stories_v_version_version__status_idx" ON "_stories_v" USING btree ("version__status");
  CREATE INDEX "_stories_v_created_at_idx" ON "_stories_v" USING btree ("created_at");
  CREATE INDEX "_stories_v_updated_at_idx" ON "_stories_v" USING btree ("updated_at");
  CREATE INDEX "_stories_v_latest_idx" ON "_stories_v" USING btree ("latest");
  CREATE INDEX "_stories_v_rels_order_idx" ON "_stories_v_rels" USING btree ("order");
  CREATE INDEX "_stories_v_rels_parent_idx" ON "_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_stories_v_rels_path_idx" ON "_stories_v_rels" USING btree ("path");
  CREATE INDEX "_stories_v_rels_crops_id_idx" ON "_stories_v_rels" USING btree ("crops_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_project_idx" ON "events" USING btree ("project_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_project_idx" ON "_events_v" USING btree ("version_project_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "subscribers_lists_order_idx" ON "subscribers_lists" USING btree ("order");
  CREATE INDEX "subscribers_lists_parent_idx" ON "subscribers_lists" USING btree ("parent_id");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "volunteer_signups_updated_at_idx" ON "volunteer_signups" USING btree ("updated_at");
  CREATE INDEX "volunteer_signups_created_at_idx" ON "volunteer_signups" USING btree ("created_at");
  CREATE INDEX "knowledge_submissions_updated_at_idx" ON "knowledge_submissions" USING btree ("updated_at");
  CREATE INDEX "knowledge_submissions_created_at_idx" ON "knowledge_submissions" USING btree ("created_at");
  CREATE INDEX "producer_interest_updated_at_idx" ON "producer_interest" USING btree ("updated_at");
  CREATE INDEX "producer_interest_created_at_idx" ON "producer_interest" USING btree ("created_at");
  CREATE INDEX "event_registrations_event_idx" ON "event_registrations" USING btree ("event_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  CREATE INDEX "producers_updated_at_idx" ON "producers" USING btree ("updated_at");
  CREATE INDEX "producers_created_at_idx" ON "producers" USING btree ("created_at");
  CREATE INDEX "products_regulatory_flags_order_idx" ON "products_regulatory_flags" USING btree ("order");
  CREATE INDEX "products_regulatory_flags_parent_idx" ON "products_regulatory_flags" USING btree ("parent_id");
  CREATE UNIQUE INDEX "products_sku_idx" ON "products" USING btree ("sku");
  CREATE INDEX "products_producer_idx" ON "products" USING btree ("producer_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_crops_id_idx" ON "products_rels" USING btree ("crops_id");
  CREATE INDEX "products_rels_resources_id_idx" ON "products_rels" USING btree ("resources_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_crops_id_idx" ON "payload_locked_documents_rels" USING btree ("crops_id");
  CREATE INDEX "payload_locked_documents_rels_topics_id_idx" ON "payload_locked_documents_rels" USING btree ("topics_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_stewardship_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("stewardship_guides_id");
  CREATE INDEX "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_signups_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_signups_id");
  CREATE INDEX "payload_locked_documents_rels_knowledge_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("knowledge_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_producer_interest_id_idx" ON "payload_locked_documents_rels" USING btree ("producer_interest_id");
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
  CREATE INDEX "payload_locked_documents_rels_producers_id_idx" ON "payload_locked_documents_rels" USING btree ("producers_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "marketplace_settings_categories_order_idx" ON "marketplace_settings_categories" USING btree ("_order");
  CREATE INDEX "marketplace_settings_categories_parent_id_idx" ON "marketplace_settings_categories" USING btree ("_parent_id");`)
  } catch (error) {
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause.message : 'Unknown database error'
    console.error(`Initial migration database error: ${cause}`)
    throw error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "resources_review_sources" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "resources_rels" CASCADE;
  DROP TABLE "_resources_v_version_review_sources" CASCADE;
  DROP TABLE "_resources_v" CASCADE;
  DROP TABLE "_resources_v_rels" CASCADE;
  DROP TABLE "crops_regional_names" CASCADE;
  DROP TABLE "crops_planting_steps" CASCADE;
  DROP TABLE "crops_review_sources" CASCADE;
  DROP TABLE "crops" CASCADE;
  DROP TABLE "crops_rels" CASCADE;
  DROP TABLE "_crops_v_version_regional_names" CASCADE;
  DROP TABLE "_crops_v_version_planting_steps" CASCADE;
  DROP TABLE "_crops_v_version_review_sources" CASCADE;
  DROP TABLE "_crops_v" CASCADE;
  DROP TABLE "_crops_v_rels" CASCADE;
  DROP TABLE "topics" CASCADE;
  DROP TABLE "people_review_sources" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "_people_v_version_review_sources" CASCADE;
  DROP TABLE "_people_v" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_activities" CASCADE;
  DROP TABLE "projects_roadmap" CASCADE;
  DROP TABLE "projects_updates" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v_version_activities" CASCADE;
  DROP TABLE "_projects_v_version_roadmap" CASCADE;
  DROP TABLE "_projects_v_version_updates" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "stewardship_guides_materials" CASCADE;
  DROP TABLE "stewardship_guides_steps" CASCADE;
  DROP TABLE "stewardship_guides_review_sources" CASCADE;
  DROP TABLE "stewardship_guides" CASCADE;
  DROP TABLE "_stewardship_guides_v_version_materials" CASCADE;
  DROP TABLE "_stewardship_guides_v_version_steps" CASCADE;
  DROP TABLE "_stewardship_guides_v_version_review_sources" CASCADE;
  DROP TABLE "_stewardship_guides_v" CASCADE;
  DROP TABLE "recipes_ingredients" CASCADE;
  DROP TABLE "recipes_steps" CASCADE;
  DROP TABLE "recipes_consent_media_rights" CASCADE;
  DROP TABLE "recipes" CASCADE;
  DROP TABLE "recipes_rels" CASCADE;
  DROP TABLE "_recipes_v_version_ingredients" CASCADE;
  DROP TABLE "_recipes_v_version_steps" CASCADE;
  DROP TABLE "_recipes_v_version_consent_media_rights" CASCADE;
  DROP TABLE "_recipes_v" CASCADE;
  DROP TABLE "_recipes_v_rels" CASCADE;
  DROP TABLE "stories_consent_media_rights" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_rels" CASCADE;
  DROP TABLE "_stories_v_version_consent_media_rights" CASCADE;
  DROP TABLE "_stories_v" CASCADE;
  DROP TABLE "_stories_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "subscribers_lists" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "volunteer_signups" CASCADE;
  DROP TABLE "knowledge_submissions" CASCADE;
  DROP TABLE "producer_interest" CASCADE;
  DROP TABLE "event_registrations" CASCADE;
  DROP TABLE "producers" CASCADE;
  DROP TABLE "products_regulatory_flags" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "marketplace_settings_categories" CASCADE;
  DROP TABLE "marketplace_settings" CASCADE;
  DROP TYPE "public"."enum_resources_type";
  DROP TYPE "public"."enum_resources_review_status";
  DROP TYPE "public"."enum_resources_status";
  DROP TYPE "public"."enum__resources_v_version_type";
  DROP TYPE "public"."enum__resources_v_version_review_status";
  DROP TYPE "public"."enum__resources_v_version_status";
  DROP TYPE "public"."enum_crops_color";
  DROP TYPE "public"."enum_crops_season";
  DROP TYPE "public"."enum_crops_review_status";
  DROP TYPE "public"."enum_crops_status";
  DROP TYPE "public"."enum__crops_v_version_color";
  DROP TYPE "public"."enum__crops_v_version_season";
  DROP TYPE "public"."enum__crops_v_version_review_status";
  DROP TYPE "public"."enum__crops_v_version_status";
  DROP TYPE "public"."enum_people_review_status";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum__people_v_version_review_status";
  DROP TYPE "public"."enum__people_v_version_status";
  DROP TYPE "public"."enum_projects_roadmap_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_roadmap_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_stewardship_guides_practice";
  DROP TYPE "public"."enum_stewardship_guides_review_status";
  DROP TYPE "public"."enum_stewardship_guides_status";
  DROP TYPE "public"."enum__stewardship_guides_v_version_practice";
  DROP TYPE "public"."enum__stewardship_guides_v_version_review_status";
  DROP TYPE "public"."enum__stewardship_guides_v_version_status";
  DROP TYPE "public"."enum_recipes_consent_media_rights";
  DROP TYPE "public"."enum_recipes_consent_scope";
  DROP TYPE "public"."enum_recipes_consent_attribution";
  DROP TYPE "public"."enum_recipes_review_status";
  DROP TYPE "public"."enum_recipes_status";
  DROP TYPE "public"."enum__recipes_v_version_consent_media_rights";
  DROP TYPE "public"."enum__recipes_v_version_consent_scope";
  DROP TYPE "public"."enum__recipes_v_version_consent_attribution";
  DROP TYPE "public"."enum__recipes_v_version_review_status";
  DROP TYPE "public"."enum__recipes_v_version_status";
  DROP TYPE "public"."enum_stories_consent_media_rights";
  DROP TYPE "public"."enum_stories_consent_scope";
  DROP TYPE "public"."enum_stories_consent_attribution";
  DROP TYPE "public"."enum_stories_review_status";
  DROP TYPE "public"."enum_stories_status";
  DROP TYPE "public"."enum__stories_v_version_consent_media_rights";
  DROP TYPE "public"."enum__stories_v_version_consent_scope";
  DROP TYPE "public"."enum__stories_v_version_consent_attribution";
  DROP TYPE "public"."enum__stories_v_version_review_status";
  DROP TYPE "public"."enum__stories_v_version_status";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_category";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_subscribers_lists";
  DROP TYPE "public"."enum_volunteer_signups_status";
  DROP TYPE "public"."enum_knowledge_submissions_kind";
  DROP TYPE "public"."enum_knowledge_submissions_scope";
  DROP TYPE "public"."enum_knowledge_submissions_attribution";
  DROP TYPE "public"."enum_knowledge_submissions_status";
  DROP TYPE "public"."enum_producer_interest_status";
  DROP TYPE "public"."enum_event_registrations_status";
  DROP TYPE "public"."enum_producers_status";
  DROP TYPE "public"."enum_products_regulatory_flags";
  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_products_tax_class";
  DROP TYPE "public"."enum_products_fulfillment";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_home_page_headline";
  DROP TYPE "public"."enum_marketplace_settings_current_phase";`)
}
