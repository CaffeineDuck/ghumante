export const parseIntoAddress = (address_components: []) => {
  var addressComponent: any = {
    home: ["street_number"],
    postal_code: ["postal_code"],
    street: [
      "route",
      "political",
      "sublocality_level_1",
      // "sublocality_level_2",
      // "sublocality_level_3",
      // "sublocality_level_4",
    ],
    region: ["political", "administrative_area_level_1"],
    city: [
      "administrative_area_level_2",
      "locality",
      "administrative_area_level_3",
      "administrative_area_level_4",
      ,
      "administrative_area_level_5",
    ],
    country: ["country"],
  };

  var address: any = {
    home: "",
    postal_code: "",
    street: "",
    region: "",
    city: "",
    country: "",
  };
  var formatedAddress: any = {
    home: "",
    postal_code: "",
    street: "",
    region: "",
    city: "",
    country: "",
  };
  address_components?.forEach((component: any) => {
    for (var item in addressComponent) {
      if (addressComponent[item].indexOf(component.types[0]) !== -1) {
        address[item] = component.long_name;
      }
    }
  });
  Object.keys(address)?.forEach((key: any) => {
    if (address[key] !== "") {
      formatedAddress[key] = address[key];
    }
  });
  const { home, postal_code, region, ...rest } = formatedAddress;
  return rest;
};

export const getAddressFromGeocode = async (lat: any, lng: any) => {
  try {
    let res: any = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    );
    res = await res.json();
    return res;
  } catch (e) {
    return [];
  }
};
