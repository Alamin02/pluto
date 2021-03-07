import { getConnection } from "typeorm";
import { Address } from "../entity";

export const addressesList = [
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:37/B, lalmonirhat, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:38/B, Kurigram, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:39/B, Joldhaka, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:40/B, Kakina, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:41/B, Kotkipara, Rangpur",
  },
];

export async function seedAddresses() {
  const addressRepository = getConnection().getRepository(Address);

  for (const address of addressesList) {
    const newAddress = new Address();

    newAddress.division = address.division;
    newAddress.district = address.district;
    newAddress.city = address.city;
    newAddress.address = address.address;

    await addressRepository.save(newAddress);
  }
}
