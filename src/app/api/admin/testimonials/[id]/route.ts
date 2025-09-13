import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        const body = await request.json();
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const testimonial = await Testimonial.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        
        return NextResponse.json({ testimonial });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to update testimonial' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        const session = await getServerSession();
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const testimonial = await Testimonial.findByIdAndDelete(id);
        
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}
