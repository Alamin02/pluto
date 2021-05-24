import express = require("express");
import { getConnection } from "typeorm";
import { Setting } from "../entity";

export async function logoSetting(req: express.Request, res: express.Response) {
  const { parameter, value } = req.body;
  const settingRepository = getConnection().getRepository(Setting);

  const presenceCheck = await settingRepository.findOne({
    where: { parameter: "logo" },
  });

  const newSetting = new Setting();
  if (!presenceCheck) {
    newSetting.parameter = parameter;
    newSetting.value = value;
    settingRepository.save(newSetting);
  } else {
    presenceCheck.value = value;
    settingRepository.save(presenceCheck);
  }

  res.status(200).json({ msg: "successfully logo added" });
}
