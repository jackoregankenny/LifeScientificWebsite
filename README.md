# Life Scientific Website

A Next.js website integrated with Storyblok CMS for content management.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Storyblok account and space

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd lswebsite
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_preview_token
STORYBLOK_CLIENT_ID=your_client_id
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Access the Visual Editor (Two Methods):

#### Method 1: HTTPS Proxy (Recommended)
```bash
# Install mkcert for creating a valid certificate (Mac OS):
brew install mkcert
mkcert -install
mkcert localhost

# Install and run the proxy
npm install -g local-ssl-proxy
local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
```
Then access your site through Storyblok's visual editor.

#### Method 2: Static Editor Page
Create `editor.html` in the public directory:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Storyblok Admin</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript">
            STORYBLOK_PREVIEW_URL = 'http://localhost:3000/'
        </script>
        <script src="https://app.storyblok.com/f/app-latest.js" type="text/javascript"></script>
    </body>
</html>
```

## 📝 Content Management

### Page Structure

The website uses a component-based structure in Storyblok:

- `Page`: Root component for full pages
- `Section`: Container for content blocks
- `Grid`: Flexible grid layout system
- `Hero`: Hero section with background image
- `ProductCategories`: Product category listing
- `CategoryCard`: Individual category card
- `Product`: Product detail component

### Creating New Pages

1. In Storyblok:
   - Go to Content > Create New
   - Choose 'Page' as the content type
   - Set the slug (URL path)
   - Add components using the visual editor

2. Page Types:
   - Regular pages: Use the catch-all route (`[...slug]`)
   - Product pages: Use the products route (`products/[slug]`)
   - Landing page: Uses the 'landing' slug

### Component Usage

#### Page Component
```typescript
// Basic page structure
{
  content: {
    body: [
      // Add sections, grids, etc.
    ]
  }
}
```

#### Section Component
```typescript
// Section with title and content
{
  title: "Section Title",
  subtitle: "Optional subtitle",
  style: "default | highlight | dark",
  content: [
    // Add other components
  ]
}
```

#### Grid Component
```typescript
// Grid layout
{
  columns: "2" | "3" | "4",
  items: [
    // Add grid items
  ]
}
```

### 🌐 Internationalization

1. Setting up languages in Storyblok:
   - Go to Settings > Languages
   - Add new languages
   - Set the default language

2. Creating translations:
   - In your story, click "Translate"
   - Choose the target language
   - Translate the content
   - Publish each language version

3. Accessing translations in code:
```typescript
// Example: Fetching translated content
const { data } = await sbApi.get(`cdn/stories/${slug}`, {
  version: 'draft',
  language: 'fr' // or other language code
});
```

## 🎨 Styling

### Theme Customization

1. Colors and Typography:
   - Edit `tailwind.config.js` for theme settings
   - Use Tailwind CSS classes in components
   - Dark mode support included

2. Layout Components:
   - `Layout.tsx`: Main layout wrapper
   - `ClientLayout.tsx`: Client-side Storyblok initialization
   - Add navigation and footer in Layout component

### Adding Navigation

1. Create a new component in `src/components`:
```typescript
// components/Navigation.tsx
export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Add your navigation items */}
        </div>
      </div>
    </nav>
  );
}
```

2. Add to Layout:
```typescript
// components/Layout.tsx
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      {/* Add Footer */}
    </>
  );
}
```

## 🔧 Advanced Configuration

### API Routes

- Product API: `/api/products`
- Category API: `/api/categories`
- Custom endpoints: Add in `src/app/api`

### Environment Variables

```env
# Development
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_preview_token
STORYBLOK_CLIENT_ID=your_client_id

# Production
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_public_token
```

### Performance Optimization

1. Image Optimization:
   - Use Next.js Image component
   - Configure in `next.config.js`

2. Caching:
   - Configure Storyblok cache
   - Use ISR when possible

## 📚 Resources

- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
