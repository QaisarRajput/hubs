import { NextResponse } from 'next/server';
import config from '../../../../config/site';

export function GET() {
  const line = `google.com, ${config.adsense.publisherId}, DIRECT, f08c47fec0942fa0`;
  return new NextResponse(line, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
