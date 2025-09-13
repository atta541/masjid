import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Technology from '@/models/Technology';
import Portfolio from '@/models/Portfolio';
import Plan from '@/models/Plan';
import FAQ from '@/models/FAQ';
import Testimonial from '@/models/Testimonial';
import Partner from '@/models/Partner';
import { 
    fallbackTechnologies, 
    fallbackPortfolio, 
    fallbackPlans, 
    fallbackFAQs, 
    fallbackTestimonials, 
    fallbackPartners 
} from '@/lib/fallbackData';

const DocText = [
    {
        icon: "tabler:brand-github",
        title: "Github Sync",
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
        icon: "tabler:crown",
        title: "Branding",
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
        icon: "tabler:message-circle",
        title: "Comments",
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
];

export const GET = async () => {
    try {
        const db = await connectDB();
        
        if (!db) {
            // MongoDB not available, use fallback data
            const monthlyPlans = fallbackPlans.filter(plan => !plan.isYearly);
            const yearlyPlans = fallbackPlans.filter(plan => plan.isYearly);
            
            return NextResponse.json({
                Technologies: fallbackTechnologies,
                DocText,
                Portfolio: fallbackPortfolio,
                MonthlyPlans: monthlyPlans,
                yearlyPlans: yearlyPlans,
                Questions: fallbackFAQs,
                Testimonial: fallbackTestimonials,
                partners: fallbackPartners,
            });
        }
        
        const [technologies, portfolio, plans, faqs, testimonials, partners] = await Promise.all([
            Technology.find({}).sort({ createdAt: -1 }),
            Portfolio.find({}).sort({ createdAt: -1 }),
            Plan.find({}).sort({ createdAt: -1 }),
            FAQ.find({}).sort({ createdAt: -1 }),
            Testimonial.find({}).sort({ createdAt: -1 }),
            Partner.find({}).sort({ createdAt: -1 }),
        ]);

        const monthlyPlans = plans.filter(plan => !plan.isYearly);
        const yearlyPlans = plans.filter(plan => plan.isYearly);

        return NextResponse.json({
            Technologies: technologies,
            DocText,
            Portfolio: portfolio,
            MonthlyPlans: monthlyPlans,
            yearlyPlans: yearlyPlans,
            Questions: faqs,
            Testimonial: testimonials,
            partners: partners,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return fallback data if database connection fails
        const monthlyPlans = fallbackPlans.filter(plan => !plan.isYearly);
        const yearlyPlans = fallbackPlans.filter(plan => plan.isYearly);
        
        return NextResponse.json({
            Technologies: fallbackTechnologies,
            DocText,
            Portfolio: fallbackPortfolio,
            MonthlyPlans: monthlyPlans,
            yearlyPlans: yearlyPlans,
            Questions: fallbackFAQs,
            Testimonial: fallbackTestimonials,
            partners: fallbackPartners,
        });
    }
};