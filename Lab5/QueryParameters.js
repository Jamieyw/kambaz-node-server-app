export default function QueryParameters(app) {
  // e.g., lab5/calculator?operation=add&a=5&b=2
  app.get("/lab5/calculator", (req, res) => {
    const {operation, a, b} = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });
}