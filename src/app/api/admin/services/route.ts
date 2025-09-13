import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        await connectDB();
        const services = await Service.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({ services });
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
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
        await connectDB();
        
        const service = new Service(body);
        await service.save();
        
        return NextResponse.json({ service }, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}
