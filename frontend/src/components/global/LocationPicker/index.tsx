import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import Map from "../Map";
type propTypes = {
  isOpen: boolean;
  onClose: () => void;
  setAddress: any;
  address: any;
  confirmAddress: any;
  loading: boolean;
  isCloseable: boolean;
};
const LocationPicker: React.FC<propTypes> = ({
  isOpen,
  setAddress,
  address,
  confirmAddress,
  loading,
  isCloseable,
  onClose,
}) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize="16px"
          px={{ base: "10px", md: "16px", lg: "24px" }}
          pt="15px"
          pb="0px"
        >
          Pick your destination
        </ModalHeader>
        {isCloseable && (
          <ModalCloseButton
            _hover={{ color: "var(--chakra-colors-primary)" }}
          />
        )}
        <ModalBody
          px={{ base: "10px", md: "16px", lg: "24px" }}
          zIndex={200}
          py="10px"
        >
          <Map
            searchReadOnly={true}
            searchBoxFromTop="5px"
            height="350px"
            width="100%"
            setAddress={setAddress}
          />
        </ModalBody>
        <ModalFooter
          px={{ base: "8.5px", sm: "10px", md: "16px", lg: "24px" }}
          mt="10px"
        >
          <Button
            _hover={{ bg: "primary" }}
            _active={{ bg: "primary" }}
            bg="primary"
            color="#eeeeee"
            fontSize={{ base: "14px", sm: "15px", md: "16px" }}
            borderRadius="5px"
            px={{ base: "15px", sm: "18px", md: "25px" }}
            disabled={address?.street === "" && address?.city === ""}
            onClick={confirmAddress}
            isLoading={loading}
          >
            Confirm Address
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LocationPicker;
