import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

interface Params {
  endpoint: string;
}

// Define the Params interface to match the dynamic segments of the URL
interface Params {
  endpoint: string;
}

export async function GET(req: NextRequest, context: { params: Params }) {
  const { endpoint } = context.params; // Access the dynamic segment 'endpoint' directly from context.params
  
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