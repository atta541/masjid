// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import cloudinary from '@/lib/cloudinary';

// export async function POST(request: NextRequest) {
//     try {
//         // For now, allow access to admin routes - we'll handle auth in the frontend
//         // const session = await getServerSession();
//         // if (!session || session.user?.role !== 'admin') {
//         //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//         // }

//         const formData = await request.formData();
//         const file = formData.get('file') as File;
        
//         if (!file) {
//             return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const result = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream(
//                 {
//                     resource_type: 'auto',
//                     folder: 'izafa',
//                 },
//                 (error, result) => {
//                     if (error) {
//                         console.error('Cloudinary upload error:', error);
//                         reject(error);
//                     } else {
//                         resolve(result);
//                     }
//                 }
//             ).end(buffer);
//         });

//         return NextResponse.json({ 
//             url: (result as any).secure_url,
//             public_id: (result as any).public_id 
//         });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         return NextResponse.json(
//             { error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` },
//             { status: 500 }
//         );
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         // For now, allow access to admin routes - we'll handle auth in the frontend
//         // const session = await getServerSession();
//         // if (!session || session.user?.role !== 'admin') {
//         //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//         // }

//         const { public_id } = await request.json();
        
//         if (!public_id) {
//             return NextResponse.json({ error: 'No public_id provided' }, { status: 400 });
//         }

//         await cloudinary.uploader.destroy(public_id);
        
//         return NextResponse.json({ message: 'File deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete file' },
//             { status: 500 }
//         );
//     }
// }


// // app/api/admin/upload/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import cloudinary from '@/lib/cloudinary';

// export async function POST(request: NextRequest) {
//     try {
//         // Check if Cloudinary is configured
//         if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//             console.error('Cloudinary environment variables not set:', {
//                 cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
//                 api_key: !!process.env.CLOUDINARY_API_KEY,
//                 api_secret: !!process.env.CLOUDINARY_API_SECRET,
//             });
//             return NextResponse.json({ 
//                 error: 'Cloudinary configuration missing. Please check environment variables.' 
//             }, { status: 500 });
//         }

//         // For now, allow access to admin routes - we'll handle auth in the frontend
//         // const session = await getServerSession();
//         // if (!session || session.user?.role !== 'admin') {
//         //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//         // }

//         const formData = await request.formData();
//         const file = formData.get('file') as File;
        
//         if (!file) {
//             return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//         }

//         // Validate file type
//         if (!file.type.startsWith('image/')) {
//             return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
//         }

//         // Validate file size (5MB limit)
//         if (file.size > 5 * 1024 * 1024) {
//             return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         console.log('Uploading to Cloudinary...');
        
//         const result = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream(
//                 {
//                     resource_type: 'auto',
//                     folder: 'izafa',
//                     quality: 'auto:good',
//                     fetch_format: 'auto',
//                 },
//                 (error, result) => {
//                     if (error) {
//                         console.error('Cloudinary upload error:', error);
//                         reject(error);
//                     } else {
//                         console.log('Cloudinary upload successful:', result?.public_id);
//                         resolve(result);
//                     }
//                 }
//             ).end(buffer);
//         });

//         const uploadResult = result as any;
        
//         return NextResponse.json({ 
//             url: uploadResult.secure_url,
//             public_id: uploadResult.public_id,
//             message: 'Upload successful'
//         });
//     } catch (error) {
//         console.error('Error uploading file:', error);
        
//         // More specific error messages
//         let errorMessage = 'Failed to upload file';
//         if (error instanceof Error) {
//             errorMessage = error.message;
//         }
        
//         return NextResponse.json(
//             { error: errorMessage },
//             { status: 500 }
//         );
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         // Check if Cloudinary is configured
//         if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//             return NextResponse.json({ 
//                 error: 'Cloudinary configuration missing. Please check environment variables.' 
//             }, { status: 500 });
//         }

//         // For now, allow access to admin routes - we'll handle auth in the frontend
//         // const session = await getServerSession();
//         // if (!session || session.user?.role !== 'admin') {
//         //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//         // }

//         const { public_id } = await request.json();
        
//         if (!public_id) {
//             return NextResponse.json({ error: 'No public_id provided' }, { status: 400 });
//         }

//         console.log('Deleting from Cloudinary:', public_id);
        
//         const result = await cloudinary.uploader.destroy(public_id);
        
//         console.log('Cloudinary deletion result:', result);
        
//         return NextResponse.json({ 
//             message: 'File deleted successfully',
//             result 
//         });
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete file' },
//             { status: 500 }
//         );
//     }
// }

// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Configure Cloudinary with direct credentials
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "izafa",
          quality: "auto:good",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const uploadResult = result as any;

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      message: "Upload successful",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: "No public_id provided" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({
      message: "File deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
