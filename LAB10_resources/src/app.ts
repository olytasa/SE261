import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import { requireLogin } from "./middleware/requireLogin";
import { login, logout } from "./controllers/authController";
import { listTodos, createTodo, removeTodo } from "./controllers/todoController";

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));


/**  Step 2: Configure session middleware (MemoryStore) */
// Session middleware (MemoryStore by default) — for learning/demo only
app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60*60*1000 }
  })
);

// home page
app.get("/", (req: Request, res: Response) => {
  const q = req.query.q;
  const error =
    q === "invalid" ? "Invalid username or password." :
    q === "need-login" ? "Please log in first." :
    null;
  res.render("index", { error });
});
/**  Step 3: Implement login with seed users */
app.post("/login", login);

/**  Step 5: Implement ToDo CRUD with seed data */
// ToDo list page (protected)

app.get("/todos", requireLogin, listTodos);

// Add item (protected)
app.post("/add", requireLogin, createTodo);

// Delete item (protected)
app.post("/delete", requireLogin, removeTodo);


/** Step 6: Logout */
app.post("/logout", requireLogin, logout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
