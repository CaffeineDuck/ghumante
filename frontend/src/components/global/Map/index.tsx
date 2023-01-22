import React, { useCallback, useEffect, useRef, useState } from "react";
import { Spinner, Tooltip, useColorModeValue } from "@chakra-ui/react";
import {
  Marker,
  GoogleMap,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import {
  Box,
  Text,
  InputGroup,
  Input,
  Button,
  useToast,
  UnorderedList,
  InputLeftElement,
  InputRightElement,
  ListItem,
} from "@chakra-ui/react";
import { Combobox, ComboboxInput, ComboboxList } from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { getAddressFromGeocode, parseIntoAddress } from "@/utils/map";
import { Icon } from "@iconify/react";

export type MapProps = {
  height: string;
  width: string;
  searchBoxFromTop?: string;
  searchReadOnly?: boolean;
  setAddress?: any;
  askCurrentLocation?: boolean;
  setCoOrdinates?: (coOrdinates: CoOrdinateInterface) => void;
};
const Map: React.FC<MapProps> = ({
  height,
  width,
  searchBoxFromTop,
  searchReadOnly,
  setAddress,
  askCurrentLocation,
  setCoOrdinates,
}) => {
  const [marker, setMarker] = useState<any>({});
  const [libraries] = useState<any>(["places"]);
  const toast = useToast();
  const [center, setCenter] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries,
  });
  const mapContainerStyle = {
    height,
    width,
  };
  const fetchLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({
            lat,
            lng,
          });
          setMarker({
            lat,
            lng,
            time: new Date(),
          });
          setCoOrdinates && setCoOrdinates({ lat, long: lng });
          const res = await getAddressFromGeocode(lat, lng);
          if (res) {
            setValue(res?.results[0]?.formatted_address, false);
            setAddress && setAddress(res?.results[0]?.formatted_address);
            clearSuggestions();
          }
        },
        (e) => {}
      );
    } else {
      return toast({
        isClosable: true,
        description: "Geolocation is not supported by this browser.",
        title: "Error",
        status: "error",
        position: "top",
        variant: "subtle",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options = {
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
          {
            hue: "#ff0000",
          },
        ],
      },
      {
        featureType: "transit.station.bus",
        stylers: [{ visibility: "of" }],
      },
    ],
    zoomControl: true,
    disableDefaultUI: true,
  };
  const mapRef = useRef();

  const {
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    initOnMount: false,
    requestOptions: {
      componentRestrictions: {
        country: "np",
      },
    },
  });
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = useCallback(async (e: any) => {
    // setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() });
    setCoOrdinates &&
      setCoOrdinates({ lat: e.latLng.lat(), long: e.latLng.lng() });
    const res = await getAddressFromGeocode(e.latLng.lat(), e.latLng.lng());
    if (res) {
      setValue(res?.results[0]?.formatted_address, false);
      setAddress && setAddress(res?.results[0]?.formatted_address);
      clearSuggestions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isLoaded && askCurrentLocation) {
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, askCurrentLocation]);
  if (!isLoaded) {
    return (
      <Box p="80px" textAlign="center">
        <Spinner size="lg" color="primary" />
      </Box>
    );
  }
  if (loadError) {
    return (
      <Box p="80px">
        <Text fontSize="16px">Error Loading maps...</Text>
      </Box>
    );
  }
  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = (val: any): void => {
    setValue(val, false);
    setAddress && setAddress(val);
    getGeocode({ address: val })
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        setCenter({ lat, lng });
        setMarker({ lat, lng, time: new Date() });
        setCoOrdinates && setCoOrdinates({ lat, long: lng });
      })
      .catch((error) => {
        toast({
          isClosable: true,
          description: "Failed to redirect to your location.",
          title: "Error",
          status: "error",
        });
      });
    clearSuggestions();
  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(
      ({
        place_id,
        description,
        structured_formatting: { main_text, secondary_text },
      }: any) => (
        <ListItem
          py="8px"
          px="20px"
          onClick={() => handleSelect(description)}
          key={place_id}
          value={description}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          display="flex"
          alignItems="center"
          gridGap="8px"
        >
          <Box w="20px" h="fit-content">
            <Icon icon="ph:map-pin-fill" fontSize="15px" color="#aaaaaa" />
          </Box>
          <Box overflow="hidden">
            <Text fontSize="16px" color="primary" as="span" fontWeight="500">
              {main_text}
            </Text>{" "}
            <Text fontSize="16px" as="span" color="#555555" fontWeight="400">
              {secondary_text}
            </Text>
          </Box>
        </ListItem>
      )
    );

    return <>{suggestions}</>;
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={center}
      options={options}
      onClick={handleClick}
      onLoad={onMapLoad}
    >
      {marker?.lng && marker?.lat && (
        <Marker position={{ lat: marker?.lat, lng: marker.lng }} />
      )}
      <Box
        h="fit-content"
        w="full"
        pt={searchBoxFromTop ? searchBoxFromTop : "15px"}
        display="flex"
        justifyContent="center"
      >
        <Combobox
          style={{ maxWidth: "600px", width: "90%", position: "relative" }}
        >
          <InputGroup>
            <InputLeftElement>
              {searchReadOnly === true ? (
                <Icon icon="ph:map-pin-fill" color="#555555" fontSize="18px" />
              ) : (
                <Icon
                  icon="material-symbols:search"
                  fontSize="18px"
                  color="var(--chakra-colors-primary)"
                />
              )}
            </InputLeftElement>
            <Input
              readOnly={searchReadOnly === true}
              as={ComboboxInput}
              value={value}
              onChange={handleInput}
              focusBorderColor="primary"
              borderColor="#bbbbbb"
              color="#000000"
              background="#ffffff"
              w="full"
              fontSize="16px"
              maxW="container.md"
              placeholder={
                searchReadOnly ? "Click on map" : "Search your location"
              }
            />
            <InputRightElement overflow="hidden">
              <Tooltip
                label="Locate near me"
                hasArrow
                bg="gray.200"
                color="black"
              >
                <Button
                  onClick={() => fetchLocation()}
                  h="fit-content"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  color="primary"
                  p="0"
                >
                  <Icon icon="tabler:current-location" fontSize="18px" />
                </Button>
              </Tooltip>
            </InputRightElement>
          </InputGroup>
          <Box position="absolute" left="0" top="100%" right="0">
            {status === "OK" && (
              <UnorderedList
                as={ComboboxList}
                bg="#ffffff"
                listStyleType="none"
                m="0px"
                px="0px"
                py="20px"
              >
                {renderSuggestions()}
              </UnorderedList>
            )}
          </Box>
        </Combobox>
      </Box>
    </GoogleMap>
  );
};

export default Map;
