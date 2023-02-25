import "dotenv/config";
import { app } from "./app";
import { connectDatabase } from "./database/connect";

const port = 3000;

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${port}!`);
});
