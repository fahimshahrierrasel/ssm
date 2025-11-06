# PocketBase Integration Guide

This document provides instructions for setting up and migrating from Firebase to PocketBase.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [PocketBase Installation](#pocketbase-installation)
3. [Database Schema](#database-schema)
4. [Environment Configuration](#environment-configuration)
5. [Migration from Firebase](#migration-from-firebase)
6. [Running the Application](#running-the-application)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PocketBase server (v0.20.0 or higher)

## PocketBase Installation

### Option 1: Download Pre-built Binary

1. Download PocketBase from [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
2. Extract the archive
3. Run the PocketBase server:

```bash
./pocketbase serve
```

The server will start on `http://127.0.0.1:8090` by default.

### Option 2: Using Docker

```bash
docker run -d \
  --name pocketbase \
  -p 8090:8090 \
  -v $(pwd)/pb_data:/pb_data \
  ghcr.io/muchobien/pocketbase:latest \
  serve --http="0.0.0.0:8090"
```

## Database Schema

After starting PocketBase, access the Admin UI at `http://127.0.0.1:8090/_/` and create the following collections:

### 1. Users Collection
This collection is created by default. No additional setup needed.

### 2. Folders Collection

- **Collection name:** `folders`
- **Type:** Base collection

Fields:
- `name` (Text, required)
- `created_at` (Number)
- `updated_at` (Number)
- `firebase_id` (Text, optional) - For migration tracking

API Rules:
- List/View: `@request.auth.id != ""`
- Create: `@request.auth.id != ""`
- Update: `@request.auth.id != ""`
- Delete: `@request.auth.id != ""`

### 3. Tags Collection

- **Collection name:** `tags`
- **Type:** Base collection

Fields:
- `name` (Text, required)
- `created_at` (Number)
- `updated_at` (Number)
- `firebase_id` (Text, optional) - For migration tracking

API Rules:
- List/View: `@request.auth.id != ""`
- Create: `@request.auth.id != ""`
- Update: `@request.auth.id != ""`
- Delete: `@request.auth.id != ""`

### 4. Snippets Collection

- **Collection name:** `snippets`
- **Type:** Base collection

Fields:
- `name` (Text, required)
- `snippet` (Text, required)
- `language` (Text, required)
- `folder` (Text, nullable)
- `tags` (JSON, nullable)
- `is_favourite` (Bool, default: false)
- `created_at` (Number)
- `updated_at` (Number)
- `deleted_at` (Number, nullable)
- `firebase_id` (Text, optional) - For migration tracking

API Rules:
- List/View: `@request.auth.id != ""`
- Create: `@request.auth.id != ""`
- Update: `@request.auth.id != ""`
- Delete: `@request.auth.id != ""`

## Environment Configuration

Create a `.env` file in the root directory:

```env
# PocketBase Configuration
VITE_POCKETBASE_URL=http://127.0.0.1:8090

# Optional: Keep Firebase config for migration
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

## Migration from Firebase

### Using the Migration Utility

The application includes a built-in migration utility to transfer data from Firebase to PocketBase.

1. Ensure both Firebase and PocketBase are configured in your `.env` file
2. Make sure PocketBase is running and collections are created
3. Create a user account in PocketBase admin panel
4. Use the migration utility:

```typescript
import { FirebaseToPocketBaseMigration } from './src/data/migration';

// With progress callback
const migration = new FirebaseToPocketBaseMigration((progress) => {
  console.log(`${progress.status} - ${progress.current}/${progress.total}`);
  if (progress.errors.length > 0) {
    console.error('Errors:', progress.errors);
  }
});

// Run full migration
await migration.migrate();

// Or export to JSON for backup
const jsonData = await migration.exportToJSON();
console.log(jsonData);

// Or import from JSON
await migration.importFromJSON(jsonData);
```

### Manual Migration Steps

1. **Export from Firebase:**
   - Navigate to Firebase Console
   - Export your Firestore data
   - Save as JSON

2. **Import to PocketBase:**
   - Use the PocketBase Admin UI
   - Or use the migration utility's `importFromJSON` method

### Migration Script Example

Create a file `scripts/migrate.ts`:

```typescript
import { FirebaseToPocketBaseMigration } from '../src/data/migration';

async function runMigration() {
  console.log('Starting migration from Firebase to PocketBase...');

  const migration = new FirebaseToPocketBaseMigration((progress) => {
    console.log(`Progress: ${progress.current}/${progress.total}`);
    console.log(`Status: ${progress.status}`);

    if (progress.errors.length > 0) {
      console.error('Errors encountered:');
      progress.errors.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error}`);
      });
    }
  });

  try {
    await migration.migrate();
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
```

Run the migration:

```bash
npx ts-node scripts/migrate.ts
```

## Running the Application

1. **Start PocketBase Server:**

```bash
./pocketbase serve
```

2. **Create Admin User:**
   - Visit `http://127.0.0.1:8090/_/`
   - Create an admin account
   - Create the required collections (folders, tags, snippets)

3. **Create App User:**
   - In PocketBase Admin UI, go to Users collection
   - Create a user account for the application

4. **Start the Application:**

```bash
npm install
npm run dev
```

5. **Login:**
   - Use the credentials you created in PocketBase

## Differences from Firebase

### Authentication

**Firebase:**
```typescript
await signInWithEmailAndPassword(firebaseApp.auth, email, password);
await signOut(firebaseApp.auth);
```

**PocketBase:**
```typescript
await pb.collection('users').authWithPassword(email, password);
pb.authStore.clear();
```

### Data Operations

**Firebase:**
```typescript
const docRef = await addDoc(collection(db, "snippets"), data);
```

**PocketBase:**
```typescript
const record = await pb.collection('snippets').create(data);
```

### Real-time Updates

PocketBase supports real-time subscriptions:

```typescript
pb.collection('snippets').subscribe('*', (e) => {
  console.log('Record changed:', e.record);
});
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure PocketBase is configured to allow requests from your application:

```bash
./pocketbase serve --origins="http://localhost:5173"
```

### Authentication Errors

- Ensure you've created a user in PocketBase
- Check that the PocketBase URL in `.env` is correct
- Verify that API rules are set correctly in PocketBase Admin UI

### Migration Errors

- Check that Firebase credentials are still valid
- Ensure PocketBase collections are created before migration
- Verify network connectivity to both Firebase and PocketBase

## Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [PocketBase API Rules](https://pocketbase.io/docs/api-rules-and-filters/)

## Support

For issues specific to this integration, please open an issue on the project repository.
