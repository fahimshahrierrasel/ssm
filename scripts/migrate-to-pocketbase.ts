/**
 * Firebase to PocketBase Migration Script
 *
 * This script migrates all data from Firebase Firestore to PocketBase.
 *
 * Prerequisites:
 * 1. PocketBase server running on http://127.0.0.1:8090
 * 2. PocketBase collections created (folders, tags, snippets)
 * 3. Firebase credentials configured in .env
 * 4. User authenticated in PocketBase
 *
 * Usage:
 *   npx ts-node scripts/migrate-to-pocketbase.ts
 *
 * Or to export data only:
 *   npx ts-node scripts/migrate-to-pocketbase.ts --export-only
 */

import FirebaseToPocketBaseMigration, { MigrationProgress } from '../src/data/migration';
import * as fs from 'fs';
import * as path from 'path';

const EXPORT_FILE = path.join(__dirname, '..', 'firebase-export.json');

function progressCallback(progress: MigrationProgress) {
  const percentage = progress.total > 0
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  console.log(`\n[${'='.repeat(percentage / 2)}${' '.repeat(50 - percentage / 2)}] ${percentage}%`);
  console.log(`Status: ${progress.status}`);

  if (progress.current > 0 && progress.total > 0) {
    console.log(`Progress: ${progress.current}/${progress.total}`);
  }

  if (progress.errors.length > 0) {
    console.error('\n⚠️  Errors encountered:');
    progress.errors.forEach((error, index) => {
      console.error(`  ${index + 1}. ${error}`);
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const exportOnly = args.includes('--export-only');

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  Firebase to PocketBase Migration Tool                ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const migration = new FirebaseToPocketBaseMigration(progressCallback);

  try {
    if (exportOnly) {
      console.log('🔄 Exporting data from Firebase...\n');

      const jsonData = await migration.exportToJSON();

      fs.writeFileSync(EXPORT_FILE, jsonData, 'utf-8');

      console.log('\n✅ Export completed successfully!');
      console.log(`📁 Data saved to: ${EXPORT_FILE}`);
      console.log('\nTo import this data to PocketBase, run:');
      console.log('  npx ts-node scripts/migrate-to-pocketbase.ts --import-only');

    } else if (args.includes('--import-only')) {
      console.log('🔄 Importing data to PocketBase...\n');

      if (!fs.existsSync(EXPORT_FILE)) {
        throw new Error(`Export file not found: ${EXPORT_FILE}`);
      }

      const jsonData = fs.readFileSync(EXPORT_FILE, 'utf-8');
      await migration.importFromJSON(jsonData);

      console.log('\n✅ Import completed successfully!');

    } else {
      console.log('🔄 Starting full migration from Firebase to PocketBase...\n');
      console.log('This will:');
      console.log('  1. Export all data from Firebase');
      console.log('  2. Import all data to PocketBase');
      console.log('  3. Save a backup to firebase-export.json\n');

      // Export first
      console.log('Step 1: Exporting from Firebase...\n');
      const jsonData = await migration.exportToJSON();
      fs.writeFileSync(EXPORT_FILE, jsonData, 'utf-8');
      console.log(`📁 Backup saved to: ${EXPORT_FILE}\n`);

      // Then import
      console.log('Step 2: Importing to PocketBase...\n');
      await migration.importFromJSON(jsonData);

      console.log('\n✅ Migration completed successfully!');
      console.log('📊 Summary:');

      const data = JSON.parse(jsonData);
      console.log(`  - Folders: ${data.folders?.length || 0}`);
      console.log(`  - Tags: ${data.tags?.length || 0}`);
      console.log(`  - Snippets: ${data.snippets?.length || 0}`);
    }

  } catch (error: any) {
    console.error('\n❌ Migration failed!');
    console.error('Error:', error.message);

    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }

    process.exit(1);
  }
}

main();
