import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const db = await connectDB();
        if (!db) {
            return NextResponse.json({ portfolio: [] });
        }

        const portfolio = await Portfolio.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ portfolio: [] });
    }
}

export async function POST(request: NextRequest) {
    try {
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
        
        const portfolio = new Portfolio(body);
        await portfolio.save();
        
        return NextResponse.json({ portfolio }, { status: 201 });
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        return NextResponse.json(
            { error: 'Failed to create portfolio item' },
            { status: 500 }
        );
    }
}

