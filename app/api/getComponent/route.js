import Component from '@/app/models/Component';
import dbConnect from '@/app/utils/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const components = await Component.find().sort({ createdAt: -1 }); // Fetch all components and sort by createdAt descending

    if (!components || components.length === 0) {
      return NextResponse.json({ message: 'No components found' }, { status: 404 });
    }

    const componentCodes = components.map(component => component.code);

    return NextResponse.json({ componentCodes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json({ message: 'Error fetching components' }, { status: 500 });
  }
}
