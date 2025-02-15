import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

interface Params {
  endpoint: string;
}

export async function GET(req : NextRequest, { params } : {params : Params}) {
  const { endpoint } = params; // Capture dynamic part of the route (e.g., 'units', 'reviews')
  try {
    // Make the GET request to the backend API
    const response = await api.get(`/${endpoint}`);
    // Return the data as a JSON response
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle errors and return a proper response
    return NextResponse.json(
      { error: `Failed to fetch ${endpoint} data from backend` },
      { status: 500 }
    );
  }
}

