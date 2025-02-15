import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

// Define the Params interface to match the dynamic segments of the URL

export async function GET(req: NextRequest) {

  const endpoint = req.nextUrl.pathname.split('/').pop(); // Get the dynamic part of the path (e.g., 'units', 'reviews')
  // console.log(endpoint);
  if (!endpoint) {
    return NextResponse.json(
      { error: 'Endpoint not provided' },
      { status: 400 }
    );
  }
  
  try {
    // Make the GET request to the backend API using the reusable API instance (axios)
    const response = await api.get(`/${endpoint}`);

    // Return the data as a JSON response
    return NextResponse.json(response.data);
  } catch (error) {
    // Properly handle errors
    if (error instanceof Error) {
      // Return the error message from the backend as part of the response
      return NextResponse.json(
        { error: `Failed to fetch ${endpoint} data from backend: ${error.message}` },
        { status: 500 }
      );
    } else {
      // Return a generic error for unknown error types
      return NextResponse.json(
        { error: 'An unknown error occurred while fetching data' },
        { status: 500 }
      );
    }
  }
}