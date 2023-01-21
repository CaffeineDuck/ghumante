import logging
import requests
from googlemaps import Client
import typing as ty
import requests
import json


class Location(ty.TypedDict):

    business_status: str
    address: str

    name: str

    rating: float

    latitude: float
    longitude: float


class GoogleMapsSeederClient:
    def __init__(self, api_key: str, logger=logging.Logger(__name__)):
        self._client = Client(key=api_key)
        self.logger = logger

    def _parse_image(
        self,
        photo_reference: str,
        width: int,
        height: int,
    ) -> ty.Generator[bytes, None, None]:

        image = self._client.places_photo(
            photo_reference=photo_reference, max_width=width, max_height=height
        )
        return image

    def save_image(self, photo: ty.Generator[bytes, None, None], location: str) -> None:

        with open(f"{location}", "wb") as f:
            for chunk in photo:
                f.write(chunk)

    def find_and_save_images(self, location: str, page_token: str = None):

        res = self._client.places(location, page_token=page_token)
        if res["status"] != "OK":
            raise Exception("Google Maps API error.")

        places = res["results"]

        results: list[Location] = []

        for place in places:

            try:
                image_ref = place["photos"][0]
            except:
                self.logger.warning(
                    f"Could not find image for {place['name']}. Skipping for now."
                )
                continue

            image = self._parse_image(
                image_ref["photo_reference"], image_ref["width"], image_ref["height"]
            )

            image_name_normalized = place["name"].replace(" ", "_") + ".jpg"

            self.save_image(image, image_name_normalized)

            result = Location(
                address=place["formatted_address"],
                name=place["name"],
                latitude=place["geometry"]["location"]["lat"],
                longitude=place["geometry"]["location"]["lng"],
                image_path=f"{image_name_normalized}",
            )

            self.logger.warn(f"Found place: {result}")
            request_json = {
                "name": result["name"],
                "geolocation": json.dumps(
                    {
                        "type": "Point",
                        "coordinates": [result["longitude"], result["latitude"]],
                    }
                ),
                "details": f"Description for {result['name']}",
                "location_name": result["address"],
                "room_available": True,
                "category": 1,
            }

            response = requests.post(
                "http://localhost:8000/api/destination/",
                data=request_json,
                files={"photo": open(image_name_normalized, "rb")},
            )
            print(response.text)

        # return results, res["next_page_token"]
