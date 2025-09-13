import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        await connectDB();
        const service = await Service.findById(id);
        
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        
        return NextResponse.json({ service });
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        const body = await request.json();
        await connectDB();
        
        const service = await Service.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        
        return NextResponse.json({ service });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
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
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        await connectDB();
        
        const service = await Service.findByIdAndDelete(id);
        
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}
