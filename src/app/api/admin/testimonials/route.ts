import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const db = await connectDB();
        if (!db) {
            return NextResponse.json({ testimonials: [] });
        }

        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ testimonials: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await request.json();
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const testimonial = new Testimonial(body);
        await testimonial.save();
        
        return NextResponse.json({ testimonial }, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
            { status: 500 }
        );
    }
}
