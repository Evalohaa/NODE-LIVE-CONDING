// import { Request, Response } from "express";
import dataSource from "../db";
import Wilder from "../entity/Wilder";
import Skill from "../entity/Skill";
import IController from "../types/Controller";

const wilderController: IController = {
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const createWilder = await dataSource.getRepository(Wilder).save({ name });
      res.send(createWilder);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while creating wilder");
    }
  },

  getAll: async (req, res) => {
    try {
      const allWilders = await dataSource.getRepository(Wilder).find();
      res.send(allWilders);
    } catch (err) {
      console.error(err);
      res.status(422).send("error while creating wilder");
    }
  },

  getOne: async (req, res) => {
    try {
      // const { id } = req.params
      const oneWilder = await dataSource.getRepository(Wilder).findOne({
        where: { id: parseInt(req.params.wilderId, 10) },
      });
      if (oneWilder === null) return res.sendStatus(404);
      res.send(oneWilder);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while updating wilder");
    }
  },

  deleteOne: async (req, res) => {
    try {
      const wilder = await dataSource.getRepository(Wilder).delete(req.params.id);
      if (wilder.affected === 0 )
        return res.status(404).send("wilder not found");
      res.send(wilder);
    } catch (err) {
      console.error(err);
      res.status(422).send("error while deleting wilder");
    }
  },

  updateOne: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res.status(422).send("The name should have a length between 1 and 100 characters");
    }

    try {
      const  { affected }  = await dataSource.getRepository(Wilder).update(req.params.id, req.body);
      // const wilderUpdated = await dataSource.getRepository(Wilder).update(req.params.id, req.body);
      // console.log(wilderUpdated); -> { generatedMaps: [], raw: [], affected: 1 }
      // donc on destructure en prenant le { affected }
      if (affected !== 0) return res.send("wilder updated");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while updating wilder");
    }
  },

  addSkill: async(req, res) => {
    try {
      const { wilderId, skillId } = req.params
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(wilderId) });
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(skillId) });

      if (wilderToUpdate === null || skillToAdd === null) {
        return res.send("Error, the skill has not been added to wilder");
      }
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill added to wilder");
      // if (wilderToUpdate !== null && skillToAdd !== null) {
      //   wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      //   await dataSource.getRepository(Wilder).save(wilderToUpdate);
      //   res.send("Skill added to wilder");
      // } else {
      //   res.send("A wilder and a skill are missing")
      // }
    } catch (err) {
      console.log(err);
      res.send("error while adding skill to wilder");
    }
  }
};

export default wilderController;
