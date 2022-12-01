import express from "express";
import cors from "cors";
import dataSource from "./db";
import wildersController from "./controller/wilders";
import skillsController from "./controller/skills";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.getAll);
app.get("/wilders/:wilderId", wildersController.getOne);
app.delete("/wilders/:id", wildersController.deleteOne);
app.patch("/wilders/:id", wildersController.updateOne);
app.patch("/wilders/:wilderId/skills/:skillId", wildersController.addSkill);

app.post("/skills", skillsController.create);
app.delete("/skills/:id", skillsController.delete);
app.get("/skills", skillsController.read);
app.patch("/skills/:id", skillsController.update);

const initializeServer = async (): Promise<void> => {
  await dataSource.initialize();
  // dataSource.getRepository(Wilder).save({ name: "First Wilder" });
  app.listen(4000, () => console.log ("Server Started on 4000"));
};

initializeServer().then(()=>{}).catch((err) => console.error(err));
