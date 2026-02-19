"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bookController_1 = require("./controllers/bookController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(process.cwd(), "src", "views"));
app.get("/", bookController_1.renderHome);
app.get("/books", bookController_1.renderBooks);
app.get("/books/search", bookController_1.renderSearchResults);
app.post("/books/add", bookController_1.createBook);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
