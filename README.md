# Intersection_API
 #link: https://intersection-api-btbp.onrender.com
Intersections API
This is an Express-NodeJS application that provides an API for finding intersections between a linestring and a set of randomly spread lines on a plane. The API is implemented using the Node.js runtime and leverages the Turf.js library for mapping and geospatial calculations.

Features
1.Accepts a POST request with a linestring in GeoJSON format.
2.Implements header-based authentication for protecting the API.
3.Determines the intersections between the provided linestring and a set of randomly spread lines.
4.Returns the intersecting line IDs along with the corresponding points of intersection.
5.Handles error cases, such as invalid linestring, missing/malformed request body, and authentication failures.

Installation and Setup
Clone the repository or download the source code.
Install the required dependencies by running yarn install.
Configure the authentication token and other necessary settings in the code.
Start the application using yarn start.

API Usage
Endpoint: /intersections
Method: POST
Headers:
Authorization: YOUR_AUTH_TOKEN.
Content-Type: Set to application/json.
Request Body:
Provide the linestring in GeoJSON format as the linestring property of the request body.
{
  "linestring": {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [longitude1, latitude1],
        [longitude2, latitude2],
        [longitude3, latitude3],
        ...
      ]
    }
  }
}

The linestring should contain an array of coordinates representing the points of the linestring.
Response:
If there are no intersections, an empty array ([]) will be returned.
If there are intersections, an array of objects will be returned, where each object contains the intersecting line ID and the point of intersection in GeoJSON format.
In case of errors, appropriate error messages will be returned along with the corresponding HTTP status codes.
Example
To find intersections, send a POST request to the /intersections endpoint with a valid linestring in the request body.

# Intersection_API
