import Component from '@/app/models/Component';
import dbConnect from '@/app/utils/mongo';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { componentCode } = await request.json();

  if (!componentCode) {
    return NextResponse.json({ message: 'Component code is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const component = new Component({ code: componentCode });
    await component.save();

    return NextResponse.json({ message: 'Component saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving component:', error);
    return NextResponse.json({ message: 'Error saving component' }, { status: 500 });
  }
}
