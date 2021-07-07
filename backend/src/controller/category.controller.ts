import express = require("express");
import { getConnection, IsNull } from "typeorm";
import accessControl from "../utils/access-control";
import { Category } from "../entity";

// @GET /v1/api/category/
export async function getCategory(req: express.Request, res: express.Response) {
  try {
    const categoryRepository = getConnection().getRepository(Category);

    const categoryTrees = await categoryRepository.find({
      relations: ["children"],
      where: { parent: IsNull() },
    });
    if (categoryTrees.length) {
      return res.status(200).json({ success: true, data: categoryTrees });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "No category created !" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}

// @POST /v1/api/category/
export async function createCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .createAny("category");

    if (!permission.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { name, parentId } = req.body;
    const categoryRepository = getConnection().getRepository(Category);

    if (!parentId) {
      const checkCategory = await categoryRepository.findOne({ name });
      if (!checkCategory) {
        const newCategory = new Category();
        newCategory.name = name;
        const data = await categoryRepository.save(newCategory);
        return res.status(201).json({
          success: true,
          message: "New category added!",
          data,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Category already exists" });
      }
    } else {
      const checkDuplicate = await categoryRepository.find({
        where: {
          name,
          parent: {
            id: parentId,
          },
        },
      });
      const checkParent = await categoryRepository.find({ id: parentId });

      if (!checkDuplicate.length) {
        const newCategory = new Category();
        newCategory.name = name;

        if (checkParent.length) {
          newCategory.parent = parentId;
          const data = await categoryRepository.save(newCategory);
          return res.status(201).json({
            success: true,
            message: "New category added!",
            data,
          });
        } else {
          return res.status(400).json({
            success: false,
            error: "Invalid parentId or parent not found!",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: "Sub category already exists in parent!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
}

// @PUT /v1/api/category/:categoryId
export async function updateCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .updateAny("category");

    if (!permission.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const categoryId = req.params.categoryId;
    const { name, parentId } = req.body;

    const categoryRepository = getConnection().getRepository(Category);
    const checkCategory = await categoryRepository.findOne({ id: categoryId });
    if (!parentId) {
      if (checkCategory) {
        const newCategory = new Category();
        newCategory.name = name;
        await categoryRepository.update(categoryId, newCategory);
        return res.json({ success: true, message: "Category updated!" });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid categoryId!" });
      }
    } else {
      const checkParent = await categoryRepository.findOne({ id: parentId });

      if (checkCategory) {
        const newCategory = new Category();
        newCategory.name = name;
        if (checkParent) {
          newCategory.parent = parentId;
          await categoryRepository.update(categoryId, newCategory);
          return res.json({ success: false, error: "Sub-category updated!" });
        } else {
          return res.status(400).json({
            success: false,
            error: "Invalid parentId or parent not found!",
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid subCategoryId!" });
      }
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}

// Get a particular category
export async function getSingleCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.categoryId;

    const categoryRepository = getConnection().getRepository(Category);

    const findCategoryById = await categoryRepository.findOne(
      { id },
      { relations: ["products", "products.images"] }
    );

    if (!findCategoryById) {
      return res
        .status(400)
        .json({ success: false, error: "Category not found!" });
    }

    return res.json({ success: false, data: findCategoryById });
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}

// @Delete /v1/api/category/:categoryId
export async function deleteCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .deleteAny("category");

    if (!permission.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const categoryId = req.params.categoryId;
    const categoryRepository = getConnection().getRepository(Category);
    const categoryCheck = await categoryRepository.findOne({ id: categoryId });
    if (categoryCheck) {
      await categoryRepository.delete(categoryId);
      return res.json({ success: true, message: "category deleted!" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid categoryId!" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}
