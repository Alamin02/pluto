import express = require("express");
import { getConnection } from "typeorm";
import { Config } from "../entity";

export async function logoConfig(req: express.Request, res: express.Response) {
  const { parameter, value } = req.body;
  const configRepository = getConnection().getRepository(Config);

  const configCheck = await configRepository.findOne({
    where: { parameter: "logo" },
  });

  const newConfig = new Config();
  if (!configCheck) {
    newConfig.parameter = parameter;
    newConfig.value = value;
    configRepository.save(newConfig);
  } else {
    configCheck.value = value;
    configRepository.save(configCheck);
  }

  res.status(200).json({ msg: "successfully logo added" });
}
