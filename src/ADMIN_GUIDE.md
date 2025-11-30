# Admin Panel Guide

## Accessing the Admin Panel

Navigate to `/admin` to access the content management system.

## Admin Pages Overview

### 1. Dashboard (`/admin`)
- **Overview**: Central hub showing stats for all content types
- **Features**:
  - Content statistics (total blog posts, gallery images, achievements, testimonials, career events)
  - Recent blog posts preview
  - Recent gallery images preview
  - Quick action buttons to create new content
  - Reset to defaults button (caution: this will erase all custom data)

### 2. Blog Posts (`/admin/blog`)
- **Overview**: Manage blog posts and articles
- **Features**:
  - Create new blog posts with title, excerpt, full content, author, date
  - Add categories and tags for organization
  - Set featured posts (appear on homepage)
  - Publish/unpublish posts
  - Upload cover images
  - Search and filter by category
  - Edit and delete existing posts

### 3. Gallery (`/admin/gallery`)
- **Overview**: Manage gallery images
- **Features**:
  - Add images with titles and descriptions
  - Organize with categories and tags
  - Mark images as featured (appear on homepage)
  - Upload image URLs
  - Search and filter by category
  - Visual grid display
  - Edit and delete images

### 4. Achievements (`/admin/achievements`)
- **Overview**: Manage professional achievements and milestones
- **Features**:
  - Create achievements with title, description, and metrics
  - Select icon types (Trending Up, Award, Users, Graduation Cap)
  - Categorize by type (Professional, Community, Education)
  - Add year/time period
  - Set display order
  - Search and filter by category
  - Card-based display with icons

### 5. Testimonials (`/admin/testimonials`)
- **Overview**: Manage testimonials and reviews
- **Features**:
  - Add testimonials with name, role, company
  - Include full testimonial content
  - Upload profile images
  - Mark as featured (appear on homepage)
  - Set display order
  - Search functionality
  - List view with profile images

### 6. Career Timeline (`/admin/career`)
- **Overview**: Manage career history and milestones
- **Features**:
  - Add career events with year/period, title, company
  - Choose type (Professional, Education, Community)
  - Detailed descriptions
  - Set display order (chronological)
  - Search and filter by type
  - Timeline-style display with color-coded icons

## Common Features Across All Admin Pages

### Search & Filter
- Real-time search functionality
- Category/type filtering
- Responsive design for mobile and desktop

### Forms
- Easy-to-use forms with validation
- Clear labels and placeholders
- Required field indicators
- Cancel option to discard changes

### Actions
- **Edit**: Modify existing content
- **Delete**: Remove content (with confirmation)
- **Featured/Published**: Toggle visibility options
- **Reorder**: Change display order

## Data Persistence

All content is stored in browser `localStorage`, meaning:
- ✅ Changes persist across browser sessions
- ✅ No server required
- ✅ Instant updates
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will reset content

## Tips for Content Management

1. **Display Order**: Lower numbers appear first. Use increments of 10 (10, 20, 30) to make reordering easier later.

2. **Featured Content**: Only featured items appear on the homepage. Keep 3-4 featured items per type for best results.

3. **Published Status**: For blog posts, unpublished posts won't appear on the website but remain in the admin panel.

4. **Image URLs**: Use Unsplash or other image hosting services. Ensure URLs start with `https://`.

5. **Categories & Tags**: Be consistent with naming (e.g., "Leadership" not "leadership" or "LEADERSHIP").

6. **Backup Your Data**: Before using "Reset to Defaults", consider exporting your content from browser localStorage if needed.

## Content Best Practices

### Blog Posts
- Write clear, engaging titles (50-70 characters)
- Keep excerpts concise (150-200 characters)
- Use relevant categories and tags
- Add high-quality cover images

### Gallery Images
- Use descriptive titles
- Write meaningful descriptions
- Tag appropriately for easy filtering
- Choose high-resolution images

### Achievements
- Be specific with metrics
- Use action-oriented descriptions
- Choose appropriate icons
- Keep year information accurate

### Testimonials
- Get permission before publishing
- Use professional profile photos
- Quote accurately
- Include full name and credentials

### Career Timeline
- Order chronologically (most recent first)
- Be detailed in descriptions
- Include key achievements
- Update regularly

## Troubleshooting

**Q: My changes aren't showing on the website**
- A: Make sure "Published" or "Featured" is checked if applicable
- Try refreshing the main website page

**Q: I accidentally deleted something**
- A: Use the "Reset to Defaults" button on the dashboard to restore original content (note: this removes all custom content)

**Q: The order isn't right**
- A: Edit each item and adjust the "Display Order" field (lower numbers appear first)

**Q: Images aren't loading**
- A: Verify the image URL is correct and accessible
- Ensure URLs start with `https://`

## Navigation

Use the sidebar to navigate between different content types:
- Dashboard
- Blog Posts
- Gallery
- Achievements
- Testimonials
- Career Timeline

Click "Back to Website" to return to the public-facing site.

---

For questions or feature requests, contact the website administrator.
