import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const courseAssignments = dao.findAssignmentsForCourse(cid);
    res.json(courseAssignments);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = dao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).send("Assignment not found");
    }
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const result = dao.updateAssignment(aid, assignmentUpdates);
    if (result.status === "OK") {
      res.json(result);
    } else {
      res.status(404).send(result.message);
    }
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const result = dao.deleteAssignment(aid);
    if (result.status === "OK") {
      res.json(result);
    } else {
      res.status(404).send(result.message);
    }
  });
}