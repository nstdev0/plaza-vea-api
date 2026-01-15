import app from "./app.js";
import { AppConfig } from "./config/config.js";

const PORT = AppConfig.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ⏱️ Timeout global del servidor (Node HTTP)
server.setTimeout(10 * 60_000); // 10 minutos
