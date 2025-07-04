import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isUserAuthorizedToEdit } from '@/lib/auth';

export async function POST(
    request: Request,
    { params }: { params: { cityId: string; meetingId: string } }
) {
    // Check if user is authorized to edit this meeting
    const hasPermission = await isUserAuthorizedToEdit({ cityId: params.cityId });
    if (!hasPermission) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log('revalidating meeting', params.meetingId);

    // Revalidate the API route
    revalidatePath(`/api/cities/${params.cityId}/meetings/${params.meetingId}`);
    revalidatePath(`/${params.cityId}/${params.meetingId}`, 'layout');

    return NextResponse.json({ revalidated: true, now: Date.now() });
} 