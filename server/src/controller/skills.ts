import dataSource from "../db";
import Skill from "../entity/Skill";
import IController from "../types/Controller";

const skillController: IController = {
  read: async (req, res) => {
    try {
      const allSkills = await dataSource.getRepository(Skill).find();
      res.send(allSkills);
    } catch (err) {
      console.error(err);
      res.status(422).send("error while creating wilder");
    }
  },

  create: async (req, res) => {
    const { name } = req.body;
    try {
      const createSkill = await dataSource.getRepository(Skill).save({ name });
      res.send(createSkill);
    } catch (err) {
      console.log(err);
      res.status(500).send("error while creating wilder");
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10)
      if (id <= 0)
        return res.status(422).send("id not valid")
      const deleteSkill = await dataSource.getRepository(Skill).delete(id);
      if (deleteSkill.affected === 0)
        return res.status(404).send("Skill not found")

      res.send("Skill deleted")

    } catch (err) {
      console.log(err);
      res.status(422).send("error while deleting wilder");
    }
  },

  // update: async (req, res) => {
  //   const { name } = req.body;
  //   try {
  //     const { affected } = await dataSource.getRepository(Skill).update(req.params.id, req.body);
  //     if (affected) return res.send("Skill Updated");
  //     res.sendStatus(404).send("The skill does not exist");
  //   } catch (err) {
  //     console.log(err);
  //     res.send("The skill does not exist")
  //   }
  // }
  update: async (req, res) => {
    try {
      const { name } = req.body;
      const id = parseInt(req.params.id, 10);
      if (id <= 0)
        return res.status(422).send("id not valid")
      if (name === null || name.length > 50)
        return res.status(422).send("invalid name")

      const result = await dataSource.getRepository(Skill).update(id, name);
      if (result.affected === 0)
        return res.status(404).send("Skill not found")

      return res.send("Skill updated")

    } catch {
      res.status(500).send("Error while updating skill")
    }
  }

};

export default skillController;
