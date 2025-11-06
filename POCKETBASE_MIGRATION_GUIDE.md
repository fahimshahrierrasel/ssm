# Quick Start: PocketBase Migration

This is a quick reference guide for migrating from Firebase to PocketBase. For detailed documentation, see [POCKETBASE_SETUP.md](./POCKETBASE_SETUP.md).

## Quick Setup (5 minutes)

### 1. Install and Start PocketBase

Download PocketBase:
```bash
# For Linux/Mac
wget https://github.com/pocketbase/pocketbase/releases/download/v0.20.0/pocketbase_0.20.0_linux_amd64.zip
unzip pocketbase_0.20.0_linux_amd64.zip
./pocketbase serve
```

Or use Docker:
```bash
docker run -d --name pocketbase -p 8090:8090 -v $(pwd)/pb_data:/pb_data ghcr.io/muchobien/pocketbase:latest serve --http="0.0.0.0:8090"
```

### 2. Setup PocketBase Collections

1. Open [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)
2. Create admin account
3. Create these collections with the following schema:

**folders:**
- name (Text, required)
- created_at (Number)
- updated_at (Number)

**tags:**
- name (Text, required)
- created_at (Number)
- updated_at (Number)

**snippets:**
- name (Text, required)
- snippet (Text, required)
- language (Text, required)
- folder (Text, nullable)
- tags (JSON, nullable)
- is_favourite (Bool, default: false)
- created_at (Number)
- updated_at (Number)
- deleted_at (Number, nullable)

4. Set API Rules for all collections:
   - List/View/Create/Update/Delete: `@request.auth.id != ""`

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env and set:
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

### 4. Create User Account

In PocketBase Admin UI:
1. Go to Users collection
2. Click "New record"
3. Create a user with email and password

### 5. Run Migration (Optional)

If you have existing Firebase data:

```bash
# Install dependencies
npm install

# Export Firebase data and import to PocketBase
npm run migrate

# Or just export Firebase data to JSON
npm run migrate:export

# Or import from existing JSON
npm run migrate:import
```

### 6. Start Application

```bash
npm run dev
```

Login with the PocketBase user credentials you created!

## Key Differences

### Authentication
```typescript
// Firebase
await signInWithEmailAndPassword(auth, email, password);

// PocketBase
await pb.collection('users').authWithPassword(email, password);
```

### Data Operations
```typescript
// Firebase
const docRef = await addDoc(collection(db, "snippets"), data);

// PocketBase
const record = await pb.collection('snippets').create(data);
```

### Logout
```typescript
// Firebase
await signOut(auth);

// PocketBase
pb.authStore.clear();
```

## Migration Scripts

**Full Migration:**
```bash
npm run migrate
```

**Export Only (backup Firebase data):**
```bash
npm run migrate:export
# Creates firebase-export.json
```

**Import Only (restore to PocketBase):**
```bash
npm run migrate:import
# Uses firebase-export.json
```

## Troubleshooting

**Can't connect to PocketBase:**
- Ensure PocketBase is running: `./pocketbase serve`
- Check VITE_POCKETBASE_URL in .env

**Authentication fails:**
- Make sure you created a user in PocketBase Admin UI
- Check that API rules are set correctly

**Migration fails:**
- Ensure Firebase credentials are correct in .env
- Verify PocketBase collections are created
- Check that you're authenticated in PocketBase

## Support

For detailed documentation, see [POCKETBASE_SETUP.md](./POCKETBASE_SETUP.md)

For issues, check:
1. PocketBase logs: `tail -f pb_data/logs/*`
2. Browser console for errors
3. Network tab in DevTools
