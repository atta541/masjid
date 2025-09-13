import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

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
        
        const portfolio = await Portfolio.findById(id);
        
        if (!portfolio) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio item' },
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
        
        const portfolio = await Portfolio.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        
        if (!portfolio) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to update portfolio item' },
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
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        const portfolio = await Portfolio.findByIdAndDelete(id);
        
        if (!portfolio) {
            return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Portfolio item deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to delete portfolio item' },
            { status: 500 }
        );
    }
}

