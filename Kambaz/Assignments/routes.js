import * as AssignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const status = AssignmentDao.deleteAssignment(aid);
    res.send(status);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = AssignmentDao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).send("Assignment not found");
    }
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const result = AssignmentDao.updateAssignment(aid, assignmentUpdates);
    res.send(result);
  });
}