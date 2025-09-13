import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Plan from '@/models/Plan';

export async function GET() {
    try {
        // For now, allow access to admin routes - we'll handle auth in the frontend
        // const session = await getServerSession();
        // if (!session || session.user?.role !== 'admin') {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const db = await connectDB();
        if (!db) {
            return NextResponse.json({ plans: [] });
        }

        const plans = await Plan.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({ plans });
    } catch (error) {
        console.error('Error fetching plans:', error);
        return NextResponse.json({ plans: [] });
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
        console.log('Received data:', body);
        
        const db = await connectDB();
        
        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }
        
        // Validate required fields
        if (!body.projectName || !body.description || !body.totalAmount || !body.image || !body.category) {
            console.log('Missing required fields:', {
                projectName: !!body.projectName,
                description: !!body.description,
                totalAmount: !!body.totalAmount,
                image: !!body.image,
                category: !!body.category
            });
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        console.log('Creating plan with data:', body);
        const plan = new Plan(body);
        await plan.save();
        console.log('Plan created successfully:', plan);
        
        return NextResponse.json({ plan }, { status: 201 });
    } catch (error) {
        console.error('Error creating plan:', error);
        return NextResponse.json(
            { error: 'Failed to create plan' },
            { status: 500 }
        );
    }
}
