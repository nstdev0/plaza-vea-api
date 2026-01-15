import app from "./app.js";
import { AppConfig } from "./config/config.js";

const PORT = AppConfig.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
