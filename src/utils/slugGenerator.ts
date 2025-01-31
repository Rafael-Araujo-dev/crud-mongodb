import Post from '../models/posts.model';
import crypto from 'crypto';

export function generateSlug(title: string): string {
    let slug = title.replace(/[^\w\s-]/g, '').trim();
    
    slug = slug.toLowerCase().replace(/\s+/g, '-');
    slug = slug.replace(/-+/g, '-');

    return slug;
}

export async function generateUniqueSlug(title: string) {
    const baseSlug = generateSlug(title);

    let slug = baseSlug;
    let existingPost = await Post.findOne({ slug });

    if (existingPost) {
        let attempts = 0;
        let hash = '';

        while (existingPost && attempts < 5) {
            hash = crypto.randomBytes(6).toString('hex');
            slug = `${baseSlug}-${hash}`;
            existingPost = await Post.findOne({ slug });
            
            attempts++;
        }

        if (attempts >= 5) return false;
    }

    return slug;
}