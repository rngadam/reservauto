# Shared car nearby notification webapp

## Goal

Create a SPA HTML/Javascript into a single HTML page with Javascript to query a shared car API and 

## API

The list of available vehicules for a branch can be fetched with the following URL:

https://www.reservauto.net/WCF/LSI/LSIBookingServiceV3.svc/GetAvailableVehicles?BranchID=1&LanguageID=2

result looks as follow (deleted additional entries in array):

```
{
  "d": {
    "Success": true,
    "Vehicles": [
      {
        "CarId": 2843,
        "CarVin": "JTDKDTB34F1585044",
        "CarPlate": "FKX3422",
        "CarModel": "Prius C",
        "CarNo": 3010,
        "Latitude": 46.837,
        "Longitude": -71.22094,
        "EnergyLevel": null,
        "LastUseDate": "2025-10-18T09:27:30",
        "LastUse": 1,
        "isPromo": false,
        "BoardComputerType": 3,
        "BookingStatus": 1,
        "CarBrand": "Toyota",
        "CarColor": "silver",
        "CarSeatNb": 5,
        "CarAccessories": [
          4,
          16,
          128,
          512,
          32768,
          262144,
          8388608,
          33554432,
          268435456
        ],
        "IsElectric": false,
        "VehiclePromotions": null,
        "CityID": 90
      }
    ]
  }
}
```

## Steps

* Get user location
* Configure range (default to 500m)
* Query API at regular intervals (30s)
* When a car is present, notify on screen and through desktop notification (single notification by car in query rnage)

## Permissions requested from the browser when running app

* Desktop notification
* Access location

## API queries

CORS is enabled on the API so cross-origins requests are restricted.

### Testing

Provide local nodejs server to serve the app and proxy requests to the upstream API

### Production

Configure an nginx reverse proxy on a Kubernetes cluster (aka LoadBalancer) to proxy requests to and responses from this URL through a domain name (api.reservauto.coderbunker.ca) with CORS changed to allow *.coderbunker.ca queries)

Configuration is to be done with a kubectl yaml configuration will be provided.

## Code

* javascript and HTML linting
*  unit testing
* github workflow to run the unit tests and linting on the code
