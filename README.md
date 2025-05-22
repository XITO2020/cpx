# Conspix

A streaming platform with cryptocurrency integration.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Update values for your local environment

3. Initialize database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Start development server:
```bash
npm run dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Project Structure

- `/components` - React components
- `/pages` - Next.js pages and API routes
- `/public` - Static assets
  - `/casino` - Casino game assets
  - `/img` - Images
  - `/sounds` - Sound effects
  - `/videos` - Video content
- `/styles` - SCSS styles
- `/lib` - Utility functions and configurations
- `/stores` - Zustand state management
- `/prisma` - Database schema and migrations

## Integration with naim.systems

The platform integrates with naim.systems for cryptocurrency functionality:
- TabZ wallet integration
- Cross-platform authentication
- Shared user data

## Adding Content

1. Create required directories:
```
mkdir -p public/{casino,img,sounds,videos,thumbnails}
```

2. Add your media files to appropriate directories

3. Update database with content metadata using Prisma

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Authentication callback URL
- `NEXTAUTH_SECRET` - Session encryption key
- `NAIM_API_URL` - naim.systems API endpoint
- `NAIM_API_KEY` - API authentication key