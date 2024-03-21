"use-client";
const BASE_URL = 'https://backend.nu-munchies.xyz/';

async function handleResponse(response:any) {
    const contentType = response.headers.get("content-type");

    let responseBody;
    if (contentType && contentType.includes("application/json")) {
        responseBody = await response.json();
    } else {
        responseBody = await response.text();
    }

    const standardizedResponse = {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: responseBody,
        error: undefined,
    };

    if (!response.ok) {
        standardizedResponse.error = responseBody.message || "An error occurred";
    }

    return standardizedResponse;
}

export async function get(endpoint:string, bearer:any = "") {
    return httpRequest('GET', endpoint, undefined, bearer);
}

export async function post(endpoint:string, data:any, bearer:any = "") {
    return httpRequest('POST', endpoint, data, bearer);
}

export async function put(endpoint:string, data:any, bearer:any = "") {
    return httpRequest('PUT', endpoint, data, bearer);
}

export async function del(endpoint:string, data:any, bearer:any = "") {
    return httpRequest('DELETE', endpoint, data, bearer);
}

interface HTTPHeaders {
    bearer?: string;
    contentType?: string;
}

async function httpRequest(method:string, endpoint:string, data:any, bearer: string) {

    const requestHeaders: HeadersInit = {};

    if (bearer) {
        requestHeaders["Authorization"] = `Bearer ${bearer}`;
    }

    if(method === 'PUT') {
        requestHeaders["Content-Type"] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: data ? data : undefined
    });
    return handleResponse(response);
}
