import { getConnection } from "typeorm";
import { Offer } from "../entity";

const offersList = [
  {
    name: "ab",
    discount: 50,
    description: "good",
  },
  {
    name: "bc",
    discount: 30,
    description: "good",
  },
  {
    name: "cd",
    discount: 20,
    description: "good",
  },
  {
    name: "de",
    discount: 10,
    description: "good",
  },
  {
    name: "ef",
    discount: 50,
    description: "good",
  },
  {
    name: "gh",
    discount: 60,
    description: "good",
  },
  {
    name: "ij",
    discount: 70,
    description: "good",
  },
  {
    name: "kl",
    discount: 80,
    description: "good",
  },
  {
    name: "mn",
    discount: 90,
    description: "good",
  },
  {
    name: "op",
    discount: 100,
    description: "good",
  },
];

export async function seedOffers() {
  const offerRepository = getConnection().getRepository(Offer);

  for (const offer of offersList) {
    const newOffer = new Offer();
    newOffer.name = offer.name;
    newOffer.discount = offer.discount;
    newOffer.description = offer.description;

    await offerRepository.save(newOffer);
  }
}
