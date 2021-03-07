import express = require("express");
import { getConnection, IsNull, Connection, createConnection } from "typeorm";
import { validationResult } from "express-validator";
import { Category } from "../entity";

// @GET /v1/api/category/
export async function category(req: express.Request, res: express.Response) {
  const categoryRepository = getConnection().getRepository(Category);

  const categoryTrees = await categoryRepository.find({
    relations: ["children"],
    where: { parent: IsNull() },
  });
  if (categoryTrees.length) {
    res.json({ data: categoryTrees });
  } else {
    res.json({ msg: "No category created" });
  }
}

// @POST /v1/api/category/
export async function createCategory(
  req: express.Request,
  res: express.Response
) {
  const { name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const categoryRepository = getConnection().getRepository(Category);
  const checkCategory = await categoryRepository.findOne({ name });
  if (!checkCategory) {
    const newCategory = new Category();
    newCategory.name = name;
    const data = await categoryRepository.save(newCategory);
    res.json({ data: data });
  } else {
    res.status(400).json({ msg: "Category already exists" });
  }
}
// @POST /v1/api/category/
export async function createSubCategory(
  req: express.Request,
  res: express.Response
) {
  const { name, parentId } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const categoryRepository = getConnection().getRepository(Category);
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
      res.json({ data: data });
    } else {
      res.status(400).json({ msg: "invalid parent id or parent not found" });
    }
  } else {
    res.status(400).json({ msg: "sub category already exists in parent" });
  }
}

// @PUT /v1/api/category/:categoryId
export async function updateCategory(
  req: express.Request,
  res: express.Response
) {
  const categoryId = req.params.categoryId;
  const { name } = req.body;

  const categoryRepository = getConnection().getRepository(Category);
  const checkCategory = await categoryRepository.findOne({ id: categoryId });

  if (checkCategory) {
    const newCategory = new Category();
    newCategory.name = name;
    await categoryRepository.update(categoryId, newCategory);
    res.json({ msg: "Category updated" });
  } else {
    res.status(400).json({ msg: "Invalid categoryId" });
  }
}
// @PUT /v1/api/category/:categoryId
export async function updateSubCategory(
  req: express.Request,
  res: express.Response
) {
  const subCategoryId = req.params.subCategoryId;
  const { name, parentId } = req.body;

  const categoryRepository = getConnection().getRepository(Category);
  const checkCategory = await categoryRepository.findOne({ id: subCategoryId });
  const checkParent = await categoryRepository.findOne({ id: parentId });

  if (checkCategory) {
    const newCategory = new Category();
    newCategory.name = name;
    if (checkParent) {
      newCategory.parent = parentId;
      await categoryRepository.update(subCategoryId, newCategory);
      res.json({ msg: "Sub-category updated" });
    } else {
      res.status(400).json({ msg: "Invalid parentId or parent not found" });
    }
  } else {
    res.status(400).json({ msg: "Invalid subCategoryId" });
  }
}

// @Delete /v1/api/category/:categoryId
export async function deleteCategory(
  req: express.Request,
  res: express.Response
) {
  const categoryId = req.params.categoryId;
  const categoryRepository = getConnection().getRepository(Category);
  const categoryCheck = await categoryRepository.findOne({ id: categoryId });

  if (categoryCheck) {
    try {
     

      // await connection.query("PRAGMA foreign_keys=OFF");
      // await connection.synchronize();
      // await connection.query("PRAGMA foreign_keys=ON");
      await categoryRepository.delete(categoryId);
      res.json({ msg: "category deleted" });
    } catch (e) {
      res.json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Invalid CategoryId" });
  }
}
