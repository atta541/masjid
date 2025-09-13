import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { fallbackServices } from '@/lib/fallbackData';

export const GET = async () => {
    try {
        const db = await connectDB();
        
        if (!db) {
            // MongoDB not available, use fallback data
            return NextResponse.json({
                ServicesData: fallbackServices,
            });
        }
        
        const services = await Service.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json({
            ServicesData: services,
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        // Return fallback data if database connection fails
        return NextResponse.json({
            ServicesData: fallbackServices,
        });
    }
};