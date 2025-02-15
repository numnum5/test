import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

interface Params {
  endpoint: string;
}


export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { endpoint } = params; // Capture dynamic part of the route (e.g., 'units', 'reviews')
  
  try {
    // Make the GET request to the backend API using the reusable API instance (axios)
    const response = await api.get(`/${endpoint}`);

    // Return the data as a JSON response
    return NextResponse.json(response.data);
  } catch (error) {
    // TypeScript handles errors better with proper typing
    if (error instanceof Error) {
      // Handle known errors and return a proper response
      return NextResponse.json(
        { error: `Failed to fetch ${endpoint} data from backend: ${error.message}` },
        { status: 500 }
      );
    } else {
      // If the error is something unknown, we catch it here.
      return NextResponse.json(
        { error: 'An unknown error occurred while fetching data' },
        { status: 500 }
      );
    }
  }
}
