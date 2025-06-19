import * as AssignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await AssignmentDao.deleteAssignment(aid);
    res.send(status);
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const assignment = await AssignmentDao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).send("Assignment not found");
    }
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const result = await AssignmentDao.updateAssignment(aid, assignmentUpdates);
    res.send(result);
  });
}