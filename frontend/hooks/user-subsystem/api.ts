"use-client";
const BASE_URL = 'http://localhost:8080/';

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
    console.log(bearer);
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

async function httpRequest(method:string, endpoint:string, data:any, bearer: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: bearer ? {"Authorization": `Bearer ${bearer}`} : {},
        body: data ? data : undefined
    });
    return handleResponse(response);
}