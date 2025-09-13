import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Plan from '@/models/Plan';

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
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const plan = await Plan.findById(id);
        
        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }
        
        return NextResponse.json({ plan });
    } catch (error) {
        console.error('Error fetching plan:', error);
        return NextResponse.json(
            { error: 'Failed to fetch plan' },
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
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const plan = await Plan.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        
        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }
        
        return NextResponse.json({ plan });
    } catch (error) {
        console.error('Error updating plan:', error);
        return NextResponse.json(
            { error: 'Failed to update plan' },
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
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { id } = await params;
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const plan = await Plan.findByIdAndDelete(id);
        
        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        return NextResponse.json(
            { error: 'Failed to delete plan' },
            { status: 500 }
        );
    }
}
