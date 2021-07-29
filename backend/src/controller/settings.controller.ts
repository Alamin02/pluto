import express = require("express");

import { getConnection } from "typeorm";
import { Settings } from "../entity/settings";

export async function getSettings(req: express.Request, res: express.Response) {
  try {
    const settingsRepository = getConnection().getRepository(Settings);

    const settings = (await settingsRepository.find()) || [];

    const settingsObject: { [key: string]: string } = {};

    settings.map((entry) => {
      settingsObject[entry.key] = entry.value;
    });

    return res.status(200).json({
      success: true,
      data: settingsObject,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

export async function updateSettings(
  req: express.Request,
  res: express.Response
) {
  try {
    const allowedParams = ["phone", "email", "logo", "address"];

    const settingsRepository = getConnection().getRepository(Settings);

    for (const param of allowedParams) {
      const targetEntry = await settingsRepository.findOne({
        where: { key: param },
      });

      if (targetEntry) {
        targetEntry.value = req.body[param];
        await settingsRepository.save(targetEntry);
      } else {
        const newEntry = new Settings();
        newEntry.key = param;
        newEntry.value = req.body[param];
        await settingsRepository.save(newEntry);
      }
    }

    return res.status(200).json({ success: true, message: "Product updated!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
