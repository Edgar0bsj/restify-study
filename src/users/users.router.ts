import { Router } from "../common/router";
import restify from "restify";
import { User } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.createServer) {
    /**
     *
     * @description endpont /users lista todos os usuarios
     *
     */
    application.get("/users", (req, res, next) => {
      User.find().then((users) => {
        res.json(users);
        return next();
      });
    });
    /**
     *
     * @description: endpont find by id, puxa apenas um usuario por id
     *
     */
    application.get("/users/:id", async (req, res, next) => {
      const userId = req.params.id;

      const result = await User.findById(userId);
      if (result) {
        res.json(result);
        return next();
      } else {
        res.send(404);
        return next();
      }
    });
    /**
     *
     * @description: endpont para enviar um documento ao bando de dados
     *
     */
    application.post("/users", (req, res, next) => {
      let user = new User(req.body);
      user.save().then((user) => {
        user.password = undefined;
        res.json(user);
        return next();
      });
    });
    /**
     *
     * @description: endpont que atualizar parcialmente dados no banco
     *
     */
    application.patch("/user/:id", (req, res, next) => {
      const options = { new: true };
      User.findByIdAndUpdate(req.params.id, req.body, options).then((user) => {
        if (user) {
          res.json(user);
          return next();
        }
        res.send(404);
        return next();
      });
    });
  }
}

export const usersRouter = new UsersRouter();
