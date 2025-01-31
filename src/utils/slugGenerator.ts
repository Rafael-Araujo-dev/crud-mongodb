import { Model } from 'mongoose';
import crypto from 'crypto';

export function generateSlug(title: string): string {
    let slug = title.replace(/[^\w\s-]/g, '').trim();
    
    slug = slug.toLowerCase().replace(/\s+/g, '-');
    slug = slug.replace(/-+/g, '-');

    return slug;
}

export async function generateUniqueSlug(model: Model<any>, title: string) {
    const baseSlug = generateSlug(title);

    let slug = baseSlug;
    let existingDocument = await model.findOne({ slug });

    if (existingDocument) {
        let attempts = 0;
        let hash = '';

        while (existingDocument && attempts < 5) {
            hash = crypto.randomBytes(6).toString('hex');
            slug = `${baseSlug}-${hash}`;
            existingDocument = await model.findOne({ slug });
            
            attempts++;
        }

        if (attempts >= 5) return false;
    }

    return slug;
}