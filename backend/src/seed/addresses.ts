import { getConnection } from "typeorm";
import { Address } from "../entity";

const addressesList = [
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
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:42/B, Jummapara, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:43/B, Checkpost, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:44/B, Lalbag, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:45/B, Gongachora, Rangpur",
  },
  {
    division: "Rangpur",
    district: "Rangpur",
    city: "Rangpur Sadar",
    address: "House NO:46/B, Dinajpur, Rangpur",
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
