import { getConnection } from "typeorm";
import { Category } from "../entity";

const CatagoriesList = [
  {
    name: "Summer",
  },
  {
    name: "Rainy",
  },
  {
    name: "Winter",
  },
  {
    name: "Autumn",
  },
  {
    name: "Summer-Rainy",
  },
  {
    name: "Rainy-Rainy",
  },
  {
    name: "winter-Rainy",
  },
  {
    name: "Rainy-Summer",
  },
  {
    name: "Diboae nah",
  },
  {
    name: "maf kor vai",
  },
];

export async function seedCatagories() {
  const categoryRepository = getConnection().getRepository(Category);

  for (const category of CatagoriesList) {
    const newCategory = new Category();

    newCategory.name = category.name;

    await categoryRepository.save(newCategory);
  }
}
